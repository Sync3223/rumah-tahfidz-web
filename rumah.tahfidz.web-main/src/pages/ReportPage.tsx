import { FileText, Download, Search, FileDown } from 'lucide-react';
import { useState } from 'react';

const ReportPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Data Dummy Laporan
  const reports = [
    {
      id: 1,
      title: "Laporan Keuangan Pembangunan Januari 2026",
      date: "05 Feb 2026",
      fileSize: "2.4 MB",
      category: "Keuangan",
      pdfUrl: "/reports/jan-2026.pdf"
    },
    {
      id: 2,
      title: "Laporan Kegiatan Penyaluran Donasi Sembako",
      date: "20 Jan 2026",
      fileSize: "1.8 MB",
      category: "Kegiatan",
      pdfUrl: "/reports/kegiatan-sembako.pdf"
    },
    {
      id: 3,
      title: "Audit Eksternal & Laporan Tahunan 2025",
      date: "10 Jan 2026",
      fileSize: "5.2 MB",
      category: "Tahunan",
      pdfUrl: "/reports/annual-2025.pdf"
    }
  ];

  const filteredReports = reports.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HERO SECTION --- */}
      <div className="bg-teal-700 pt-32 pb-20 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">
            Pusat Laporan & Transparansi
          </h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-90">
            Bentuk pertanggungjawaban kami kepada donatur melalui laporan berkala yang dapat diunduh secara bebas.
          </p>
        </div>
      </div>

      {/* --- SEARCH & FILTER --- */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center border border-teal-100">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-600" size={20} />
            <input 
              type="text" 
              placeholder="Cari laporan..." 
              className="w-full pl-12 pr-4 py-3 bg-teal-50/50 border border-teal-100 rounded-xl outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl font-bold text-sm">
            <FileText size={18} />
            Total {reports.length} Dokumen
          </div>
        </div>
      </div>

      {/* --- REPORT GRID --- */}
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReports.map((report) => (
            <div key={report.id} className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              {/* Background Icon Decor */}
              <FileText className="absolute -right-4 -bottom-4 w-32 h-32 text-gray-50 group-hover:text-teal-50 transition-colors" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
                    <FileDown size={28} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                    {report.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-teal-900 mb-2 leading-tight min-h-12">
                  {report.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-8">
                  <span>{report.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{report.fileSize}</span>
                </div>

                <a 
                  href={report.pdfUrl} 
                  download
                  className="flex items-center justify-center w-full py-4 bg-teal-50 text-teal-700 rounded-2xl font-bold hover:bg-teal-600 hover:text-white transition-all duration-300 gap-2 group-hover:shadow-lg"
                >
                  <Download size={18} />
                  Unduh Laporan PDF
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredReports.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <p className="text-gray-500 font-medium">Laporan tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportPage;