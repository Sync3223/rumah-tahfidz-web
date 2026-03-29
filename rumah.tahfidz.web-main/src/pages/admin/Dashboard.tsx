import { 
  FileText, 
  Activity, 
  PlusCircle, 
  Settings, 
  ExternalLink,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useNewsData } from '../../hooks/useNewsData';
import { useFinanceData } from '../../hooks/useFinanceData';

// Komponen Kecil untuk Kartu Statistik
const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    
    <div className="mt-4 flex items-center text-sm text-gray-400">
      <span className="font-medium">{subtitle}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { newsList, loading } = useNewsData();
  const { targetAmount, collectedAmount } = useFinanceData();

  // Format mata uang untuk tampilan finansial
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Mengambil 5 berita terbaru untuk tabel preview
  const recentNews = [...newsList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Ringkasan aktivitas website Rumah Tahfidz.</p>
        </div>
        <div className="flex gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
            <ExternalLink size={16} className="mr-2" />
            Lihat Website
          </a>
          <button 
            onClick={() => navigate('/admin/news')}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors shadow-sm"
          >
            <PlusCircle size={16} className="mr-2" />
            Kelola Berita
          </button>
        </div>
      </div>

      {/* --- STATS CARDS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Berita" 
          value={loading ? "..." : newsList.length} 
          icon={FileText} 
          color="bg-orange-500"
          subtitle="Artikel terbit di website"
        />
        <StatCard 
          title="Dana Terkumpul" 
          value={formatCurrency(collectedAmount)} 
          icon={Wallet} 
          color="bg-emerald-500"
          subtitle={`Target: ${formatCurrency(targetAmount)}`}
        />
        <StatCard 
          title="Status Sistem" 
          value="Aktif" 
          icon={Activity} 
          color="bg-blue-500"
          subtitle="Firebase Connected"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- KOLOM KIRI: QUICK ACTIONS & NEWS TABLE --- */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Akses Cepat</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/admin/hero" className="p-4 border border-gray-100 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-center group">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Settings size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Landing Page</span>
              </Link>
              <Link to="/admin/news" className="p-4 border border-gray-100 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-center group">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Kelola Berita</span>
              </Link>
              <Link to="/admin/finance" className="p-4 border border-gray-100 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <TrendingUp size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">Monitoring Kas</span>
              </Link>
            </div>
          </div>

          {/* Table Preview Berita dari Firebase */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Berita Terakhir Dipublish</h3>
              <Link to="/admin/news" className="text-sm text-emerald-600 hover:underline font-medium">Lihat Semua</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Judul Artikel</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={3} className="px-6 py-4 text-center">Memuat data...</td></tr>
                  ) : recentNews.map((news) => (
                    <tr key={news.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800 line-clamp-1">{news.title}</td>
                      <td className="px-6 py-4 text-gray-500">{news.category}</td>
                      <td className="px-6 py-4 text-gray-500">{news.date}</td>
                    </tr>
                  ))}
                  {!loading && newsList.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-4 text-center">Belum ada berita.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- KOLOM KANAN: FINANCIAL SUMMARY --- */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Progress Donasi</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500">Terkumpul</span>
                <span className="font-bold text-emerald-600">
                  {Math.round((collectedAmount / targetAmount) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min((collectedAmount / targetAmount) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="pt-4 border-t border-gray-50 mt-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Data ini disinkronkan dengan monitoring kas pembangunan untuk transparansi publik di halaman utama.
                </p>
                <Link to="/admin/finance" className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                  Perbarui Data Keuangan →
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;