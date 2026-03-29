import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { NewsItem } from '../types/news';

const NEWS_COLLECTION = 'news';

export const newsService = {
    subscribeToNews: (callback: (data: NewsItem[]) => void) => {
        const q = query(collection(db, NEWS_COLLECTION), orderBy('date', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const newsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as NewsItem[];
            callback(newsList);
        });
    },

    addNews: async (news: Omit<NewsItem, 'id' | 'views'>) => {
        await addDoc(collection(db, NEWS_COLLECTION), {
            ...news,
            views: 0,
            createdAt: Timestamp.now().toMillis()
        });
    },

    updateNews: async (id: string, data: Partial<NewsItem>) => {
        const docRef = doc(db, NEWS_COLLECTION, id);
        await updateDoc(docRef, data);
    },

    deleteNews: async (id: string) => {
        await deleteDoc(doc(db, NEWS_COLLECTION, id));
    }
};
