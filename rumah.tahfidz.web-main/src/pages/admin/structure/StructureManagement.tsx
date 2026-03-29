import { useState, useEffect } from 'react';
import { structureService } from '../../../services/structureService';
import { type TeamMember } from '../../../types/structureData';
import StructureModal from './StructureModal';
import { Edit, Trash2, Plus } from 'lucide-react';

const StructureManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await structureService.getAll();
      setMembers(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
    } else {
      setEditingMember(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (data: Omit<TeamMember, 'id'>) => {
    if (editingMember) {
      // Mode Edit
      await structureService.update(editingMember.id, data);
    } else {
      // Mode Tambah Baru
      await structureService.add(data);
    }
    fetchMembers(); // Refresh data setelah simpan
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Yakin ingin menghapus pengurus ini?')) {
      await structureService.delete(id);
      fetchMembers();
    }
  };

  if (loading) return <div className="p-6">Loading data...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Pengurus</h1>
          <p className="text-sm text-gray-500">Atur struktur organisasi Rumah Tahfidz</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-emerald-700 transition"
        >
          <Plus size={18} className="mr-2" /> Tambah Pengurus
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xs border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Profil</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Deskripsi</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">Belum ada data pengurus.</td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={member.image} alt="" className="h-10 w-10 rounded-full object-cover border" />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-emerald-600">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${member.category === 'Leader' ? 'bg-purple-100 text-purple-800' : 
                          member.category === 'Core' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {member.category}
                      </span>
                      {member.divisionName && <div className="text-xs text-gray-500 mt-1">{member.divisionName}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">{member.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleOpenModal(member)} className="text-blue-600 hover:text-blue-900 p-1 bg-blue-50 rounded">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900 p-1 bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modal */}
      <StructureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingMember}
      />
    </div>
  );
};

export default StructureManagement;