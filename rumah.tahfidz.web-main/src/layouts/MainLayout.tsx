import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Footer from '../components/Footer';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 h-20 flex items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="YRT Logo" className="h-12 w-auto" />
                <span className="text-xl font-bold text-teal-800">Rumah Tahfidz</span>
            </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-teal-600 transition-colors">Beranda</Link>
            <Link to="/profile" className="hover:text-teal-600 transition-colors">Profil</Link>
            <Link to="/structure" className="hover:text-teal-600 transition-colors">Pengurus</Link>
            <Link to="/program" className="hover:text-teal-600 transition-colors">Program</Link>
            <Link to="/news" className="hover:text-teal-600 transition-colors">Berita</Link>
        </div>

        {/* Tombol Donasi di Navbar */}
        <div className="hidden md:block">
            <Link to="/donation/general" className="bg-teal-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-teal-700 transition">
                Donasi
            </Link>
        </div>
    </nav>
  );
};

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="grow pt-20"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;