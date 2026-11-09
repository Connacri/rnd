import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../lib/firebase';
import type { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customEmail?: string, customName?: string, asAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const toAppUser = async (authUser: FirebaseUser): Promise<AppUser> => {
  const token = await authUser.getIdTokenResult();
  return {
    id: authUser.uid,
    name: authUser.displayName || authUser.email?.split('@')[0] || 'Utilisateur',
    email: authUser.email || '',
    avatarUrl: authUser.photoURL || 'assets/icons/icon.png',
    role: token.claims.admin === true || token.claims.role === 'admin' ? 'admin' : 'user',
  };
};

const authError = (error: unknown): string => {
  const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: string }).code) : '';
  const messages: Record<string, string> = {
    'auth/invalid-credential': 'Adresse e-mail ou mot de passe incorrect.',
    'auth/user-not-found': 'Aucun compte ne correspond à cette adresse.',
    'auth/wrong-password': 'Adresse e-mail ou mot de passe incorrect.',
    'auth/email-already-in-use': 'Cette adresse e-mail est déjà utilisée.',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 8 caractères.',
    'auth/invalid-email': 'Adresse e-mail invalide.',
    'auth/popup-blocked': 'La fenêtre Google a été bloquée. Autorisez les fenêtres pop-up puis réessayez.',
    'auth/popup-closed-by-user': 'La fenêtre Google a été fermée avant la fin de la connexion.',
    'auth/unauthorized-domain': 'Ce domaine doit être autorisé dans Firebase Authentication.',
    'auth/operation-not-allowed': 'Cette méthode de connexion n’est pas activée dans Firebase Authentication.',
    'auth/network-request-failed': 'Connexion réseau impossible. Vérifiez votre connexion.',
    'auth/too-many-requests': 'Trop de tentatives. Réessayez plus tard.',
  };
  return messages[code] || (error instanceof Error ? error.message : 'Une erreur est survenue.');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!active) return;
      if (!firebaseUser) { setUser(null); return; }
      try {
        const appUser = await toAppUser(firebaseUser);
        if (active) setUser(appUser);
      } catch (error) {
        console.error('Firebase session could not be loaded:', error);
        if (active) setUser(null);
      }
    }, (error) => {
      console.error('Firebase authentication listener failed:', error);
      if (active) setUser(null);
    });
    return () => { active = false; unsubscribe(); };
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email.trim().toLowerCase(), pass);
      setUser(await toAppUser(result.user));
      return { success: true };
    } catch (error) { return { success: false, error: authError(error) }; }
  };

  const loginAdmin = async (email: string, pass: string) => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email.trim().toLowerCase(), pass);
      const appUser = await toAppUser(result.user);
      if (appUser.role !== 'admin') {
        await signOut(firebaseAuth);
        setUser(null);
        return { success: false, error: 'Ce compte ne possède pas les droits administrateur Firebase.' };
      }
      setUser(appUser);
      return { success: true };
    } catch (error) { return { success: false, error: authError(error) }; }
  };

  const register = async (name: string, email: string, pass: string) => {
    if (pass.length < 8) return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' };
    try {
      const result = await createUserWithEmailAndPassword(firebaseAuth, email.trim().toLowerCase(), pass);
      if (name.trim()) await updateProfile(result.user, { displayName: name.trim() });
      await result.user.reload();
      setUser(await toAppUser(firebaseAuth.currentUser || result.user));
      return { success: true };
    } catch (error) { return { success: false, error: authError(error) }; }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      if (!result.user.email || !result.user.emailVerified) {
        await signOut(firebaseAuth);
        return { success: false, error: 'Le compte Google doit disposer d’une adresse e-mail vérifiée.' };
      }
      setUser(await toAppUser(result.user));
      return { success: true };
    } catch (error) { return { success: false, error: authError(error) }; }
  };

  const logout = async () => {
    await signOut(firebaseAuth);
    setUser(null);
  };

  const sendPasswordReset = async (email: string) => {
    if (!email || !email.includes('@')) return { success: false, message: 'Veuillez saisir une adresse e-mail valide.' };
    try {
      await sendPasswordResetEmail(firebaseAuth, email.trim().toLowerCase(), {
        url: window.location.origin + window.location.pathname,
        handleCodeInApp: false,
      });
      return { success: true, message: 'Si ce compte existe, un lien de réinitialisation sera envoyé par e-mail.' };
    } catch (error) { return { success: false, message: authError(error) }; }
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin: user?.role === 'admin', login, loginAdmin, register, loginWithGoogle, logout, sendPasswordReset }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
