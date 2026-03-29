import { Link } from 'react-router-dom';

const ReportSection = () => {
  return (
    <section className="bg-white py-24 flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-bold text-teal-700 leading-tight mb-10">
          Tidak Ada <br />
          Ruang Untuk <br />
          Korupsi & Gratifikasi.
        </h2>

        {/* Tombol Action */}
        <Link to="/report" className="inline-block px-12 py-3 rounded-full border-2 border-teal-600 text-teal-600 font-bold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105">
          Laporan Kami
        </Link>

      </div>
    </section>
  );
};

export default ReportSection;