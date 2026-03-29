import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { HeroData } from '../types/hero';

const HERO_DOC_REF = doc(db, 'settings', 'hero');

export const heroService = {
    getHeroConfig: async (): Promise<HeroData | null> => {
        const docSnap = await getDoc(HERO_DOC_REF);
        if (docSnap.exists()) {
            return docSnap.data() as HeroData;
        }
        return null;
    },

    updateHeroConfig: async (data: HeroData): Promise<void> => {
        await setDoc(HERO_DOC_REF, data, { merge: true });
    },

    subscribeToHeroConfig: (callback: (data: HeroData | null) => void) => {
        return onSnapshot(HERO_DOC_REF, (doc) => {
            if (doc.exists()) {
                callback(doc.data() as HeroData);
            } else {
                callback(null);
            }
        });
    },

    uploadHeroImage: async (file: File): Promise<string> => {
        const fileExtension = file.name.split('.').pop();
        const fileName = `hero_${Date.now()}.${fileExtension}`;
        const storageRef = ref(storage, `hero-images/${fileName}`);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    }
};
