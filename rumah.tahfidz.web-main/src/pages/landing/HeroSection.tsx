import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useHeroData } from '../../hooks/useHeroData';

const HeroSection = () => {
  const { images, title, subtitle } = useHeroData(); // Ambil data dari hook
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <section className="relative w-full h-screen flex items-end bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pb-20 w-full">
        <h1 className="text-5xl md:text-8xl font-extrabold mb-4 uppercase">{title}</h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8">{subtitle}</p>
        <Link to="/donation/general" className="inline-block border-2 border-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-emerald-900 transition-all">
          DONASI SEKARANG
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;