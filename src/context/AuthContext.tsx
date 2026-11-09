import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
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
const toAppUser = (authUser: User): AppUser => ({
  id: authUser.id,
  name: String(authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Utilisateur'),
  email: authUser.email || '',
  avatarUrl: String(authUser.user_metadata?.avatar_url || 'assets/icons/icon.png'),
  role: authUser.app_metadata?.role === 'admin' ? 'admin' : 'user',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  useEffect(() => {
    let active = true;
    const loadVerifiedUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (active) setUser(!error && data.user ? toAppUser(data.user) : null);
    };
    void loadVerifiedUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ? toAppUser(session.user) : null);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  const login = async (email: string, pass: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: pass });
    if (error || !data.user) return { success: false, error: error?.message || 'Identifiants invalides.' };
    setUser(toAppUser(data.user));
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
    setUser(toAppUser(data.user));
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string) => {
    if (pass.length < 8) return { success: false, error: 'Le mot de passe doit contenir au moins 8 caractères.' };
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(), password: pass,
      options: { data: { full_name: name.trim() } },
    });
    if (error) return { success: false, error: error.message };
    if (data.user && data.session) setUser(toAppUser(data.user));
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const redirectTo = window.location.origin + window.location.pathname + (window.location.hash || '#/');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo, queryParams: { prompt: 'select_account' } },
    });
    return error ? { success: false, error: error.message } : { success: true };
  };

  const logout = async () => { await supabase.auth.signOut(); setUser(null); };
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
