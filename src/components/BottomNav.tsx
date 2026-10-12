import React from 'react';
import { Home, BookOpen, Users, User, UserPlus } from 'lucide-react';
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
    { id: 'council', label: 'Conseil', icon: Users },
    { id: 'candidate', label: 'Candidat', icon: User },
    { id: 'membership', label: 'Contact', icon: UserPlus },
  ];

  return (
    <div className="lg:hidden fixed bottom-3 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none pb-[env(safe-area-inset-bottom,0px)]">
      <nav
        role="navigation"
        aria-label="Navigation mobile"
        className="pointer-events-auto bg-[#18181B]/95 dark:bg-[#1C1A17]/95 backdrop-blur-xl text-white p-1 rounded-full shadow-2xl shadow-zinc-950/40 border border-white/15 flex items-center justify-between w-full max-w-[390px] transition-all"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-full text-[10px] font-semibold transition-all duration-200 min-h-[44px] ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 shadow-md font-bold scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/10 active:scale-95'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="truncate max-w-[62px] text-[10px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
