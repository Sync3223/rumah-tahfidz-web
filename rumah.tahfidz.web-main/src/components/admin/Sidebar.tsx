import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image, Wallet, FileText, LogOut, X, Users, Settings, ChevronRight, Target } from 'lucide-react';
import { authService } from '../../services/authService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/hero', label: 'Hero Section', icon: Image },
    { path: '/admin/structure', label: 'Kelola Pengurus', icon: Users },
    { path: '/admin/finance', label: 'Keuangan', icon: Wallet },
    { path: '/admin/news', label: 'Kelola Berita', icon: FileText },
    { path: '/admin/program', label: 'Program', icon: Target },
  ];

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authService.logout();
      navigate('/admin/LoginAdmin');
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <>
      {/* Overlay Mobile dengan blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500" 
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed left-0 top-0 h-screen w-72 bg-[#0F172A] text-slate-300 z-50 
        overflow-y-auto transition-all duration-500 ease-in-out border-r border-slate-800/50
        ${isOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* LOGO AREA */}
        <div className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Settings className="text-white animate-spin-slow" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">ADMIN</h1>
              <span className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase">Control Panel</span>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* PROFILE MINI CARD
        <div className="px-6 mb-8">
          <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-emerald-500 to-teal-400 p-0.5">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin</p>
              <p className="text-[10px] text-slate-500 uppercase font-black">Super Admin</p>
            </div>
          </div>
        </div> */}
        
        {/* NAVIGATION */}
        <nav className="px-4 space-y-1.5">
          <p className="px-4 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Main Menu</p>
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => { if(window.innerWidth < 1024) onClose(); }}
                className={`
                  group relative flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300
                  ${isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 shadow-sm' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                  }
                `}
              >
                {/* Active Indicator Glow */}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-r-full shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                )}

                <item.icon size={20} className={`mr-4 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-emerald-500' : 'text-slate-500 group-hover:text-white'}`} />
                <span className="text-sm font-bold tracking-tight flex-1">{item.label}</span>
                
                {isActive && <ChevronRight size={14} className="text-emerald-500" />}
              </Link>
            );
          })}
          
          {/* LOGOUT BUTTON */}
          <div className="pt-8 mt-8 border-t border-slate-800/50">
            <button 
              onClick={handleLogout}
              className="group w-full flex items-center px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-red-500/20 flex items-center justify-center mr-4 transition-colors">
                <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-sm font-bold tracking-tight">Sign Out</span>
            </button>
          </div>
        </nav>

        {/* FOOTER INFO */}
        <div className="mt-auto p-8">
           <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-500/10 to-transparent border border-emerald-500/10">
              <p className="text-[10px] text-slate-500 font-bold mb-1 italic">V.2.0.4 Stable</p>
              <p className="text-[10px] text-slate-400">© 2026 Admin Management</p>
           </div>
        </div>

      </aside>

      {/* Global CSS for Smoothness */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Sidebar;