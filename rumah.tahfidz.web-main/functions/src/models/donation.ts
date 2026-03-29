import { FieldValue, Timestamp, QueryDocumentSnapshot } from "firebase-admin/firestore";

export interface Donation {
    orderId: string;
    name: string;
    email: string | null;
    phone: string | null;
    amount: number;
    project: string;
    status: "pending" | "success" | "challenge" | "failed";
    snapToken?: string;
    midtransWebhookResult?: any;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
}

export const donationConverter = {
    toFirestore: (donation: Donation) => {
        const data: any = {
            orderId: donation.orderId,
            name: donation.name,
            email: donation.email,
            phone: donation.phone,
            amount: donation.amount,
            project: donation.project,
            status: donation.status,
            createdAt: donation.createdAt,
            updatedAt: donation.updatedAt
        };
        if (donation.snapToken !== undefined) data.snapToken = donation.snapToken;
        if (donation.midtransWebhookResult !== undefined) data.midtransWebhookResult = donation.midtransWebhookResult;
        return data;
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Donation => {
        const data = snapshot.data();
        return {
            orderId: data.orderId,
            name: data.name,
            email: data.email ?? null,
            phone: data.phone ?? null,
            amount: data.amount,
            project: data.project,
            status: data.status,
            snapToken: data.snapToken,
            midtransWebhookResult: data.midtransWebhookResult,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        };
    }
};
