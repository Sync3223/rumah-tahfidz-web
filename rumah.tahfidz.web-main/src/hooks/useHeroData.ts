import { useState, useEffect } from 'react';
import { heroService } from '../services/heroService';
import type { HeroData } from '../types/hero';

const DEFAULT_DATA: HeroData = {
  title: "Bukti Kita Peduli",
  subtitle: "Pada masa depan kita dan mereka.",
  images: [] // Will be populated with defaults if empty
};

export const useHeroData = () => {
  const [data, setData] = useState<HeroData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load default images for fallback
    const imageFiles = import.meta.glob('../assets/hero-images/*.{png,jpg,jpeg,webp,svg}', { eager: true });
    const defaultImages = Object.values(imageFiles).map((file: any) => file.default || file);

    const unsubscribe = heroService.subscribeToHeroConfig((config) => {
      if (config) {
        setData(config);
      } else {
        // If no config in Firestore, use default data with local assets
        setData({ ...DEFAULT_DATA, images: defaultImages });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateHeroData = async (newData: HeroData) => {
    try {
      await heroService.updateHeroConfig(newData);
    } catch (err) {
      console.error("Failed to update hero data:", err);
      setError("Gagal menyimpan perubahan.");
      throw err;
    }
  };

  const uploadHeroImage = async (file: File): Promise<string> => {
    return await heroService.uploadHeroImage(file);
  };

  return { ...data, loading, error, updateHeroData, uploadHeroImage };
};