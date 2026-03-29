import { useState, useEffect } from 'react';
import { Save, Sparkles, LayoutTemplate } from 'lucide-react';
import { useHeroData } from '../../../hooks/useHeroData';
import { HeroTextForm } from './HeroTextForm';
import { HeroImageManager } from './HeroImageManager';

const HeroSettings = () => {
  const { title, subtitle, images: initialImages, updateHeroData, uploadHeroImage, loading } = useHeroData();
  const [tempTitle, setTempTitle] = useState("");
  const [tempSubtitle, setTempSubtitle] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (title) setTempTitle(title);
      if (subtitle) setTempSubtitle(subtitle);
      if (initialImages) setImages(initialImages);
    }
  }, [title, subtitle, initialImages, loading]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateHeroData({ title: tempTitle, subtitle: tempSubtitle, images });
      alert("Yayy! Perubahan berhasil disimpan");
    } catch (e) {
      alert("Waduh, gagal menyimpan data nih. Coba lagi ya!");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-64 items-center justify-center text-teal-600 font-medium animate-pulse">
      Memuat data...
    </div>
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* --- HEADER BENTO BOX --- */}
      <div className="relative bg-white p-8 rounded-4xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Dekorasi Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-teal-50 text-teal-600 rounded-2xl">
              <LayoutTemplate size={24} />
            </div>
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Vibe Utama <span className="text-teal-500">(Hero)</span>
            </h1>
          </div>
          <p className="text-gray-500 font-medium text-sm md:text-base ml-14">
            Atur teks sapaan dan foto-foto kece buat impresi pertama di halaman depan website.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`group relative z-10 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform active:scale-95 ${
            isSaving 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-1'
          }`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
              Lagi nyimpen...
            </span>
          ) : (
            <>
              <Save size={20} className="group-hover:rotate-12 transition-transform duration-300" /> 
              Simpan Teks
              <Sparkles size={16} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            </>
          )}
        </button>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bagian Kiri: Form Teks  */}
        <div className="lg:col-span-5 animate-in slide-in-from-left-4 duration-500">
          <div className="bg-white p-1 rounded-4xl not-even:border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <HeroTextForm
              title={tempTitle}
              subtitle={tempSubtitle}
              onTitleChange={setTempTitle}
              onSubtitleChange={setTempSubtitle}
            />
          </div>
        </div>

        {/* Bagian Kanan: Gallery Manager */}
        <div className="lg:col-span-7 animate-in slide-in-from-right-4 duration-500">
          <div className="bg-white p-1 rounded-4xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <HeroImageManager
              images={images}
              onRemove={async (idx) => {
                const newImages = images.filter((_, i) => i !== idx);
                setImages(newImages);
                // Auto-save to Firestore
                try {
                  await updateHeroData({ title: tempTitle, subtitle: tempSubtitle, images: newImages });
                } catch (e) {
                  console.error("Auto-save failed on remove", e);
                }
              }}
              onUpload={async (files) => {
                const newImageUrls: string[] = [];
                for (let i = 0; i < files.length; i++) {
                  const url = await uploadHeroImage(files[i]);
                  newImageUrls.push(url);
                }
                const updatedImages = [...images, ...newImageUrls];
                setImages(updatedImages);

                // Auto-save to Firestore
                try {
                  await updateHeroData({ title: tempTitle, subtitle: tempSubtitle, images: updatedImages });
                } catch (e) {
                  console.error("Auto-save failed on upload", e);
                }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSettings;