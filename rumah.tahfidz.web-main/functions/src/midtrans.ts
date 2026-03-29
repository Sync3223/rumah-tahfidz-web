import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
// @ts-ignore
import midtransClient from "midtrans-client";
import { Donation, donationConverter } from "./models/donation";

// Initialize Firestore
const db = getFirestore();

// Initialize Midtrans Snap Client
const snap = new midtransClient.Snap({
    isProduction: false, // Update to true for production usage
    serverKey: process.env.MIDTRANS_SERVER_KEY as string,
    clientKey: process.env.MIDTRANS_CLIENT_KEY as string
});

interface DonationRequest {
    name: string;
    amount: number;
    email?: string;
    phone?: string;
    project: string;
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 5;          // max requests per window
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Checks and increments a per-IP request counter stored in Firestore.
 * Throws an HttpsError if the limit is exceeded.
 */
async function checkRateLimit(ip: string): Promise<void> {
    const safeIp = ip.replace(/[^a-zA-Z0-9_\-]/g, "_"); // sanitize for doc ID
    const ref = db.collection("rateLimits").doc(safeIp);

    await db.runTransaction(async (tx) => {
        const snap = await tx.get(ref);
        const now = Date.now();

        if (!snap.exists) {
            // First request from this IP — create a fresh window
            tx.set(ref, { count: 1, windowStart: now });
            return;
        }

        const { count, windowStart } = snap.data() as { count: number; windowStart: number };

        if (now - windowStart > RATE_LIMIT_WINDOW_MS) {
            // Window has expired — reset
            tx.update(ref, { count: 1, windowStart: now });
        } else if (count >= RATE_LIMIT_MAX) {
            // Still inside window and over limit
            const retryAfterSec = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - windowStart)) / 1000);
            throw new HttpsError(
                "resource-exhausted",
                `Terlalu banyak permintaan. Coba lagi dalam ${retryAfterSec} detik.`
            );
        } else {
            tx.update(ref, { count: count + 1 });
        }
    });
}

/**
 * Callable Function to create Midtrans Snap Token
 * 
 * Flow:
 * 1. Rate-limit check
 * 2. Validate input
 * 3. Save a pending transaction to Firestore
 * 4. Call Midtrans Snap API
 * 5. Return token back to client
 */
export const createMidtransTransaction = onCall<DonationRequest>({
    maxInstances: 5,        // cap concurrent containers for this function
    timeoutSeconds: 30,     // Midtrans API should respond well within 30 s
    concurrency: 20,        // requests per container (Gen 2 default is 80; lower = safer)
}, async (request) => {
    // 1. Rate limit by caller IP
    const ip = request.rawRequest.ip ?? "unknown";
    await checkRateLimit(ip);

    // 2. Validation
    const data = request.data;
    if (!data.amount || data.amount < 10000) {
        throw new HttpsError("invalid-argument", "Amount must be at least Rp 10.000");
    }
    if (!data.name || !data.project) {
        throw new HttpsError("invalid-argument", "Name and project are required");
    }

    try {
        // 2. Prepare Order ID
        const timestamp = Date.now();
        // Add a random 5-character string to prevent collisions if two requests occur at the exact same millisecond
        const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
        const orderId = `DONASI-${data.project}-${timestamp}-${randomStr}`;

        // 3. Save pending status to Firestore FIRST
        const donationRef = db.collection("donations").withConverter(donationConverter).doc(orderId);
        
        const newDonation: Donation = {
            orderId: orderId,
            name: data.name,
            email: data.email || null,
            phone: data.phone || null,
            amount: data.amount,
            project: data.project,
            status: "pending",
            createdAt: FieldValue.serverTimestamp(),
            updatedAt: FieldValue.serverTimestamp(),
        };
        await donationRef.set(newDonation);

        // 4. Create Params for Midtrans
        // Only include email/phone if provided — Midtrans rejects empty strings
        const customerDetails: Record<string, string> = {
            first_name: data.name,
        };
        if (data.email) customerDetails.email = data.email;
        if (data.phone) customerDetails.phone = data.phone;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: data.amount
            },
            customer_details: customerDetails,
            // Include custom field to securely tie project to Midtrans dashboard
            custom_field1: data.project
        };

        // 5. Call Midtrans API
        const transaction = await snap.createTransaction(parameter);
        const token = transaction.token;

        // 6. Update document with the snapToken for our records (optional but useful)
        await donationRef.update({
            snapToken: token,
            updatedAt: FieldValue.serverTimestamp(),
        });

        logger.info(`Midtrans token generated for ${orderId}`);
        return { token };

    } catch (error: any) {
        logger.error("Error creating Midtrans transaction", error);
        throw new HttpsError("internal", "Failed to contact Midtrans", error.message);
    }
});


/**
 * Webhook Function connected to Midtrans
 * 
 * Maps HTTP POST payload to verify and update the Firestore donation status.
 */
export const midtransWebhook = onRequest(async (req, res) => {
    try {
        const body = req.body;
        logger.info("Received Midtrans Webhook: ", body);

        // Notify midtrans SDK to parse and verify the notification
        // Note: It verifies signature key automatically using configured serverKey.
        const notificationStatus = await (snap as any).transaction.notification(body);

        const orderId = notificationStatus.order_id;
        const transactionStatus = notificationStatus.transaction_status;
        const fraudStatus = notificationStatus.fraud_status;

        logger.info(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Decide what state should be in Firebase
        let finalStatus: Donation["status"] = "pending";

        if (transactionStatus === "capture") {
            if (fraudStatus === "challenge") {
                finalStatus = "challenge"; // Or handle review manually
            } else if (fraudStatus === "accept") {
                finalStatus = "success";
            }
        } else if (transactionStatus === "settlement") {
            finalStatus = "success";
        } else if (["cancel", "deny", "expire"].includes(transactionStatus)) {
            finalStatus = "failed";
        } else if (transactionStatus === "pending") {
            finalStatus = "pending";
        }

        // Update Firestore
        const docRef = db.collection("donations").withConverter(donationConverter).doc(orderId);
        await docRef.update({
            status: finalStatus,
            midtransWebhookResult: notificationStatus, // Storing raw result for auditing
            updatedAt: FieldValue.serverTimestamp(),
        });

        logger.info(`Donation ${orderId} updated to ${finalStatus}`);

        // Midtrans expects an 200 OK so it doesn't retry
        res.status(200).send("OK");
    } catch (error) {
        logger.error("Error processing Midtrans webhook", error);
        // We send 500 error so Midtrans retries if it was a temporary network error
        res.status(500).send("Error");
    }
});
