import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Home, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import eyebirdView from '../assets/denah-images/3d-denah/EYEBIRD-VIEW.png';
import { useProgramData } from '../hooks/useProgramData';

const ProgramsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 3. Ambil data dari Firebase
  const { programs, loading, error } = useProgramData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 selection:bg-teal-100">
      
      {/* --- HERO INTRO: BIG & BOLD --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract Background Decor */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-teal-50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className={`container mx-auto px-6 lg:px-24 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={18} className="text-teal-500 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">Our Movements</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-slate-900 mb-8">
                KITA HADIR <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-emerald-400">SEBAGAI PEMBEDA.</span>
              </h1>
            </div>
            <div className="lg:w-1/2 lg:pt-12">
              <p className="text-xl text-slate-500 leading-relaxed font-medium border-l-4 border-slate-100 pl-8 italic">
                Bukan sekadar program rutin, tapi sebuah revolusi kebaikan yang terukur, transparan, dan berdampak nyata bagi masa depan generasi Qur'ani.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED BENTO: PEMBANGUNAN --- */}
      <section className="py-12 px-6 lg:px-24">
        <div className="group relative w-full h-150 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-teal-500/20">
          <img 
            src={eyebirdView} 
            alt="Gedung" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-500/40">
                  <Home size={24} />
                </div>
                <span className="text-white font-bold tracking-widest uppercase text-sm">Main Project</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Pembangunan Rumah Tahfidz
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-medium">
                Membangun ekosistem belajar yang nyaman dan modern untuk mencetak 1000 penghafal Al-Qur'an setiap tahunnya.
              </p>
            </div>
            <Link to="/building" className="group/btn flex items-center gap-4 bg-white px-8 py-5 rounded-full font-black text-slate-900 hover:bg-teal-500 hover:text-white transition-all shadow-xl whitespace-nowrap">
              PELAJARI LEBIH <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- GRID SECONDARY PROGRAMS --- */}
      <section className="py-24 px-6 lg:px-24">
        {/* 4. Handle Loading dan Error State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 rounded-[2.5rem] border border-red-100">
            <p className="text-red-500 font-medium">Gagal memuat program: {error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 5. Ganti otherPrograms jadi programs dari Firebase */}
            {programs.map((program) => {
              // 6. Dapatkan komponen Icon secara dinamis berdasarkan string iconName
              const IconComponent = (LucideIcons as any)[program.iconName] || LucideIcons.HelpCircle;

              return (
                <div key={program.id} className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="h-87.5 relative overflow-hidden bg-slate-200">
                    <img 
                      src={program.imageUrl} // 7. Ubah dari image menjadi imageUrl
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                      {/* Render Dynamic Icon */}
                      <IconComponent size={20} className={program.color} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">{program.tag}</span>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-teal-600 transition-colors tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                      {program.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- CALL TO ACTION: GLASS STYLE --- */}
      <section className="pb-32 px-6 lg:px-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 relative z-10 tracking-tighter">
            JADI BAGIAN DARI <br /> <span className="text-teal-400 italic">PERUBAHAN INI.</span>
          </h2>
          <Link to="/donation/general" className="relative z-10 inline-block bg-white text-slate-900 px-12 py-5 rounded-full font-black hover:bg-teal-400 transition-all shadow-2xl hover:scale-105 active:scale-95">
            DONASI SEKARANG
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ProgramsPage;