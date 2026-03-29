import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/denah-images/3d-denah/EYEBIRD-VIEW.png';
import { useFinanceData } from '../../hooks/useFinanceData';
import DonationTabs from './DonationTabs';

const DonationPage = () => {
  
  const { targetAmount, collectedAmount } = useFinanceData();
  const donationData = { targetAmount, collectedAmount };

  // Helper Format Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

          {/* Sisi Kiri: Gambar Utama */}
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-teal-600/10 rounded-[40px] blur-2xl -z-10 group-hover:bg-teal-600/20 transition-all duration-500"></div>
            <img
              src={heroImage}
              alt="Gedung Rumah Tahfidz"
              className="w-full h-auto object-cover rounded-[30px] shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Sisi Kanan: Detail & CTA */}
          <div className="w-full md:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 font-bold text-xs uppercase tracking-widest border border-teal-100">
                Program Wakaf Pembangunan
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                Wujudkan <br /> Istana Para <br /> Penghafal Al-Qur'an
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-8 border-y border-gray-200 py-8">
              <div className="space-y-1">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Target Dana</p>
                <p className="text-2xl font-black text-teal-700">{formatRupiah(donationData.targetAmount)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Terkumpul</p>
                <p className="text-2xl font-black text-green-500">{formatRupiah(donationData.collectedAmount)}</p>
              </div>
            </div>

            {/* FORM */}
            <Link
              //to="/donation/form" //(Sementara dimatikan, menunggu midtrans)
              to="https://docs.google.com/forms/d/e/1FAIpQLSc4r_Jb_9h4q_KyGSUDH4jN0A61W8tKMmY6GExeTCkzv59LrQ/viewform?usp=header"
              className="group w-full md:w-max inline-flex items-center justify-center gap-4 bg-teal-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-teal-700 shadow-2xl shadow-teal-600/30 transform active:scale-95 transition-all"
            >
              Donasi Sekarang
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- TABS SECTION --- */}
      <DonationTabs />
    </div>
  );
};

export default DonationPage;