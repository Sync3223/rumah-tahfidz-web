import { useState } from 'react';
import { FileText, Newspaper, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNewsData } from '../../hooks/useNewsData';

const DonationTabs = () => {
  const [activeTab, setActiveTab] = useState<'detail' | 'news'>('detail');
  const { newsList } = useNewsData();

  const publishedNews = newsList.filter(news => news.status === 'Published');
  const recentNews = publishedNews.slice(0, 3);

  return (
    <div className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* --- TAB HEADERS --- */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('detail')}
            className={`flex items-center gap-2 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'detail'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <FileText size={18} />
            Detail Program
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'news'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            <Newspaper size={18} />
            Kabar Terbaru
          </button>
        </div>

        {/* --- TAB CONTENT --- */}
        <div className="min-h-75">
          
          {/* CONTENT: DETAIL */}
          {activeTab === 'detail' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="md:col-span-2 space-y-6 text-gray-600 leading-relaxed">
                <h3 className="text-2xl font-bold text-gray-800">Membangun Peradaban Qur'ani</h3>
                <p>
                  Program pembangunan Rumah Tahfidz ini bertujuan untuk menyediakan fasilitas yang layak, nyaman, dan kondusif bagi para santri penghafal Al-Qur'an. Gedung ini nantinya akan terdiri dari asrama, ruang kelas, masjid, dan area olahraga.
                </p>
                <p>
                  Dengan berdonasi, Anda tidak hanya membantu mendirikan bangunan fisik, tetapi juga turut serta dalam membangun karakter generasi muda yang berakhlak mulia. Setiap ayat yang dibaca dan dihafal oleh santri akan menjadi aliran pahala jariyah bagi Anda.
                </p>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-6">
                  <h4 className="font-bold text-gray-800 mb-4">Spesifikasi Pembangunan:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={20} />
                      <span>Gedung Asrama 3 Lantai (Kapasitas 150 Santri)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={20} />
                      <span>Masjid Jami' & Aula Serbaguna</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={20} />
                      <span>Laboratorium Bahasa & Komputer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-500 shrink-0 mt-0.5" size={20} />
                      <span>Sanitasi Air Bersih & Area Olahraga</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="md:col-span-1">
                <div className="bg-teal-700 text-white p-6 rounded-2xl shadow-lg">
                  <h4 className="font-bold text-lg mb-4">Kenapa Harus Bantu?</h4>
                  <p className="text-teal-100 text-sm mb-6">
                    "Jika seseorang meninggal dunia, maka terputuslah amalannya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, dan do’a anak yang sholeh." (HR. Muslim)
                  </p>
                  <div className="h-px bg-teal-600 w-full mb-6"></div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase text-teal-300 font-bold">Lokasi Proyek</p>
                    <p className="font-medium">Jl. Lintas Sumatra KM 43, Simpang Darul Arrafah, Bumi Ratu Nuban, Kab. Lampung Tengah, Prov. Lampung</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT: NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              {recentNews.length > 0 ? (
                recentNews.map((news) => (
                  <div key={news.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-teal-200 hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-widest mb-2">
                        <Calendar size={14} />
                        {news.date}
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{news.category}</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{news.title}</h4>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{news.excerpt}</p>
                      <Link to={`/news/${news.id}`} className="inline-flex items-center text-sm font-bold text-teal-700 hover:underline">
                        Baca Selengkapnya <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">Belum ada kabar terbaru untuk saat ini.</p>
                </div>
              )}
              
              <div className="text-center mt-8">
                <Link to="/news" className="inline-block px-6 py-2 border border-gray-300 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all">
                  Lihat Semua Berita
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DonationTabs;