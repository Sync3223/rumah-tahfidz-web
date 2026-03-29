import { Link } from 'react-router-dom';
import bgImage from '../../assets/denah-images/landingProfile.jpg';

const ProfileSection = () => {
  return (
    <section className="relative w-full h-125 md:h-200 flex items-center justify-center overflow-hidden">
      
      {/* --- BACKGROUND IMAGE --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
      </div>
      <div className="absolute inset-0 bg-black/60"></div>
      {/* --- CONTENT --- */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-10 drop-shadow-lg">
          Membentuk Generasi Qur'ani <br className="hidden md:block" />
          Merancang Masa Depan Bangsa.
        </h2>
        {/* Tombol Profil Kami */}
        <Link to="/profile" className="inline-block px-10 py-3 rounded-full border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-teal-900 transition-all duration-300 transform hover:scale-105">
          Profil Kami
        </Link>

      </div>
    </section>
  );
};

export default ProfileSection;