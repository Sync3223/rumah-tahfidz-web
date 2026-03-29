import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const authService = {
    login: (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    },

    logout: () => {
        return signOut(auth);
    },

    subscribeToAuthChanges: (callback: (user: User | null) => void) => {
        return onAuthStateChanged(auth, callback);
    },

    getCurrentUser: () => {
        return auth.currentUser;
    }
};
