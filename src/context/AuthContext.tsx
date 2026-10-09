import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean }>;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem('rnd_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rnd_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rnd_user');
    }
  }, [user]);

  const login = async (email: string, _pass: string) => {
    // Quick validation
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Email invalide' };
    }
    const fakeUser: AppUser = {
      id: 'usr_' + Date.now().toString(36),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatarUrl: '/assets/icons/icon.png',
    };
    setUser(fakeUser);
    return { success: true };
  };

  const register = async (name: string, email: string, _pass: string) => {
    if (!name.trim()) return { success: false, error: 'Nom requis' };
    if (!email || !email.includes('@')) return { success: false, error: 'Email invalide' };
    
    const newUser: AppUser = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim(),
      avatarUrl: '/assets/icons/icon.png',
    };
    setUser(newUser);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    const googleUser: AppUser = {
      id: 'usr_goog_' + Math.random().toString(36).substring(2, 9),
      name: 'Citoyen Ain El Turck',
      email: 'citoyen.aet@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    };
    setUser(googleUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const sendPasswordReset = async (_email: string) => {
    await new Promise((r) => setTimeout(r, 600));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        logout,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
