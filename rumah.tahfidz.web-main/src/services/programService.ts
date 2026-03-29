import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from '../config/firebase'; // Sesuaikan path jika letak config firebase Anda berbeda

// === TYPES ===
// Anda bisa memindahkan interface ini ke file src/types/program.ts nanti
export interface Program {
  id: string;
  title: string;
  tag: string;
  desc: string;
  imageUrl: string;
  iconName: string;
  color: string;
  order: number;
}

// Tipe data untuk input (tanpa ID karena ID di-generate Firebase, dan imageUrl di-generate setelah upload)
export type ProgramInput = Omit<Program, 'id' | 'imageUrl'>;

const COLLECTION_NAME = 'programs';

// === 1. GET PROGRAMS (READ) ===
export const getPrograms = async (): Promise<Program[]> => {
  try {
    const programsRef = collection(db, COLLECTION_NAME);
    // Mengambil data dan mengurutkannya berdasarkan field 'order'
    const q = query(programsRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Program[];
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};

// === 2. CREATE PROGRAM (CREATE) ===
export const createProgram = async (data: ProgramInput, imageFile: File): Promise<void> => {
  try {
    // 1. Upload gambar ke Firebase Storage
    // Membuat nama file yang unik menggunakan timestamp
    const storageRef = ref(storage, `programs/${Date.now()}_${imageFile.name}`);
    const uploadResult = await uploadBytes(storageRef, imageFile);
    
    // 2. Dapatkan URL gambar yang sudah diupload
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // 3. Simpan data program + URL gambar ke Firestore
    const programsRef = collection(db, COLLECTION_NAME);
    await addDoc(programsRef, {
      ...data,
      imageUrl,
      createdAt: serverTimestamp() // Menyimpan waktu pembuatan
    });
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
};

// === 3. UPDATE PROGRAM (UPDATE) ===
export const updateProgram = async (
  id: string, 
  data: Partial<Program>, 
  newImageFile?: File | null,
  oldImageUrl?: string
): Promise<void> => {
  try {
    const programRef = doc(db, COLLECTION_NAME, id);
    let imageUrl = data.imageUrl;

    // Jika admin mengupload gambar baru
    if (newImageFile) {
      // 1. Upload gambar baru
      const storageRef = ref(storage, `programs/${Date.now()}_${newImageFile.name}`);
      const uploadResult = await uploadBytes(storageRef, newImageFile);
      imageUrl = await getDownloadURL(uploadResult.ref);

      // 2. Opsional: Hapus gambar lama dari storage untuk menghemat ruang
      if (oldImageUrl) {
        try {
          const oldImageRef = ref(storage, oldImageUrl);
          await deleteObject(oldImageRef);
        } catch (deleteError) {
          console.error("Gagal menghapus gambar lama (bisa diabaikan):", deleteError);
        }
      }
    }

    // Update data di Firestore
    await updateDoc(programRef, {
      ...data,
      ...(imageUrl && { imageUrl }), // Update imageUrl hanya jika ada yang baru/dikirim
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating program:", error);
    throw error;
  }
};

// === 4. DELETE PROGRAM (DELETE) ===
export const deleteProgram = async (id: string, imageUrl: string): Promise<void> => {
  try {
    // 1. Hapus dokumen data dari Firestore
    const programRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(programRef);

    // 2. Hapus file gambar dari Firebase Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl); // Firebase Storage v9 bisa membuat ref langsung dari URL
      await deleteObject(imageRef);
    }
  } catch (error) {
    console.error("Error deleting program:", error);
    throw error;
  }
};