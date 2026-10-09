import React, { useState } from 'react';
import { Globe, User, LogOut, Sparkles, ShieldCheck, Menu, X, Users, BookOpen, UserPlus, Calendar, Home } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { lang, setLang, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout, loginAsAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'عربي' },
    { code: 'en', label: 'EN' },
  ];

  const navLinks = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'program', label: t('navProgram'), icon: BookOpen },
    { id: 'candidate', label: t('navCandidate'), icon: User },
    { id: 'council', label: 'Conseil Communal', icon: Users },
    { id: 'membership', label: 'Contact & Adhésion', icon: UserPlus },
    { id: 'events', label: t('navEvents'), icon: Calendar },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF7F2]/95 dark:bg-[#141312]/95 border-b border-amber-200/60 dark:border-zinc-800/70 shadow-xs transition-colors">
      {/* ================= OFFICIAL ALGERIAN RND PARTY TOP RIBBON ================= */}
      <div className="bg-gradient-to-r from-[#00A651] via-[#FFFFFF] to-[#C8102E] p-[1.5px] shadow-xs">
        <div className="bg-[#18181B] text-white py-1 px-3 text-[10px] sm:text-[11px] font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-arabic text-emerald-400">
              🇩🇿 الجمهورية الجزائرية الديمقراطية الشعبية
            </span>
            <span className="hidden sm:inline text-zinc-500">•</span>
            <span className="hidden sm:inline text-amber-300 font-extrabold tracking-wide uppercase">
              Rassemblement National Démocratique
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-300 text-[10px] font-medium hidden md:inline">
              Bureau Communal d'Aïn El Turck — Wilaya d'Oran
            </span>

            {/* Quick Admin Access Button */}
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="px-2 py-0.5 rounded-full bg-amber-400 text-zinc-950 font-black text-[9px] hover:bg-amber-300 transition flex items-center gap-1 shadow-xs"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Panneau Admin Actif</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="text-[9px] text-zinc-400 hover:text-amber-300 transition flex items-center gap-1 underline underline-offset-2"
              >
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>Espace Bureau RND</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN PARTY HEADER BAR ================= */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Official RND Logo & Title */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3.5 text-left group transition-transform active:scale-95 flex-shrink-0"
        >
          {/* Official RND Algerian Emblem */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white dark:bg-zinc-800 p-1 shadow-sm border border-amber-300/80 dark:border-zinc-700 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="assets/icons/icon.png"
              alt="Logo RND Algérie"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs sm:text-sm tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
                RND Algérie
              </span>
              <span className="font-arabic font-extrabold text-[11px] sm:text-xs text-rose-600 dark:text-rose-400">
                التجمع الوطني الديمقراطي
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#18181B] text-amber-300 dark:bg-amber-950 dark:text-amber-300">
                2026
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold leading-none mt-0.5">
              <span className="text-zinc-700 dark:text-zinc-300">Aïn El Turck</span>
              <span>•</span>
              <span>Zenasni Nabil</span>
              <span>•</span>
              <span className="hidden sm:inline font-normal">Élections Communales</span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#EFE9DF]/80 dark:bg-zinc-800/60 p-1 rounded-full shadow-inner border border-amber-200/50 dark:border-zinc-700/50">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#18181B] text-white dark:bg-white dark:text-zinc-950 shadow-sm scale-[1.02]'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-700/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Lang Switcher & Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Language Switcher Pills */}
          <div className="flex items-center bg-[#EFE9DF] dark:bg-zinc-800/80 p-0.5 rounded-full text-xs font-semibold shadow-inner">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-label={`Changer en langue ${l.label}`}
                className={`px-2 sm:px-2.5 py-1 rounded-full transition-all text-[10px] sm:text-[11px] min-h-[28px] sm:min-h-[30px] flex items-center justify-center ${
                  lang === l.code
                    ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-sm font-bold scale-[1.02]'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* User Auth or Admin Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => handleNavClick(isAdmin ? 'admin' : 'membership')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition min-h-[32px] ${
                  isAdmin
                    ? 'bg-amber-400 text-zinc-950 shadow-sm hover:bg-amber-300'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300'
                }`}
              >
                {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                <span className="max-w-[75px] truncate">{user?.name}</span>
              </button>
              <button
                onClick={logout}
                title={t('logout')}
                aria-label={t('logout')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 hover:text-rose-600 active:scale-95 transition min-h-[32px]"
              >
                <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 text-[11px] sm:text-xs font-bold hover:opacity-90 active:scale-95 transition shadow-sm min-h-[32px]"
            >
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{t('login')}</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-200/80 dark:bg-zinc-800 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 transition"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE EXPANDED MENU DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200/50 dark:border-zinc-800 bg-[#FAF7F2] dark:bg-[#141312] p-4 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition text-left min-h-[44px] ${
                    isActive
                      ? 'bg-[#18181B] text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Admin link inside mobile menu */}
          <button
            onClick={() => handleNavClick('admin')}
            className="w-full py-2.5 px-4 rounded-2xl bg-amber-100 dark:bg-zinc-800 text-amber-950 dark:text-amber-200 text-xs font-bold flex items-center justify-center gap-2 border border-amber-300/80 dark:border-zinc-700 min-h-[44px]"
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Accéder au Panneau d'Administration RND</span>
          </button>
        </div>
      )}
    </header>
  );
};
