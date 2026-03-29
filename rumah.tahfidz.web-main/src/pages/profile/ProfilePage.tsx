import { useState, useEffect } from 'react';
//import StructureProfile from './StructureProfile';
import { useProfileData } from '../../data/profileData';

const ProfilePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { profileData } = useProfileData();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-5%] w-100 h-100 rounded-full bg-teal-100/50 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-75 h-75 rounded-full bg-blue-100/50 blur-[100px]" />
        </div>

        <div className={`container mx-auto px-6 lg:px-20 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-teal-700 uppercase bg-teal-50 border border-teal-100 rounded-full">
              {profileData.hero.tag}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              {profileData.hero.title}
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl border-l-4 border-teal-500 pl-6">
              <span className="font-semibold block mb-2 text-slate-800">Tujuan Umum:</span>
              {profileData.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* --- BANNER IMAGE --- */}
      <section className="px-6 lg:px-20 mb-24">
        <div className="relative h-100 md:h-150 rounded-[2.5rem] overflow-hidden shadow-2xl group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110"
            style={{ backgroundImage: `url('${profileData.banner.image}')` }}
          />
          {/* Overlay Gradient: Modern Cinematic Look */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-12 left-8 md:left-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
              {profileData.banner.text}
            </h2>
          </div>
        </div>
      </section>

      {/* --- VISI & MISI SECTION --- */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left: Visi */}
            <div className="lg:col-span-5">
              <h2 className="text-sm font-bold uppercase text-teal-600 mb-4 tracking-[0.3em]">Visi Utama</h2>
              <div className="relative">
                <span className="absolute -top-10 -left-10 text-[120px] font-black text-slate-50 select-none -z-10">“</span>
                <p className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                  {profileData.vision.content}
                </p>
              </div>
            </div>

            {/* Right: Misi */}
            <div className="lg:col-span-7 bg-slate-50 p-8 md:p-12 rounded-4xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-teal-500 rounded-full"></span>
                Misi Strategis
              </h3>
              <div className="grid gap-6">
                {profileData.mission.points.map((misi, i) => (
                  <div key={i} className="flex gap-5 group">
                    <span className="shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center font-bold text-teal-600 border border-slate-200 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      0{i + 1}
                    </span>
                    <p className="text-lg text-slate-600 pt-1 leading-relaxed">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TUJUAN KHUSUS SECTION --- */}
      <section className="py-20 bg-teal-900 text-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-4">Tujuan Khusus</h2>
            <p className="text-teal-200">Kompetensi utama yang akan dicapai oleh setiap peserta didik NUFARA:</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData.tujuanKhusus.map((tujuan, i) => (
              <div key={i} className="flex items-start gap-4 bg-teal-800/50 p-6 rounded-2xl border border-teal-700/50">
                <div className="shrink-0 w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                  ✓
                </div>
                <p className="text-teal-50 leading-relaxed">{tujuan}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROGRAMS GRID --- */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Program Utama</h2>
            <p className="text-slate-500">Kurikulum terintegrasi untuk hasil yang maksimal</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.programs.map((prog, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-2">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                  <svg className="w-6 h-6 text-teal-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">{prog.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{prog.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODEL IMPLEMENTASI --- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h3 className="text-2xl font-bold mb-8 text-slate-800">Model Implementasi</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {profileData.implementasi.map((item, i) => (
              <span key={i} className="px-6 py-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-full text-sm font-medium shadow-sm hover:border-teal-300 hover:text-teal-700 transition-colors cursor-default">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- STRUCTURE SECTION ---
      <div className="bg-white pb-20">
        <StructureProfile />
      </div> */}

    </div>
  );
};

export default ProfilePage;