import { Link } from 'react-router-dom';
import { useFinanceData } from '../../hooks/useFinanceData';
import bgImage from '../../assets/denah-images/3d-denah/EYEBIRD-VIEW.png';

const StatsSection = () => {
  const { targetAmount, collectedAmount } = useFinanceData();
  const donationData = { targetAmount, collectedAmount };

  // Hitung Persentase & SVG Props
  const percentage = Math.min(100, Math.max(0, Math.round((donationData.collectedAmount / donationData.targetAmount) * 100)));
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
    <section className="bg-white min-h-200 flex items-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* --- BAGIAN KIRI: GAMBAR & CIRCLE STATS --- */}
          <div className="relative h-125 w-full md:w-[50vw] md:ml-[calc(100%-50vw)] rounded-r-[100px] rounded-tl-3xl rounded-bl-3xl md:rounded-l-none overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <img 
              src={bgImage}
              alt="Statistik Pembangunan"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              {/* Circular Progress */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-6">
                {/* SVG Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Lingkaran Background (Abu/Putih transparan) */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-white/30 fill-transparent"
                    strokeWidth="6"
                  />
                  {/* Lingkaran Progress (Warna Hijau) */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-green-400 fill-transparent transition-all duration-1000 ease-out"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                {/* Text persentase di tengah */}
                <span className="absolute text-white text-2xl md:text-3xl font-bold">
                  {percentage}%
                </span>
              </div>
              
              {/* Teks Quote */}
              <h3 className="text-white text-2xl md:text-3xl font-bold leading-snug drop-shadow-md">
                Rumah Mereka Awal <br/> 
                Dari Karya & Prestasi <br/>
                Mereka.
              </h3>
            </div>
          </div>

          {/* --- BAGIAN KANAN: STATISTIK TEKS --- */}
          <div className="text-center md:text-left md:pl-10 space-y-10 py-10">
            {/* Judul */}
            <h2 className="text-3xl md:text-5xl font-bold text-teal-700 leading-tight">
              Pembangunan <br/> Rumah Tahfidz
            </h2>

            <div className="space-y-8">
              {/* Stat 1: Dibutuhkan */}
              <div>
                <p className="text-teal-500 font-medium mb-1 uppercase tracking-wide text-sm md:text-base">
                  Dibutuhkan
                </p>
                <h3 className="text-4xl md:text-5xl font-extrabold text-teal-600">
                  {formatRupiah(donationData.targetAmount)}
                </h3>
              </div>

              {/* Stat 2: Terkumpul */}
              <div>
                <p className="text-teal-500 font-medium mb-1 uppercase tracking-wide text-sm md:text-base">
                  Sudah Terkumpul
                </p>
                <h3 className="text-4xl md:text-5xl font-extrabold text-teal-600">
                  {formatRupiah(donationData.collectedAmount)}
                </h3>
              </div>
            </div>

            {/* Tombol Donasi */}
            <div>
              <Link to="/donation/general" className="inline-block px-8 py-3 rounded-full border-2 border-teal-600 text-teal-600 font-bold hover:bg-teal-600 hover:text-white transition-colors text-lg">
                Donasi Sekarang
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatsSection;