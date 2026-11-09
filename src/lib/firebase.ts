import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyBjJrRN3nkLa55XBMctnjHJICyAc6-AJOk',
  authDomain: 'rnd-aet.firebaseapp.com',
  projectId: 'rnd-aet',
  storageBucket: 'rnd-aet.firebasestorage.app',
  messagingSenderId: '557594232565',
  appId: '1:557594232565:web:cf11e2a0948b2e470a27bc',
  measurementId: 'G-K1RJ046Y4X',
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseFunctions = getFunctions(firebaseApp, 'europe-west1');

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
