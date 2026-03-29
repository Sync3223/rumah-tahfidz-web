import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft, User, Share2 } from 'lucide-react';
import { useNewsData } from '../../hooks/useNewsData';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsList, loading } = useNewsData();

  // Data berdasarkan ID 
  const news = newsList.find(item => item.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800">Berita tidak ditemukan</h2>
        <button onClick={() => navigate('/news')} className="mt-4 text-teal-600 font-bold underline">Kembali ke Berita</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 pt-28">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate('/news')}
          className="group flex items-center gap-2 text-teal-700 font-bold text-sm mb-8 hover:gap-4 transition-all uppercase tracking-widest"
        >
          <ArrowLeft size={18} /> Kembali ke Berita
        </button>

        {/* Header Berita */}
        <div className="space-y-6 mb-10">
          <span className="bg-teal-600 text-white text-[10px] font-black uppercase px-4 py-2 rounded-full tracking-widest">
            {news.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-teal-800 leading-tight">
            {news.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm font-medium border-y border-gray-100 py-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-teal-600" />
              {news.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-teal-600" />
              By {"Admin"}
            </div>
          </div>
        </div>

        {/* Gambar Utama */}
        <div className="rounded-[40px] overflow-hidden shadow-2xl mb-12 aspect-video">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Konten Berita */}
        <div className="prose prose-lg prose-teal max-w-none text-gray-600 leading-relaxed font-medium">
          <div dangerouslySetInnerHTML={{ __html: news.content || "<p>Konten tidak tersedia.</p>" }} />
        </div>

        {/* Footer Berita / Share */}
        <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-sm font-bold uppercase tracking-widest">
            Bagikan Berita Ini:
          </div>
          <div className="flex gap-4">
            <button className="p-3 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 rounded-full transition-all">
              <Share2 size={20} />
            </button>
            <button className="px-6 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20">
              Salin Link
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewsDetailPage;