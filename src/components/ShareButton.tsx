import React, { useState } from 'react';
import { Share2, Check, Copy, X, MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: 'pill' | 'icon' | 'primary' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title = 'Nos Candidats — RND Aïn El Turck 2026',
  text = 'Découvrez la campagne officielle de Zenasni Nabil pour les Élections Communales 2026.',
  url,
  variant = 'pill',
  size = 'md',
  label,
  className = '',
}) => {
  const { t, isRtl } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://connacri.github.io/rnd/';
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();

    // Check if Web Share API is available (primarily mobile and modern supported browsers)
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        // If user cancelled, don't show fallback
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        // If failed due to permissions or environment, fall through to modal fallback
      }
    }

    // Fallback: show interactive modal with direct copy and social platform links
    setShowModal(true);
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = getShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title} — ${text}`);

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-sm sm:text-base px-4 py-2 gap-2.5',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const buttonContent = (
    <>
      <Share2 className={`${iconSizes} flex-shrink-0 transition-transform group-hover:scale-110`} />
      {variant !== 'icon' && <span>{label || t('share')}</span>}
    </>
  );

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleShare}
          aria-label={label || t('share')}
          title={label || t('share')}
          className={`group inline-flex items-center justify-center p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 hover:bg-amber-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700 shadow-xs hover:border-amber-300 transition-all active:scale-95 cursor-pointer ${className}`}
        >
          {buttonContent}
        </button>
      ) : variant === 'primary' ? (
        <button
          type="button"
          onClick={handleShare}
          className={`group inline-flex items-center justify-center font-bold rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer ${sizeClasses} ${className}`}
        >
          {buttonContent}
        </button>
      ) : variant === 'subtle' ? (
        <button
          type="button"
          onClick={handleShare}
          className={`group inline-flex items-center justify-center font-semibold rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-200/50 dark:border-amber-800/50 active:scale-95 transition-all cursor-pointer ${sizeClasses} ${className}`}
        >
          {buttonContent}
        </button>
      ) : (
        /* default 'pill' */
        <button
          type="button"
          onClick={handleShare}
          className={`group inline-flex items-center justify-center font-semibold rounded-full bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-zinc-750 shadow-xs active:scale-95 transition-all cursor-pointer ${sizeClasses} ${className}`}
        >
          {buttonContent}
        </button>
      )}

      {/* Fallback Share Modal */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-[#FAF7F2] dark:bg-[#1C1A17] border border-amber-200/80 dark:border-zinc-800 shadow-2xl p-5 space-y-4 text-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base">
                  {label || t('share')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t('shareDescription')}
            </p>

            {/* Quick Social Actions */}
            <div className="grid grid-cols-4 gap-2 text-center pt-1">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 transition-colors text-[11px] font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <span>WhatsApp</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/70 text-blue-700 dark:text-blue-300 transition-colors text-[11px] font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs font-black text-lg">
                  f
                </div>
                <span>Facebook</span>
              </a>

              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors text-[11px] font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xs font-black text-sm">
                  𝕏
                </div>
                <span>X</span>
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-950/70 text-sky-700 dark:text-sky-300 transition-colors text-[11px] font-semibold"
              >
                <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs">
                  <Send className="w-4 h-4 fill-current translate-x-[-1px]" />
                </div>
                <span>Telegram</span>
              </a>
            </div>

            {/* Direct Copy Link Bar */}
            <div className="pt-2">
              <div className="flex items-center gap-2 p-1.5 pl-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-transparent text-xs text-zinc-600 dark:text-zinc-300 select-all outline-hidden truncate"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t('copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t('copyLink')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
