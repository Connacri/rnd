import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBjJrRN3nkLa55XBMctnjHJICyAc6-AJOk',
  authDomain: 'rnd-aet.firebaseapp.com',
  projectId: 'rnd-aet',
  storageBucket: 'rnd-aet.firebasestorage.app',
  messagingSenderId: '557594232565',
  appId: '1:557594232565:web:cf11e2a0948b2e470a27bc',
  measurementId: 'G-K1RJ046Y4X',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
