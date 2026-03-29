import { useState, useEffect } from 'react';
import { Map, Layout, ChevronLeft, ChevronRight } from 'lucide-react';

const BuildingPlan = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderImages, setRenderImages] = useState<string[]>([
    // Fallback images jika folder kosong
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
  ]);

  useEffect(() => {
    const images = import.meta.glob('../../assets/denah-images/3d-denah/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const loadedImages = Object.values(images).map((img: any) => img.default);

    if (loadedImages.length > 0) {
      setRenderImages(loadedImages);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % renderImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + renderImages.length) % renderImages.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">

        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-teal-800 uppercase tracking-tight mb-4">
            Masterplan Rumah Tahfidz
          </h2>
          <p className="text-gray-500 font-medium max-w-2xl leading-relaxed">
            Perencanaan ruang yang matang untuk memastikan kenyamanan santri dalam menghafal Al-Qur'an dan kemudahan akses fasilitas umum.
          </p>
        </div>

        {/* Grid Layout: Kiri Denah, Kanan Desain */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* SISI KIRI: GAMBAR DENAH (Architectural Blueprint) */}
          <div className="group relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-black text-teal-800 uppercase tracking-widest">Denah</h3>
            </div>

            <div className="relative rounded-[40px] overflow-hidden bg-white p-6 border border-gray-100 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl transition-all duration-500">
              <img
                src="./src/assets/denah-images/denah.png"
                alt="Blueprints Denah"
                className="w-full h-full object-contain aspect-square rounded-4x1 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* SISI KANAN: DESAIN PEMBANGUNAN (3D Render/Visual) */}
          <div className="group relative">
            <div className="mb-6 flex items-center gap-3">
              <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-black text-teal-800 uppercase tracking-widest">Visualisasi 3D</h3>
            </div>

            <div className="relative rounded-[40px] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 group-hover:shadow-2xl transition-all duration-500 aspect-square">
              <img
                src={renderImages[currentIndex]}
                alt={`3D Render Building ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg text-teal-800 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg text-teal-800 transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {renderImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BuildingPlan;