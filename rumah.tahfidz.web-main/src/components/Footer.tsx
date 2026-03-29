import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-950 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* KOLOM 1: LOGO & DESKRIPSI */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 text-3xl font-black text-teal-500 uppercase tracking-tighter">
              <img src={logo} alt="YRT Logo" className="h-10 w-auto" />
              <span>RUMAH<span className="text-white">TAHFIDZ</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed font-medium text-sm">
              Mewujudkan generasi Qur'ani yang unggul dalam sains dan teknologi untuk masa depan peradaban Islam.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full hover:bg-teal-600 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-teal-600 transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-teal-600 transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* KOLOM 2: TAUTAN CEPAT */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-teal-500">Navigasi</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-teal-600 transition-colors">Beranda</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-teal-600 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/program" className="text-gray-400 hover:text-teal-600 transition-colors">Program Tahfidz</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-teal-600 transition-colors">Kabar Terbaru</Link></li>
            </ul>
          </div>

          {/* KOLOM 3: INFORMASI KONTAK */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-teal-500">Hubungi Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-gray-400">
                <MapPin className="text-teal-500 shrink-0" size={20} />
                <span className="text-sm">Jl. Raya Tahfidz No. 123, Serang, Banten, Indonesia</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Phone className="text-teal-500 shrink-0" size={20} />
                <span className="text-sm">+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <Mail className="text-teal-500 shrink-0" size={20} />
                <span className="text-sm">info@rumahtahfidz.or.id</span>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: NEWSLETTER / CTA */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-widest text-teal-500">Newsletter</h3>
            <p className="text-gray-400 text-sm">Dapatkan info program dan kegiatan terbaru via email.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="w-full px-5 py-3 border border-gray-350 rounded-xl focus:outline-none focus:border-teal-500 transition-all"
              />
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-600/20">
                Kabari Saya
              </button>
            </div>
          </div>

        </div>

        {/* GARIS PEMISAH & COPYRIGHT */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest text-center">
            © {new Date().getFullYear()} Rumah Tahfidz. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-teal-500">Kebijakan Privasi</a>
            <a href="#" className="hover:text-teal-500">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;