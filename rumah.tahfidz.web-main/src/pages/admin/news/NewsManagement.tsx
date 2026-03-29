import { useState } from 'react';
import { PlusCircle, Search, Trash2, Edit } from 'lucide-react';
import { useNewsData, type NewsItem } from '../../../hooks/useNewsData';
import { NewsModal } from '../news/NewsModal';
import { EditNewsModal } from './EditNewsModal';

const NewsManagement = () => {
  const { newsList, addNews, deleteNews, updateNews, loading } = useNewsData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Kegiatan',
    status: 'Published' as const,
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addNews(formData);
      setIsModalOpen(false);
      setFormData({
        title: '',
        category: 'Kegiatan',
        status: 'Published' as const,
        excerpt: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
      });
      alert("Berhasil menambahkan berita!");
    } catch (e) {
      alert("Gagal menambahkan berita.");
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      await updateNews(id, data);
      alert("Berhasil memperbarui berita!");
    } catch (e) {
      alert("Gagal memperbarui berita.");
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await deleteNews(id);
      } catch (e) {
        alert("Gagal menghapus berita.");
      }
    }
  }

  const openEditModal = (news: NewsItem) => {
    setSelectedNews(news);
    setIsEditModalOpen(true);
  };

  const filteredNews = newsList.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="p-10 text-center">Memuat berita...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kelola Berita</h1>
          <p className="text-gray-500 text-sm">Total {newsList.length} artikel tersedia.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <PlusCircle size={18} className="mr-2" /> Tambah Berita
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari berita..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b border-gray-100 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredNews.map((news) => (
              <tr key={news.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800 leading-tight">{news.title}</td>
                <td className="px-6 py-4 text-gray-500">{news.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${news.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {news.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openEditModal(news)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                  >
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(news.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gunakan Modal yang sudah dipisah */}
      <NewsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
        formData={formData}
        setFormData={setFormData}
      />

      <EditNewsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdate}
        newsData={selectedNews}
      />
    </div>
  );
};

export default NewsManagement;