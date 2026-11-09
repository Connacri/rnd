import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { firebaseAuth, googleProvider } from '../lib/firebase';
import { supabase } from '../lib/supabaseClient';
import { AppUser } from '../types';

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

const toSupabaseAppUser = (authUser: SupabaseUser): AppUser => ({
  id: authUser.id,
  name: String(authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Utilisateur'),
  email: authUser.email || '',
  avatarUrl: String(authUser.user_metadata?.avatar_url || 'assets/icons/icon.png'),
  role: authUser.app_metadata?.role === 'admin' ? 'admin' : 'user',
});

const toFirebaseAppUser = async (authUser: FirebaseUser): Promise<AppUser> => {
  const token = await authUser.getIdTokenResult();
  return {
    id: authUser.uid,
    name: authUser.displayName || authUser.email?.split('@')[0] || 'Utilisateur',
    email: authUser.email || '',
    avatarUrl: authUser.photoURL || 'assets/icons/icon.png',
    role: token.claims.role === 'admin' ? 'admin' : 'user',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    let active = true;
    const unsubscribeFirebase = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      if (!active) return;
      if (firebaseUser) {
        try { setUser(await toFirebaseAppUser(firebaseUser)); }
        catch { setUser(null); }
        return;
      }
      const { data, error } = await supabase.auth.getUser();
      if (active) setUser(!error && data.user ? toSupabaseAppUser(data.user) : null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active && !firebaseAuth.currentUser) setUser(session?.user ? toSupabaseAppUser(session.user) : null);
    });
    return () => { active = false; unsubscribeFirebase(); subscription.unsubscribe(); };
  }, []);

  const login = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: pass });
    if (error || !data.user) return { success: false, error: error?.message || 'Identifiants invalides.' };
    setUser(toSupabaseAppUser(data.user));
    return { success: true };
  };

  const loginAdmin = async (email: string, pass: string) => {
    const result = await login(email, pass);
    if (!result.success) return result;
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user || data.user.app_metadata?.role !== 'admin') {
      await supabase.auth.signOut();
      setUser(null);
      return { success: false, error: 'Ce compte ne possède pas les droits administrateur.' };
    }
    setUser(toSupabaseAppUser(data.user));
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string) => {
    if (pass.length < 8) return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' };
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(), password: pass,
      options: { data: { full_name: name.trim() } },
    });
    if (error) return { success: false, error: error.message };
    if (data.user && data.session) setUser(toSupabaseAppUser(data.user));
    return { success: true };
  };

  const loginWithGoogle = async (_customEmail?: string, _customName?: string, _asAdmin?: boolean) => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const firebaseUser = result.user;
      if (!firebaseUser.email || !firebaseUser.emailVerified) {
        await signOut(firebaseAuth);
        return { success: false, error: 'Le compte Google doit disposer d’une adresse e-mail vérifiée.' };
      }
      setUser(await toFirebaseAppUser(firebaseUser));
      return { success: true };
    } catch (error) {
      const code = error instanceof Error && 'code' in error ? String((error as { code?: string }).code) : '';
      const message = error instanceof Error ? error.message : 'Connexion Google impossible.';
      if (code === 'auth/popup-blocked' || code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'La fenêtre Google a été bloquée ou fermée. Autorisez les fenêtres pop-up puis réessayez.' };
      }
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    await Promise.all([signOut(firebaseAuth), supabase.auth.signOut()]);
    setUser(null);
  };

  const sendPasswordReset = async (email: string) => {
    if (!email || !email.includes('@')) return { success: false, message: 'Veuillez saisir une adresse email valide.' };
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: window.location.origin + window.location.pathname + '#/forgot-password',
    });
    return error
      ? { success: false, message: error.message }
      : { success: true, message: 'Si ce compte existe, un lien de réinitialisation sera envoyé par email.' };
  };

  return <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin: user?.role === 'admin', login, loginAdmin, register, loginWithGoogle, logout, sendPasswordReset }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
