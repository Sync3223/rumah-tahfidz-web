import { Link } from 'react-router-dom';
import { useFinanceData } from '../../hooks/useFinanceData';

const BuildingProgress = () => {
  const { targetAmount, collectedAmount } = useFinanceData();
  const progressData = { targetAmount, collectedAmount };

  // Hitung Persentase & SVG Props
  const percentage = Math.min(100, Math.max(0, Math.round((progressData.collectedAmount / progressData.targetAmount) * 100)));
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Format Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-teal-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Progress Lingkaran Besar */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} className="stroke-teal-200 fill-transparent" strokeWidth="10" />
              <circle 
                cx="50" cy="50" r={radius} 
                className="stroke-teal-600 fill-transparent transition-all duration-1000 ease-out" 
                strokeWidth="10" 
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-5xl font-black text-teal-800">{percentage}%</span>
              <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1">Selesai</p>
            </div>
          </div>

          {/* Rincian Angka */}
          <div className="flex-1 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <p className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-2">Target Dana</p>
                <h3 className="text-3xl font-black text-teal-800 uppercase leading-none">{formatRupiah(progressData.targetAmount)}</h3>
              </div>
              <div>
                <p className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-2">Dana Terkumpul</p>
                <h3 className="text-3xl font-black text-teal-800 uppercase leading-none">{formatRupiah(progressData.collectedAmount)}</h3>
              </div>
            </div>
            <Link to="/donation/general" className="inline-block text-center w-full md:w-auto px-12 py-5 bg-teal-600 text-white rounded-2xl font-black text-lg hover:bg-teal-700 shadow-xl shadow-teal-600/30 transition-all">
              Ikut Berwakaf Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildingProgress;