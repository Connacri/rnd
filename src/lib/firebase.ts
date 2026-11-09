import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase project: rnd-aet
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBjJrRN3nkLa55XBMctnjHJICyAc6-AJOk',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'rnd-aet.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'rnd-aet',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '557594232565',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:557594232565:web:cf11e2a0948b2e470a27bc',
  measurementId: 'G-K1RJ046Y4X',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Analytics is optional: it is unavailable in some browsers and privacy modes.
export const analyticsReady = typeof window !== 'undefined'
  ? isSupported().then(supported => supported ? getAnalytics(firebaseApp) : null).catch(() => null)
  : Promise.resolve(null);
