import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { CampaignProvider } from './context/CampaignContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { CandidatePage } from './pages/CandidatePage';
import { ProgramPage } from './pages/ProgramPage';
import { CouncilPage } from './pages/CouncilPage';
import { MembershipPage } from './pages/MembershipPage';
import { EventsPage } from './pages/EventsPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPages } from './pages/AuthPages';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Listen to hash or internal navigation
  useEffect(() => {
    const validPages = [
      'home',
      'candidate',
      'program',
      'council',
      'membership',
      'events',
      'admin',
      'login',
      'register',
      'forgot-password',
    ];
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAuthPage = ['login', 'register', 'forgot-password'].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-zinc-900 dark:bg-[#121110] dark:text-zinc-100 flex flex-col antialiased selection:bg-amber-300 selection:text-zinc-950 font-sans transition-colors duration-200">
      {/* Top Official RND Algeria Navbar */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'candidate' && <CandidatePage onNavigate={navigateTo} />}
        {currentPage === 'program' && <ProgramPage />}
        {currentPage === 'council' && <CouncilPage onNavigate={navigateTo} />}
        {currentPage === 'membership' && <MembershipPage />}
        {currentPage === 'events' && <EventsPage />}
        {currentPage === 'admin' && <AdminPage onNavigate={navigateTo} />}
        {isAuthPage && (
          <AuthPages
            view={currentPage as 'login' | 'register' | 'forgot-password'}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Floating Bottom Navigation Pill (hidden on auth & admin pages for clean focus) */}
      {!isAuthPage && currentPage !== 'admin' && (
        <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CampaignProvider>
          <AppContent />
        </CampaignProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
