import { Link } from 'react-router-dom';

// Temperory Data
const programs = [
  {
    title: "Qur'an & sains",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    positionClass: "md:top-10 md:left-10 lg:left-32",
    labelClass: "md:right-full md:mr-4"
  },
  {
    title: "Kecakapan teknologi",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    positionClass: "md:bottom-10 md:left-20 lg:left-32",
    labelClass: "md:right-full md:mr-4"
  },
  {
    title: "Bisnis & wirausaha",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    positionClass: "md:top-20 md:right-10 lg:right-32",
    labelClass: "md:left-full md:ml-4"
  },
  {
    title: "Pemimpin masa depan",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    positionClass: "md:bottom-12 md:right-14 lg:right-36",
    labelClass: "md:left-full md:ml-4"
  },
];

const ProgramSection = () => {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative min-h-125 md:min-h-175 flex flex-col md:flex-row items-center justify-center">

        {/* CENTER CONTENT  */}
        <div className="z-20 text-center relative mb-12 md:mb-0">
          <h2 className="text-5xl md:text-7xl font-bold text-teal-800 mb-6 leading-tight">
            Kita Hadir <br />
            Sebagai Pembeda.
          </h2>
          <Link
            to="../program"
            className="inline-block border-2 border-teal-600 text-teal-600 px-10 py-3 rounded-2xl font-semibold text-lg hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-sm"
          >
            Program Kami
          </Link>
        </div>

        {/* ORBITAL ITEMS */}
        {programs.map((item, index) => (
          <div
            key={index}
            className={`
              relative flex flex-col items-center md:absolute 
              ${item.positionClass} 
              animate-fade-in group
            `}
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Circle Image */}
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-teal-50 overflow-hidden shadow-xl transition-transform transform group-hover:scale-110">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Label Text */}
            <div className={`
                mt-4 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2
                bg-white border border-teal-100 text-teal-700 px-4 py-2 rounded-lg text-sm font-bold shadow-md whitespace-nowrap
                ${item.labelClass}
            `}>
              {item.title}
            </div>
          </div>
        ))}

        {/* Container for Mobile (Hidden on Desktop) */}
        <div className="grid grid-cols-1 gap-8 md:hidden mt-10">
        </div>

      </div>
    </section>
  );
};

export default ProgramSection;