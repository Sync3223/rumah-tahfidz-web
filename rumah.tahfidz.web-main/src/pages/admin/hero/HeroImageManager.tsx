import { Layout, Trash2, Plus, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface HeroImageManagerProps {
  images: string[];
  onRemove: (index: number) => void;
  onUpload: (files: FileList) => Promise<void>;
}

export const HeroImageManager = ({ images, onRemove, onUpload }: HeroImageManagerProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      try {
        await onUpload(e.target.files);
      } catch (err) {
        console.error("Failed to upload images:", err);
        alert("Waduh, gagal ngunggah gambar nih. Coba lagi ya!");
      } finally {
        setIsUploading(false);
        e.target.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Layout size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 tracking-tight">Galeri Slider Background</h3>
            <p className="text-sm text-gray-500 font-medium">Visual halaman depan</p>
          </div>
        </div>
        <div className="inline-flex items-center justify-center px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap">
          {images.length} Foto
        </div>
      </div>

      {/* --- GRID GALLERY --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Render Existing Images */}
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative aspect-video rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
          >
            <img 
              src={img} 
              alt="Preview" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            
            {/* Overlay Glassmorphism & Delete Button */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <button 
                onClick={() => onRemove(idx)} 
                className="p-3 bg-red-500/90 text-white rounded-2xl hover:bg-red-600 hover:-translate-y-1 transform active:scale-90 transition-all shadow-lg"
                title="Hapus Foto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        {/* Upload Button */}
        <label className={`
          relative flex flex-col items-center justify-center aspect-video 
          border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 group overflow-hidden
          ${isUploading 
            ? 'border-gray-200 bg-gray-50 opacity-70 cursor-wait' 
            : 'border-teal-200 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-400 hover:shadow-lg'
          }
        `}>
          {isUploading ? (
            <div className="flex flex-col items-center text-teal-600">
              <Loader2 size={32} className="animate-spin mb-3" />
              <span className="text-sm font-bold tracking-wide">MENGUNGGAH...</span>
            </div>
          ) : (
            <>
              <div className="p-3 bg-white rounded-full text-teal-400 group-hover:text-teal-600 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300 shadow-sm mb-3">
                <Plus size={28} />
              </div>
              <span className="text-sm font-bold text-gray-500 group-hover:text-teal-700 transition-colors">
                Tambah Foto Baru
              </span>
            </>
          )}
          
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            disabled={isUploading} 
          />
        </label>
      </div>

      {/* --- FOOTER INFO --- */}
      <div className="mt-auto pt-8 flex items-start gap-3 text-gray-400">
        <div className="p-1.5 bg-gray-50 rounded-lg shrink-0 mt-0.5">
          <ImageIcon size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">Biar hasil maksimal, pake foto orientasi <span className="font-bold text-gray-500">Landscape (16:9)</span>.</p>
          <p className="text-xs mt-1">Format yang didukung: JPG, PNG, atau WebP.</p>
        </div>
      </div>
      
    </div>
  );
};