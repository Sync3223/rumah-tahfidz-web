import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
        {/* Animated heart icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Heart className="w-10 h-10 text-emerald-600 fill-emerald-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Jazākallāhu Khayran</h1>
        <p className="text-gray-500 text-base mb-2">
          Donasi Anda telah berhasil diterima.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Semoga setiap rupiah yang Anda berikan menjadi amal jariyah yang terus mengalir pahalanya.
          Kami akan menyalurkan donasi Anda sesuai dengan program yang dipilih.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors"
          >
            Kembali ke Beranda
          </button>
          <button
            onClick={() => navigate('/donation/form')}
            className="w-full py-3 bg-white hover:bg-gray-50 text-emerald-600 font-semibold rounded-xl border border-emerald-200 transition-colors"
          >
            Donasi Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
