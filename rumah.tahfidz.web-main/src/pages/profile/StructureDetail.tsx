import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { structureService } from '../../services/structureService';
import { type TeamMember } from '../../types/structureData';

const StructureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await structureService.getById(id);
          setMember(data);
        }
      } catch (error) {
        console.error("Error fetching member:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-gray-500">Loading Data...</div>;

  if (!member) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold text-gray-800">Profil Tidak Ditemukan</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-emerald-600 hover:underline">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Kembali ke Struktur
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row">
            
            {/* Foto Bagian Kiri */}
            <div className="md:w-1/3 bg-gray-100 relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover min-h-75"
              />
            </div>

            {/* Detail Bagian Kanan */}
            <div className="md:w-2/3 p-8 md:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                {member.divisionName || member.role}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
                {member.name}
              </h1>
              <p className="text-lg text-gray-500 font-medium mb-6">
                {member.role}
              </p>

              <hr className="border-gray-100 mb-6" />

              <div className="prose prose-emerald text-gray-600 mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Tentang Profil</h3>
                <p className="leading-relaxed">
                  {member.description}
                </p>
              </div>

              {/* Kontak Dummy */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Mail size={16} /> Email
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <Phone size={16} /> WhatsApp
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureDetail;