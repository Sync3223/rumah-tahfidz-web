import React, { useState } from 'react';
import { X, UploadCloud, AlertCircle, Loader2 } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: (data: any) => void;
}

export const NewsModal = ({ isOpen, onClose, onSubmit, formData, setFormData }: NewsModalProps) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMsg(null);

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg("Ukuran gambar terlalu besar. Maksimal 2MB.");
      return;
    }

    try {
      setIsUploading(true);
      const imageRef = ref(storage, `news-images/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setFormData({ ...formData, image: downloadURL });
    } catch (error) {
      console.error("Gagal mengupload gambar:", error);
      setErrorMsg("Terjadi kesalahan saat mengupload gambar ke server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-800">Buat Berita Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Judul & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Judul Berita</label>
              <input 
                required 
                value={formData.title || ''} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                type="text" 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Kategori</label>
              <select 
                value={formData.category || 'Kegiatan'} 
                onChange={e => setFormData({...formData, category: e.target.value})} 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Kegiatan">Kegiatan</option>
                <option value="Pengumuman">Pengumuman</option>
                <option value="Pembangunan">Pembangunan</option>
              </select>
            </div>
          </div>

          {/* Tanggal Publish & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Tanggal Kegiatan</label>
              <input 
                required 
                type="date" 
                value={formData.date || ''} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
              <select 
                value={formData.status || 'Published'} 
                onChange={e => setFormData({...formData, status: e.target.value})} 
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Ringkasan (Excerpt)</label>
            <textarea 
              required 
              value={formData.excerpt || ''} 
              onChange={e => setFormData({...formData, excerpt: e.target.value})} 
              rows={2} 
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Isi Konten Berita</label>
            <RichTextEditor 
              content={formData.content || ''} 
              onChange={(html) => setFormData({...formData, content: html})} 
            />
          </div>

          {/* UPLOAD GAMBAR */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Gambar Berita (Maks 2MB)</label>
            
            <div className="flex items-center gap-4">
              <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                isUploading 
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}>
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                <span className="font-medium text-sm">{isUploading ? 'Mengupload...' : 'Pilih Gambar'}</span>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/webp" 
                  onChange={handleImageUpload} 
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              
              {errorMsg && (
                <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                  <AlertCircle size={14} /> {errorMsg}
                </span>
              )}
            </div>

            {formData.image && !errorMsg && !isUploading && (
              <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, image: ''})} 
                  className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 hover:bg-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isUploading}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-all ${isUploading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              Simpan Berita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};