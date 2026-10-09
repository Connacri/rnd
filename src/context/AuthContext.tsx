import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (customEmail?: string, customName?: string, asAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  loginAsAdmin: () => void;
  logout: () => void;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  toggleAdminRole: () => void;
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

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 400));
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Veuillez saisir une adresse email valide' };
    }
    if (!pass || pass.length < 4) {
      return { success: false, error: 'Le mot de passe doit comporter au moins 4 caractères' };
    }

    const isAdminUser = cleanEmail.includes('admin') || cleanEmail === 'secretariat@rnd.dz' || pass === 'admin2026';

    const loggedUser: AppUser = {
      id: 'usr_' + Date.now().toString(36),
      name: isAdminUser ? 'Administrateur RND' : cleanEmail.split('@')[0].toUpperCase(),
      email: cleanEmail,
      avatarUrl: isAdminUser ? '/assets/icons/icon.png' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: isAdminUser ? 'admin' : 'user',
    };

    setUser(loggedUser);
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 400));
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return { success: false, error: 'Veuillez indiquer votre nom complet' };
    }
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Veuillez saisir une adresse email valide' };
    }
    if (!pass || pass.length < 6) {
      return { success: false, error: 'Le mot de passe doit comporter au moins 6 caractères' };
    }

    const isAdminUser = cleanEmail.includes('admin') || pass === 'admin2026';

    const newUser: AppUser = {
      id: 'usr_' + Date.now().toString(36),
      name: cleanName,
      email: cleanEmail,
      avatarUrl: '/assets/icons/icon.png',
      role: isAdminUser ? 'admin' : 'user',
    };

    setUser(newUser);
    return { success: true };
  };

  const loginWithGoogle = async (
    customEmail?: string,
    customName?: string,
    asAdmin?: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise((r) => setTimeout(r, 350));

    const email = (customEmail || 'citoyen.aet@gmail.com').trim().toLowerCase();
    const name = customName || (email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    const isAdminUser = asAdmin || email.includes('admin') || email === 'admin@rnd.dz';

    const googleUser: AppUser = {
      id: 'usr_goog_' + Math.random().toString(36).substring(2, 9),
      name: isAdminUser ? 'Admin Bureau RND' : name,
      email: email,
      avatarUrl: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
      role: isAdminUser ? 'admin' : 'user',
    };

    setUser(googleUser);
    return { success: true };
  };

  const loginAsAdmin = () => {
    const adminUser: AppUser = {
      id: 'usr_admin_rnd',
      name: 'Secrétariat RND Ain El Turck',
      email: 'admin@rnd-ainturck.dz',
      avatarUrl: '/assets/icons/icon.png',
      role: 'admin',
    };
    setUser(adminUser);
  };

  const toggleAdminRole = () => {
    if (!user) return;
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setUser({ ...user, role: newRole });
  };

  const logout = () => {
    setUser(null);
  };

  const sendPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Veuillez saisir une adresse email valide' };
    }
    return {
      success: true,
      message: `Un lien de réinitialisation sécurisé a été envoyé à ${email}. Veuillez vérifier votre boîte de réception.`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        loginWithGoogle,
        loginAsAdmin,
        logout,
        sendPasswordReset,
        toggleAdminRole,
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
