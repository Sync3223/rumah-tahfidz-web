import { Type, AlertCircle } from 'lucide-react';

interface HeroTextFormProps {
  title: string;
  subtitle: string;
  onTitleChange: (val: string) => void;
  onSubtitleChange: (val: string) => void;
}

export const HeroTextForm = ({ title, subtitle, onTitleChange, onSubtitleChange }: HeroTextFormProps) => (
  <div className="flex flex-col h-full p-6 md:p-8">
    
    {/* --- HEADER --- */}
    <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
      <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
        <Type size={24} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800 tracking-tight">Copywriting Teks</h3>
        <p className="text-sm text-gray-500 font-medium">Bikin pengunjung betah baca!</p>
      </div>
    </div>

    {/* --- FORM FIELDS --- */}
    <div className="space-y-6 flex-1">
      
      {/* Input Judul */}
      <div className="group">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-teal-600 transition-colors">
          Headline Utama
        </label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Contoh: Wujudkan Istana Para Penghafal..."
          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all duration-300 text-gray-800 font-bold"
        />
      </div>

      {/* Input Sub-Judul */}
      <div className="group">
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 group-hover:text-teal-600 transition-colors">
          Sub-Headline / Deskripsi
        </label>
        <textarea 
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          rows={5}
          placeholder="Ceritakan sedikit tentang program atau visi misi..."
          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 outline-none transition-all duration-300 resize-none text-gray-600 leading-relaxed"
        />
      </div>
      
    </div>

    {/* --- TIPS BOX --- */}
    <div className="mt-8 bg-amber-50/80 p-5 rounded-3xl border border-amber-200/60 flex gap-4 items-start shadow-sm">
      <div className="p-2 bg-amber-100 text-amber-600 rounded-full shrink-0 mt-0.5">
        <AlertCircle size={18} />
      </div>
      <div className="text-sm text-amber-800">
        <strong className="block mb-1 font-bold text-amber-900">Tips Copywriting</strong>
        Gunakan kalimat yang *catchy* dan lumayan singkat aja biar tampilannya di layar HP tetap rapi dan nggak kepanjangan!
      </div>
    </div>
    
  </div>
);