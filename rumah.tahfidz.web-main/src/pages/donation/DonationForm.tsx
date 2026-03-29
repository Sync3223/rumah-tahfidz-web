
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { donationService } from '../../services/donationService';
import { useMidtransSnap } from '../../hooks/useMidtransSnap';

// Mendeklarasikan window.snap
declare global {
  interface Window {
    snap: any;
  }
}

const DonationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Dynamic snap injection
  const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
  const isProd = import.meta.env.VITE_MIDTRANS_IS_PRODUCTION === 'true';
  const { snapReady } = useMidtransSnap(clientKey, isProd);

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    email: '',
    phone: '',
    project: 'umum',
  });

  // Holds snap token when there is an active/pending transaction
  const [pendingSnapToken, setPendingSnapToken] = useState<string | null>(null);

  // Dynamic categories array
  const categories = [
    { value: 'umum', label: 'Donasi Umum (Operasional Pesantren)' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Opens the Midtrans Snap popup with the given token.
   * All 4 callbacks are handled here.
   */
  const openSnapPopup = (token: string) => {
    window.snap.pay(token, {
      onSuccess: (_result: any) => {
        // Payment completed — clear state and go to Thank You page
        setPendingSnapToken(null);
        navigate('/donation/thank-you');
      },
      onPending: (_result: any) => {
        // A payment method was chosen but transfer not done yet.
        // DO NOT navigate away — keep overlay open so user can continue.
        // The token stays valid; no action needed here.
      },
      onError: (result: any) => {
        // Expired or failed — clear token, allow fresh submission
        setPendingSnapToken(null);
        const msg: string = result?.status_message ?? '';
        if (msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('not found')) {
          alert('Sesi pembayaran telah habis. Silakan isi ulang formulir untuk membuat transaksi baru.');
        } else {
          alert('Pembayaran gagal. Silakan coba lagi.');
        }
      },
      onClose: () => {
        // User closed the popup — the overlay (pendingSnapToken) stays visible
        // so they can continue or cancel the donation.
      },
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snapReady) {
      alert('Sistem pembayaran sedang dimuat, mohon tunggu sebentar.');
      return;
    }

    setLoading(true);
    try {
      const snapToken = await donationService.processDonation({
        name: formData.name,
        amount: Number(formData.amount),
        email: formData.email,
        phone: formData.phone,
        project: formData.project,
      });

      setPendingSnapToken(snapToken);
      openSnapPopup(snapToken);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      alert('Gagal memproses donasi. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinuePayment = () => {
    if (pendingSnapToken && window.snap) {
      openSnapPopup(pendingSnapToken);
    }
  };

  const handleCancelDonation = () => {
    // Discard the pending token — Firestore doc will be marked 'expire'
    // by the Midtrans webhook once the token window passes.
    setPendingSnapToken(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Kembali
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Formulir Donasi</h1>
          <p className="text-gray-500 mb-8 text-sm">
            Silakan lengkapi data diri Anda. Alamat email dan nomor telepon bersifat opsional.
          </p>

          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Donasi (Proyek) *</label>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nominal Donasi (Rp) *</label>
              <input
                type="number"
                name="amount"
                required
                min="10000"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-gray-50 font-bold text-lg"
                placeholder="Contoh: 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Nama Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="email@anda.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. WhatsApp / Telp <span className="text-gray-400 font-normal">(Opsional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="081234567890"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 mt-4 rounded-xl font-bold text-white text-lg transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
              }`}
            >
              {loading ? 'Memproses...' : 'Lanjutkan Pembayaran'}
            </button>
          </form>
        </div>
      </div>

      {/*
       * Persistent overlay — shown when the Snap popup is closed but
       * the transaction is still active (not yet paid or cancelled).
       * This keeps the user "in session" instead of losing their flow.
       */}
      {pendingSnapToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">Donasi Belum Selesai</h2>
            <p className="text-gray-500 text-sm mb-6">
              Transaksi Anda masih aktif. Silakan lanjutkan pembayaran atau batalkan donasi ini.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleContinuePayment}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
              >
                Lanjutkan Pembayaran
              </button>
              <button
                onClick={handleCancelDonation}
                className="w-full py-3 bg-white hover:bg-gray-50 text-gray-500 font-semibold rounded-xl border border-gray-200 transition-colors"
              >
                Batalkan Donasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationForm;