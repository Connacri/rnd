import React from 'react';
import { Globe, User, LogOut, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { lang, setLang, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'عربي' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FBF7F0]/85 dark:bg-[#121110]/85 border-b border-amber-200/40 dark:border-zinc-800/60 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Logo & Party Brand */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
        >
          <div className="relative w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0047AB] via-[#00A651] to-[#C8102E] p-[2px] shadow-sm flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[#FAF7F2] dark:bg-[#1A1816] rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-xs tracking-tight text-[#0047AB] dark:text-sky-400">
                RND
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
                {t('candidateName')}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                2026
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-none">
              {t('city')} • Oran
            </p>
          </div>
        </button>

        {/* Right Actions: Lang Switcher & Auth */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Pills */}
          <div className="flex items-center bg-[#EFE9DF] dark:bg-zinc-800/80 p-0.5 rounded-full text-xs font-semibold shadow-inner">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 rounded-full transition-all text-[11px] ${
                  lang === l.code
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-sm font-bold scale-[1.02]'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* User Auth Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5 pl-1">
              <button
                onClick={() => onNavigate('membership')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 text-xs font-semibold hover:bg-amber-200/80 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="max-w-[80px] truncate">{user?.name}</span>
              </button>
              <button
                onClick={logout}
                title={t('logout')}
                className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 hover:text-rose-600 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#18181B] dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold hover:opacity-90 active:scale-95 transition shadow-sm"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('login')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
