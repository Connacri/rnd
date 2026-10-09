import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface GoogleSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const GoogleSignInModal: React.FC<GoogleSignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginWithGoogle } = useAuth();
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickAccounts = [
    {
      name: 'Ramzy Seattle',
      email: 'ramzy.seattle@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      badge: 'Compte Google vérifié',
      isAdmin: false,
    },
    {
      name: 'Citoyen Ain El Turck',
      email: 'citoyen.aet@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      badge: 'Électeur Ain El Turck',
      isAdmin: false,
    },
    {
      name: 'Bureau RND Ain El Turck',
      email: 'admin@rnd.dz',
      avatar: 'assets/icons/icon.png',
      badge: 'Administrateur RND 🛡️',
      isAdmin: true,
    },
  ];

  const handleSelectAccount = async (email: string, name: string, isAdmin: boolean) => {
    setLoading(true);
    await loginWithGoogle(email, name, isAdmin);
    setLoading(false);
    onSuccess();
    onClose();
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) return;
    setLoading(true);
    await loginWithGoogle(customEmail, customName || undefined, customEmail.includes('admin'));
    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm sm:max-w-md rounded-[32px] sm:rounded-[36px] bg-[#FAF7F2] dark:bg-[#1A1816] p-5 sm:p-7 border border-amber-200/80 dark:border-zinc-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Top Header with Google Brand */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-200/60 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">
              Connexion avec Google
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
            Choisir un compte
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            pour continuer vers <span className="font-bold text-zinc-800 dark:text-zinc-200">RND Aïn El Turck</span>
          </p>
        </div>

        {/* Quick Accounts List */}
        <div className="space-y-2 pt-1">
          {quickAccounts.map((acc) => (
            <button
              key={acc.email}
              disabled={loading}
              onClick={() => handleSelectAccount(acc.email, acc.name, acc.isAdmin)}
              className="w-full p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between text-left hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group active:scale-[0.98] min-h-[56px]"
            >
              <div className="flex items-center gap-3">
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-200/60 dark:border-zinc-700 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
                  }}
                />
                <div>
                  <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {acc.name}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-[190px] sm:max-w-[220px]">
                    {acc.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    acc.isAdmin
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  {acc.badge}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Divider / Toggle Custom Account */}
        {!isCustom ? (
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className="w-full py-2.5 text-center text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center justify-center gap-1"
          >
            <span>Utiliser un autre compte Google</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <form onSubmit={handleCustomSubmit} className="pt-2 space-y-3 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Saisir votre adresse Google Gmail
            </h4>
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Nom complet (optionnel)</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Ex: Mohamed Krim"
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-zinc-500 mb-1">Email Google</label>
              <input
                type="email"
                required
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="votre.nom@gmail.com"
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 transition min-h-[40px]"
              >
                {loading ? 'Connexion...' : 'Valider'}
              </button>
              <button
                type="button"
                onClick={() => setIsCustom(false)}
                className="px-4 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        <div className="pt-1 text-center">
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
            Authentification sécurisée Google OAuth. Vos données restent strictement confidentielles et protégées.
          </p>
        </div>
      </div>
    </div>
  );
};
