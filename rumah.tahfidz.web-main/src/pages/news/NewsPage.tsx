import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNewsData } from '../../hooks/useNewsData';

const NewsPage = () => {
  const { newsList } = useNewsData();

  const publishedNews = newsList.filter((news) => news.status === 'Published');

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <div className="container mx-auto px-6">
        
        {/* Header Halaman */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-teal-800 mb-4 uppercase tracking-tight">
            Kabar Terbaru
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Ikuti perkembangan aktivitas, program, dan berita menarik lainnya dari Rumah Tahfidz kami.
          </p>
        </div>

        {publishedNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-4xl border-2 border-dashed border-gray-200 shadow-sm">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6">
              <Newspaper size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Berita</h2>
            <p className="text-gray-500">Saat ini belum ada berita yang dipublikasikan.</p>
          </div>
        ) : (
          /* Grid Berita */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedNews.map((news) => (
              <div 
                key={news.id} 
                className="group bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                {/* Area Gambar (48 units high) */}
                <div className="h-60 relative overflow-hidden">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-teal-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-widest shadow-lg">
                      {news.category}
                    </span>
                  </div>
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Konten Berita */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-teal-600 mb-4">
                    <Calendar size={14} />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">{news.date}</span>
                  </div>
                  
                  {/* Judul (Max 2 Baris) */}
                  <h3 className="text-xl font-black text-teal-800 mb-4 leading-tight line-clamp-2 min-h-14 group-hover:text-teal-600 transition-colors">
                    {news.title}
                  </h3>
                  
                  {/* Deskripsi (Max 3 Baris) */}
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {news.excerpt}
                  </p>

                  {/* Footer Card */}
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <Link 
                      to={`/news/${news.id}`}
                      className="inline-flex items-center gap-2 text-teal-700 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Selengkapnya <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;