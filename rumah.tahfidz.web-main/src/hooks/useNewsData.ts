import { useState, useEffect } from 'react';
import { newsService } from '../services/newsService';
import type { NewsItem } from '../types/news';

export type { NewsItem };

export const useNewsData = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = newsService.subscribeToNews((data) => {
      setNewsList(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addNews = async (news: Omit<NewsItem, 'id' | 'views'>) => {
    try {
      await newsService.addNews(news);
    } catch (err) {
      console.error("Failed to add news:", err);
      setError("Gagal menambahkan berita.");
      throw err;
    }
  };

  const deleteNews = async (id: string) => {
    try {
      await newsService.deleteNews(id);
    } catch (err) {
      console.error("Failed to delete news:", err);
      setError("Gagal menghapus berita.");
      throw err;
    }
  };

  const updateNews = async (id: string, updatedData: Partial<NewsItem>) => {
    try {
      await newsService.updateNews(id, updatedData);
    } catch (err) {
      console.error("Failed to update news:", err);
      setError("Gagal memperbarui berita.");
      throw err;
    }
  };

  return { newsList, loading, error, addNews, deleteNews, updateNews };
};