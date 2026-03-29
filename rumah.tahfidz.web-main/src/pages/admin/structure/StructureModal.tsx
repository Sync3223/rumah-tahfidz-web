import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { type TeamMember } from '../../../types/structureData';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../config/firebase'; // Pastikan path config firebase benar

interface StructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<TeamMember, 'id'>) => Promise<void>;
  initialData?: TeamMember | null;
}

const StructureModal = ({ isOpen, onClose, onSave, initialData }: StructureModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'Division' as 'Leader' | 'Core' | 'Division',
    divisionName: '',
    description: '',
    image: '',
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mengisi form jika dalam mode Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        role: initialData.role,
        category: initialData.category,
        divisionName: initialData.divisionName || '',
        description: initialData.description,
        image: initialData.image,
      });
      setImagePreview(initialData.image);
    } else {
      // Reset form jika tambah baru
      setFormData({
        name: '', role: '', category: 'Division', divisionName: '', description: '', image: ''
      });
      setImagePreview('');
      setImageFile(null);
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Preview gambar lokal
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Jika ada file gambar baru yang diupload
      if (imageFile) {
        const imageRef = ref(storage, `structure-images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Validasi gambar (wajib ada)
      if (!imageUrl) {
        alert("Mohon upload gambar pengurus!");
        setIsSubmitting(false);
        return;
      }

      const dataToSave: Omit<TeamMember, 'id'> = {
        name: formData.name,
        role: formData.role,
        category: formData.category,
        description: formData.description,
        image: imageUrl,
      };

      // Tambahkan divisionName jika kategorinya Division
      if (formData.category === 'Division') {
        dataToSave.divisionName = formData.divisionName;
      }

      await onSave(dataToSave);
      onClose();
    } catch (error) {
      console.error("Error saving structure data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Pengurus' : 'Tambah Pengurus'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* FOTO UPLOAD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Pengurus</label>
            <div className="flex items-center gap-6">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border" />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed flex items-center justify-center text-gray-400">
                  <Upload size={24} />
                </div>
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <p className="text-xs text-gray-500 mt-2">Format: JPG, PNG. Rekomendasi rasio 1:1 (Square).</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap & Gelar</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: Dr. Fulan, M.Ag"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
              <input 
                type="text" 
                required
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Contoh: Ketua Yayasan"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tingkatan / Kategori</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="Leader">Leader (Pimpinan)</option>
                <option value="Core">Core (Pengurus Inti)</option>
                <option value="Division">Division (Divisi/Bagian)</option>
              </select>
            </div>
            
            {formData.category === 'Division' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Divisi</label>
                <input 
                  type="text" 
                  required={formData.category === 'Division'}
                  value={formData.divisionName}
                  onChange={e => setFormData({...formData, divisionName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Contoh: Divisi Pendidikan"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Tugas</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              placeholder="Jelaskan peran atau latar belakang pengurus..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StructureModal;