import React, { useEffect, useState } from 'react';
import { Download, Share2, Smartphone, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const { lang } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const isIOS = typeof navigator !== 'undefined' &&
    (/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalled(standalone);

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const copy = lang === 'ar'
    ? { button: 'تثبيت التطبيق', ios: 'في Safari، اضغط على «مشاركة» ثم «إضافة إلى الشاشة الرئيسية».', android: 'افتح قائمة المتصفح ⋮ ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».', close: 'إغلاق' }
    : lang === 'en'
      ? { button: 'Install app', ios: 'In Safari, tap Share, then “Add to Home Screen”.', android: 'Open the browser menu ⋮ and choose “Install app” or “Add to Home Screen”.', close: 'Close' }
      : { button: 'Installer l’application', ios: 'Dans Safari, touche Partager, puis « Sur l’écran d’accueil » et « Ajouter ».', android: 'Ouvre le menu du navigateur ⋮ puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».', close: 'Fermer' };

  const handleInstall = async () => {
    if (isIOS || !installPrompt) {
      setShowHelp((open) => !open);
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  if (installed) return null;

  return (
    <div className="w-full max-w-sm">
      <button
        type="button"
        onClick={handleInstall}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-green-700/30 bg-white/80 dark:bg-zinc-900/80 px-4 py-3 text-sm font-bold text-green-900 dark:text-green-200 shadow-sm hover:bg-green-50 dark:hover:bg-zinc-800 transition min-h-[44px]"
        aria-expanded={showHelp}
      >
        {isIOS ? <Share2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}
        <span>{copy.button}</span>
      </button>
      {showHelp && (
        <div role="status" className="mt-2 rounded-2xl border border-green-200 bg-green-50 p-3 text-left text-xs leading-relaxed text-green-950 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100">
          <div className="flex items-start gap-2">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="flex-1">{isIOS ? copy.ios : copy.android}</p>
            <button type="button" onClick={() => setShowHelp(false)} aria-label={copy.close} className="rounded-full p-1 hover:bg-green-100 dark:hover:bg-green-900">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
