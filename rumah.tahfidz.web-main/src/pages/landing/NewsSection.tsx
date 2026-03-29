import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { useNewsData } from '../../hooks/useNewsData';

const ReportSection = () => {
  const { newsList } = useNewsData();

  // 1. FILTER: Hanya ambil berita yang statusnya 'Published'
  const publishedNews = newsList.filter(news => news.status === 'Published');

  // 2. SLICE: Mengambil 3 berita terbaru dari yang sudah difilter
  const latestReports = publishedNews.slice(0, 3);

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">
        
        {/* --- NEWS GRID --- */}
        {latestReports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* 3. MAP: Gunakan variabel latestReports yang sudah bersih */}
            {latestReports.map((report) => (
              <div key={report.id} className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={report.image} 
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-teal-600 mb-3 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={14} />
                    {report.date}
                  </div>
                  <h3 className="text-xl font-bold text-teal-800 mb-4 line-clamp-2 min-h-14">
                    {report.title}
                  </h3>
                  <Link 
                    to={`/news/${report.id}`}
                    className="inline-flex items-center gap-2 text-teal-700 font-bold text-sm hover:gap-3 transition-all"
                  >
                    Baca Berita <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mb-16">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
            <p className="text-gray-500">Nantikan kabar terbaru dari kami.</p>
          </div>
        )}

        {/* --- FOOTER SECTION --- */}
        <div className="text-center border-t border-gray-100 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link 
              to="/news"
              className="px-12 py-4 rounded-full border-2 border-teal-600 text-teal-600 font-bold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300"
            >
              Lihat Semua Berita
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ReportSection;