import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';
import { structureService } from '../../services/structureService';
import { type TeamMember } from '../../types/structureData';

const StructureProfile = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await structureService.getAll();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching structure data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="py-24 text-center">Loading Data...</div>;

  // Kelompokkan data yang didapat dari Firebase
  const leader = members.filter(m => m.category === 'Leader');
  const coreTeam = members.filter(m => m.category === 'Core');
  const divisions = members.filter(m => m.category === 'Division');

  // Helper component Card
  const MemberCard = ({ member }: { member: TeamMember }) => (
    <div className="group relative w-full max-w-70 bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 hover:-translate-y-2">
      {/* IMAGE CONTAINER (Aspek Rasio 1:1 Square) */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
           <button className="p-2.5 bg-white rounded-full text-slate-900 hover:bg-teal-500 hover:text-white transition-colors">
             <Instagram size={16} />
           </button>
           <button className="p-2.5 bg-white rounded-full text-slate-900 hover:bg-teal-500 hover:text-white transition-colors">
             <Linkedin size={16} />
           </button>
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 text-center">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 inline-block px-3 py-1 rounded-full border ${member.category === 'Leader' ? 'bg-teal-50 border-teal-100 text-teal-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
          {member.role}
        </span>
        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-teal-600 transition-colors mb-4">
          {member.name}
        </h3>
        <Link to={`/profile/${member.id}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-300 group-hover:bg-teal-500 group-hover:text-white transition-all">
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-24">
          <span className="text-teal-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Our Organization</span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">
            STRUKTUR <span className="italic text-teal-500">NUFARA.</span>
          </h2>
          <div className="w-20 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* --- PYRAMID CONTAINER --- */}
        <div className="flex flex-col gap-16 items-center">
          
          {/* LEVEL 1: TOP (LEADER) */}
          <div className="flex justify-center w-full">
            {leader.map(m => <MemberCard key={m.id} member={m} />)}
          </div>

          {/* CONNECTOR LINE (Desktop Only) */}
          <div className="hidden md:block w-px h-12 bg-linear-to-b from-teal-500/50 to-transparent -mt-16 -mb-8"></div>

          {/* LEVEL 2: MIDDLE (CORE TEAM) */}
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
            {coreTeam.map(m => <MemberCard key={m.id} member={m} />)}
          </div>

          {/* LEVEL 3: BASE (DIVISIONS) */}
          <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
            {divisions.map(m => <MemberCard key={m.id} member={m} />)}
          </div>

        </div>

        {/* --- INFO BOX --- */}
        <div className="mt-32 max-w-3xl mx-auto p-1 bg-linear-to-r from-teal-500 to-blue-500 rounded-[2.5rem]">
            <div className="bg-white rounded-[2.4rem] p-10 text-center">
                <h4 className="text-2xl font-black mb-4">Kolaborasi Tanpa Batas</h4>
                <p className="text-slate-500 font-medium">
                  Kami selalu mencari talenta hebat yang ingin berkontribusi dalam pembangunan umat manusia.
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default StructureProfile;