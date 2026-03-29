import { useState, useEffect } from 'react';
import { getPrograms, type Program } from '../services/programService';

export const useProgramData = () => {
  // State untuk menyimpan daftar program
  const [programs, setPrograms] = useState<Program[]>([]);
  
  // State untuk indikator loading
  const [loading, setLoading] = useState<boolean>(true);
  
  // State untuk menyimpan pesan error jika terjadi kegagalan
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data dari Firestore
  const fetchPrograms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (err: any) {
      console.error("Error di useProgramData:", err);
      setError(err.message || 'Terjadi kesalahan saat mengambil data program.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return { 
    programs, 
    loading, 
    error, 
    refetch: fetchPrograms 
  };
};