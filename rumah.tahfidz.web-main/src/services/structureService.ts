import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { type TeamMember } from '../types/structureData';

const collectionName = 'structure';

export const structureService = {
  // Mengambil semua data pengurus
  getAll: async (): Promise<TeamMember[]> => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TeamMember));
  },

  // Mengambil satu data pengurus berdasarkan ID
  getById: async (id: string): Promise<TeamMember | null> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TeamMember;
    } else {
      return null;
    }
  },

  // Menambah pengurus baru
  add: async (data: Omit<TeamMember, 'id'>) => {
    return await addDoc(collection(db, collectionName), data);
  },

  // Mengupdate pengurus
  update: async (id: string, data: Partial<TeamMember>) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
  },

  // Menghapus pengurus
  delete: async (id: string) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
  }
};