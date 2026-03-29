import React, { useState, useEffect } from 'react';
import { X, UploadCloud, Loader2, LayoutGrid, AlertCircle } from 'lucide-react';
import { type Program, createProgram, updateProgram } from '../../../services/programService';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
  onSuccess: () => void;
  totalPrograms: number;
}

const ICON_OPTIONS = ['Heart', 'Soup', 'BookOpen', 'UserCheck', 'Monitor', 'TrendingUp', 'Mic', 'Handshake', 'Star', 'Users', 'Globe'];
const COLOR_OPTIONS = [
  { label: 'Pink', value: 'text-pink-500' },
  { label: 'Orange', value: 'text-orange-500' },
  { label: 'Emerald', value: 'text-emerald-500' },
  { label: 'Blue', value: 'text-blue-500' },
  { label: 'Indigo', value: 'text-indigo-500' },
  { label: 'Purple', value: 'text-purple-500' },
  { label: 'Red', value: 'text-red-500' },
  { label: 'Teal', value: 'text-teal-500' },
];

const ProgramModal: React.FC<ProgramModalProps> = ({ isOpen, onClose, program, onSuccess, totalPrograms }) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [desc, setDesc] = useState('');
  const [iconName, setIconName] = useState('Heart');
  const [color, setColor] = useState('text-pink-500');
  const [order, setOrder] = useState(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (program) {
      setTitle(program.title);
      setTag(program.tag);
      setDesc(program.desc);
      setIconName(program.iconName);
      setColor(program.color);
      setOrder(program.order || 1);
      setImageFile(null);
    } else {
      setTitle('');
      setTag('');
      setDesc('');
      setIconName('Heart');
      setColor('text-pink-500');
      setOrder(totalPrograms + 1);
      setImageFile(null);
    }
    setError('');
  }, [program, isOpen, totalPrograms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (program) {
        await updateProgram(program.id, { title, tag, desc, iconName, color, order }, imageFile, program.imageUrl);
      } else {
        if (!imageFile) throw new Error("Gambar visual wajib diunggah untuk program baru.");
        await createProgram({ title, tag, desc, iconName, color, order }, imageFile);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Modern input base style
  const inputStyle = "w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all duration-300 text-gray-800 font-medium";
  const labelStyle = "block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-2xl my-8 relative flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center p-6 md:px-8 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
              <LayoutGrid size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              {program ? 'Perbarui Data Program' : 'Tambah Program Baru'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* --- FORM CONTENT --- */}
        <div className="overflow-y-auto p-6 md:p-8 shrink-0">
          <form id="program-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Alert */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                <AlertCircle size={20} className="shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Nama Program</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  placeholder="Cth: Tahfidz Reguler"
                  className={inputStyle} 
                />
              </div>
              <div>
                <label className={labelStyle}>Label Kategori (Tag)</label>
                <input 
                  type="text" 
                  value={tag} 
                  onChange={(e) => setTag(e.target.value)} 
                  required 
                  placeholder="Cth: Unggulan"
                  className={inputStyle} 
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Deskripsi Singkat</label>
              <textarea 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                required 
                rows={3} 
                placeholder="Jelaskan secara singkat mengenai program ini..."
                className={`${inputStyle} resize-none`} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}>Ikon Visual</label>
                <select value={iconName} onChange={(e) => setIconName(e.target.value)} className={inputStyle}>
                  {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Warna Ikon</label>
                <select value={color} onChange={(e) => setColor(e.target.value)} className={inputStyle}>
                  {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelStyle}>Nomor Urut (Otomatis)</label>
                <input 
                  type="number" 
                  value={order} 
                  readOnly 
                  className={`${inputStyle} bg-gray-100 text-gray-500 cursor-not-allowed`} 
                  title="Nomor urut diisi otomatis oleh sistem"
                />
              </div>
            </div>

            <div>
              <label className={labelStyle}>Gambar Representasi</label>
              {program && !imageFile && (
                <div className="mb-4 flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <img src={program.imageUrl} alt="Current" className="h-16 w-24 object-cover rounded-xl shadow-sm" />
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Gambar saat ini.<br/>Unggah gambar baru jika ingin mengganti.
                  </p>
                </div>
              )}
              
              <label className={`
                flex items-center gap-4 px-5 py-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group
                ${imageFile ? 'border-teal-400 bg-teal-50/50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-teal-300'}
              `}>
                <div className={`p-3 rounded-full transition-colors ${imageFile ? 'bg-teal-100 text-teal-600' : 'bg-white text-gray-400 group-hover:text-teal-500'}`}>
                  <UploadCloud size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-gray-700 truncate">
                    {imageFile ? imageFile.name : 'Pilih file gambar...'}
                  </span>
                  <span className="block text-xs text-gray-400 mt-0.5">Format JPG, PNG atau WebP</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} 
                  className="hidden" 
                  required={!program} 
                />
              </label>
            </div>
            
          </form>
        </div>

        {/* --- FOOTER / ACTIONS --- */}
        <div className="p-6 md:px-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-4xl shrink-0">
          <button 
            type="button" 
            onClick={onClose} 
            disabled={loading}
            className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit" 
            form="program-form"
            disabled={loading} 
            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-700 shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Menyimpan...
              </>
            ) : (
              'Simpan Data'
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProgramModal;