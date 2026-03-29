const BuildingHero = () => {
  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-black text-teal-800 mb-8 leading-tight uppercase">
          rumah mereka 
          <br /> awal dari karya
          <br /> & prestasi mereka.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg text-gray-600 leading-relaxed font-medium">
          <p>
            Rumah Tahfidz kami sedang dalam tahap pengembangan fasilitas asrama dan ruang belajar yang lebih representatif. Proyek ini bertujuan untuk menampung lebih banyak santri yang ingin mendedikasikan hidupnya untuk Al-Qur'an.
          </p>
          <p>
            Setiap bata yang tersusun adalah investasi akhirat bagi para donatur. Mari bersama-sama mewujudkan lingkungan belajar yang nyaman bagi para calon ulama masa depan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BuildingHero;