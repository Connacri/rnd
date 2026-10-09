import React from 'react';
import { Home, BookOpen, User, UserPlus, Calendar } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'program', label: t('navProgram'), icon: BookOpen },
    { id: 'candidate', label: t('navCandidate'), icon: User },
    { id: 'membership', label: t('navMembership'), icon: UserPlus },
    { id: 'events', label: t('navEvents'), icon: Calendar },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        role="navigation"
        aria-label="Navigation principale"
        className="pointer-events-auto bg-[#18181B]/95 dark:bg-[#1C1A17]/95 backdrop-blur-xl text-white p-1.5 rounded-full shadow-2xl shadow-zinc-950/25 border border-white/10 flex items-center gap-1 transition-all max-w-md w-full justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 py-2 px-2.5 sm:px-3 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 shadow-md font-bold scale-[1.04]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="truncate max-w-[65px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
