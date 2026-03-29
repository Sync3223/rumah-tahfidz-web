import { useState } from 'react';
import { Plus, Edit, Trash2, LayoutGrid, AlertCircle, Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useProgramData } from '../../../hooks/useProgramData';
import { type Program, deleteProgram } from '../../../services/programService';
import ProgramModal from './ProgramModal';

const ProgramManagement = () => {
  const { programs, loading, error, refetch } = useProgramData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleAdd = () => {
    setSelectedProgram(null);
    setIsModalOpen(true);
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data program ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        await deleteProgram(id, imageUrl);
        refetch(); // Refresh tabel
      } catch (err) {
        alert('Terjadi kesalahan. Gagal menghapus program.');
      }
    }
  };

  // --- LOADING STATE ---
  if (loading) return (
    <div className="flex flex-col h-64 items-center justify-center text-teal-600">
      <Loader2 size={32} className="animate-spin mb-4" />
      <span className="font-medium tracking-wide">Memuat Data Program...</span>
    </div>
  );

  // --- ERROR STATE ---
  if (error) return (
    <div className="p-6">
      <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-100 flex items-center gap-4">
        <AlertCircle size={24} />
        <div>
          <h3 className="font-bold">Gagal Memuat Data</h3>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Manajemen Program</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Kelola daftar program unggulan dan layanan Rumah Tahfidz.</p>
          </div>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-700 hover:shadow-teal-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
        >
          <Plus size={20} />
          Tambah Program
        </button>
      </div>

      {/* --- TABLE CONTENT --- */}
      <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-gray-500 w-20 text-center">No</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-gray-500">Visual</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-gray-500">Informasi Program</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-gray-500 text-center">Ikon Visual</th>
                <th className="px-6 py-5 font-bold text-xs uppercase tracking-wider text-gray-500 text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {programs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <LayoutGrid size={48} className="mb-4 opacity-20" />
                      <p className="text-gray-500 font-medium">Belum ada data program yang terdaftar.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                programs.map((program) => {
                  // Dinamis render icon dari Lucide
                  const IconComponent = (LucideIcons as any)[program.iconName] || LucideIcons.HelpCircle;

                  return (
                    <tr key={program.id} className="hover:bg-gray-50/80 transition-colors duration-200 group">
                      
                      {/* Urutan */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold text-sm">
                          {program.order}
                        </span>
                      </td>

                      {/* Gambar */}
                      <td className="px-6 py-4">
                        <div className="relative aspect-square w-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                          <img 
                            src={program.imageUrl} 
                            alt={program.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                      </td>

                      {/* Info Program */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-gray-800 mb-1">{program.title}</span>
                          <span className="inline-block w-max px-2.5 py-1 rounded-md bg-teal-50 text-teal-700 text-[10px] font-black uppercase tracking-widest mb-2 border border-teal-100">
                            {program.tag}
                          </span>
                          <p className="text-sm text-gray-500 line-clamp-2 max-w-md leading-relaxed">
                            {program.desc}
                          </p>
                        </div>
                      </td>

                      {/* Ikon */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className={`p-3 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm ${program.color} group-hover:-translate-y-1 transition-transform duration-300`}>
                            <IconComponent size={24} />
                          </div>
                          <span className="text-[10px] font-semibold text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">
                            {program.iconName}
                          </span>
                        </div>
                      </td>

                      {/* Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button 
                            onClick={() => handleEdit(program)} 
                            className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm" 
                            title="Ubah Data"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(program.id, program.imageUrl)} 
                            className="p-2.5 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-300 shadow-sm" 
                            title="Hapus Data"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- RENDER MODAL --- */}
      <ProgramModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        program={selectedProgram}
        onSuccess={refetch}
        totalPrograms={programs.length}
      />
    </div>
  );
};

export default ProgramManagement;