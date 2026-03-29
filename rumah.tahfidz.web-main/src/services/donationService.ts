import { getFunctions, httpsCallable } from 'firebase/functions';

export interface DonationInput {
  name: string;
  amount: number;
  email?: string;
  phone?: string;
  project: string; 
}

export const donationService = {
  // Memanggil callable function Firebase untuk membuat transaksi Midtrans
  processDonation: async (data: DonationInput): Promise<string> => {
    try {
      const functions = getFunctions();
      const createMidtransTransaction = httpsCallable(functions, 'createMidtransTransaction');
      
      const result = await createMidtransTransaction(data);
      const { token } = result.data as { token: string };
      
      return token;
    } catch (error: any) {
      console.error("Gagal memproses donasi ke Midtrans:", error);
      throw error;
    }
  }
};