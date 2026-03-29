import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, User, Bell, Search } from 'lucide-react';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* --- SIDEBAR --- */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-500 lg:ml-72">
        
        {/* --- HEADER: GLASSMORPHISM STYLE --- */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            
            <div className="flex items-center gap-4">
              {/* Menu Mobile Button */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-600 rounded-xl lg:hidden transition-colors"
              >
                <Menu size={22} />
              </button>

              {/* Welcome Text */}
              <div className="hidden sm:block">
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                  Dashboard <span className="text-emerald-500 text-sm font-medium ml-2 uppercase tracking-widest italic">/ Overview</span>
                </h2>
              </div>
            </div>

            {/* Right Action Area */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Search Icon (Opsional) */}
              <button className="p-2 text-slate-400 hover:text-emerald-500 transition-colors hidden md:block">
                <Search size={20} />
              </button>

              {/* Notification Icon */}
              <div className="relative p-2 text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer group">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform" />
              </div>

              {/* Vertical Divider */}
              <div className="w-px h-8 bg-slate-200 hidden xs:block" />

              {/* User Profile Info */}
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="text-right hidden xs:block">
                  <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-emerald-600 transition-colors">Admin Utama</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-black uppercase tracking-tighter">Super Admin</p>
                </div>
                
                <div className="relative">
                  <div className="w-10 h-10 bg-linear-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                    <User size={20} />
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
              </div>
            </div>

          </div>
        </header>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <main className="p-6 md:p-10 flex-1">
          {/* Container agar konten tidak terlalu lebar di layar ultra-wide */}
          <div className="max-w-7xl mx-auto">
            {/* Animasi Masuk Konten */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Outlet />
            </div>
          </div>
        </main>

        {/* --- FOOTER MINI --- */}
        <footer className="px-10 py-6 border-t border-slate-100 bg-white/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              © 2026 Management System
            </p>
            <div className="flex gap-6">
              <span className="text-[10px] font-black text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors">HELP CENTER</span>
              <span className="text-[10px] font-black text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors">PRIVACY POLICY</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AdminLayout;