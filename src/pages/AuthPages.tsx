import React, { useState } from 'react';
import { LogIn, UserPlus, KeyRound, Sparkles, AlertCircle, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { GoogleSignInModal } from '../components/GoogleSignInModal';

interface AuthPageProps {
  view: 'login' | 'register' | 'forgot-password';
  onNavigate: (page: string) => void;
}

export const AuthPages: React.FC<AuthPageProps> = ({ view, onNavigate }) => {
  const { t, isRtl } = useLanguage();
  const { login, register, loginAsAdmin, sendPasswordReset } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (view === 'login') {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || t('loginError'));
        } else {
          onNavigate('home');
        }
      } else if (view === 'register') {
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || t('registerError'));
        } else {
          onNavigate('home');
        }
      } else if (view === 'forgot-password') {
        const res = await sendPasswordReset(email);
        if (res.success) {
          setSuccessMsg(res.message);
        } else {
          setError(res.message);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminQuickLogin = () => {
    loginAsAdmin();
    onNavigate('admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 sm:py-8 pb-24 space-y-6">
      {/* Back to Home Button */}
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition min-h-[36px]"
      >
        <ArrowLeft className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        <span>Retour à l'accueil</span>
      </button>

      {/* Header with official RND Logo */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl bg-white dark:bg-zinc-800 p-2 shadow-md border border-amber-200/80 dark:border-zinc-700 mx-auto flex items-center justify-center mb-3">
          <img
            src="/assets/icons/icon.png"
            alt="RND Algérie"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          {view === 'login' && t('login')}
          {view === 'register' && t('register')}
          {view === 'forgot-password' && t('forgotPasswordTitle')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
          {view === 'forgot-password'
            ? t('forgotPasswordHint')
            : 'Plateforme citoyenne officielle • RND Aïn El Turck 2026'}
        </p>
      </div>

      {/* Error / Success Notifications */}
      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
        {view === 'register' && (
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {t('nom')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mohamed Krim"
              className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
            {t('emailField')} <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre.email@exemple.com"
            className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]"
          />
        </div>

        {view !== 'forgot-password' && (
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {t('password')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]"
            />
          </div>
        )}

        {view === 'login' && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onNavigate('forgot-password')}
              className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline min-h-[30px]"
            >
              {t('forgotPassword')}
            </button>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-50 min-h-[48px]"
        >
          {loading ? (
            <span>Traitement en cours...</span>
          ) : view === 'login' ? (
            t('login')
          ) : view === 'register' ? (
            t('register')
          ) : (
            t('sendResetEmail')
          )}
        </button>

        {/* Google sign in button */}
        {view !== 'forgot-password' && (
          <div className="pt-2">
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-zinc-200 dark:border-zinc-800 w-full" />
              <span className="bg-white dark:bg-zinc-900 px-3 text-[10px] text-zinc-400 uppercase font-bold absolute">
                ou
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3 px-4 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center gap-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-700 active:scale-95 transition shadow-xs min-h-[44px]"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
              <span>{t('continueWithGoogle')}</span>
            </button>
          </div>
        )}
      </form>

      {/* Quick Admin Access Card */}
      <div className="p-4 rounded-3xl bg-amber-50/70 dark:bg-zinc-900/80 border border-amber-200/80 dark:border-zinc-800 text-center space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Accès Réservé — Bureau Communal RND</span>
        </div>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Pour les administrateurs et membres du bureau électoral d'Aïn El Turck.
        </p>
        <button
          type="button"
          onClick={handleAdminQuickLogin}
          className="px-4 py-2 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 active:scale-95 transition inline-flex items-center gap-1.5 min-h-[38px]"
        >
          <span>Connexion Secrétaire / Admin RND</span>
        </button>
      </div>

      {/* Switch links */}
      <div className="text-center text-xs">
        {view === 'login' ? (
          <button
            onClick={() => onNavigate('register')}
            className="font-semibold text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 min-h-[36px]"
          >
            {t('noAccount')}
          </button>
        ) : (
          <button
            onClick={() => onNavigate('login')}
            className="font-semibold text-zinc-600 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 min-h-[36px]"
          >
            {t('haveAccount')}
          </button>
        )}
      </div>

      {/* Google Modal Dialog */}
      <GoogleSignInModal
        isOpen={showGoogleModal}
        onClose={() => setShowGoogleModal(false)}
        onSuccess={() => onNavigate('home')}
      />
    </div>
  );
};
