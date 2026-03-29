// Data Dummy Foto Pembangunan
const galleryImages = [
  { id: 1, url: "https://images.unsplash.com/photo-1503387762-592dea58ef2e?auto=format&fit=crop&w=800&q=80", title: "ASRAMA" },
  { id: 2, url: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=800&q=80", title: "Pemasangan Bata" },
  { id: 3, url: "https://images.unsplash.com/photo-1590348697170-717bdc399e4e?auto=format&fit=crop&w=800&q=80", title: "Pengecoran Lantai 2" },
  { id: 4, url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80", title: "Instalasi Listrik" },
  { id: 5, url: "https://images.unsplash.com/photo-1504307651254-35680fb3bf68?auto=format&fit=crop&w=800&q=80", title: "Plaster Dinding" },
  { id: 6, url: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80", title: "Area Taman" },
];

const BuildingGallery = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-teal-800 uppercase tracking-tight mb-4">
            Dokumentasi Progres
          </h2>
          <p className="text-gray-500 font-medium max-w-xl">
            Transparansi pembangunan melalui rekaman visual dari setiap tahap pengerjaan di lapangan.
          </p>
        </div>

        {/* Grid Gambar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img) => (
            <div 
              key={img.id} 
              className="group relative h-72 rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay Text on Hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-bold text-lg uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildingGallery;