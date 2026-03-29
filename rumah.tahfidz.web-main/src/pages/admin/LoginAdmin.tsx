import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import logo from '../../assets/logo.png';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Email atau password salah. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden">
      {/* Dekorasi Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="w-full max-w-md z-10">
        {/* Tombol Kembali ke Beranda */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
          {/* Header Login */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 rounded-2xl mb-4 shadow-sm">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-500 text-sm mt-2">Silakan masuk untuk mengelola konten website</p>
          </div>

          {/* Alert Error */}
          {error && (
            <div className="mb-6 flex items-center p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 animate-shake">
              <AlertCircle size={18} className="mr-2 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                Alamat Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700"
                  placeholder="admin@rumahtahfidz.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  id="password"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/30 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Masuk Sekarang
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <p className="text-center text-xs text-gray-400 mt-8">
            &copy; 2026 Rumah Tahfidz. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;