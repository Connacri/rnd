import React from 'react';
import { Calendar, MapPin, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { campaignEvents } from '../data/campaignData';

export const EventsPage: React.FC = () => {
  const { lang, t } = useLanguage();

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const locale = lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-US';
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 text-xs font-bold mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>{t('seeEvents')}</span>
        </div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          {t('upcomingEvents')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
          Venez échanger directement avec Zenasni Nabil et l'équipe de campagne
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-3.5">
        {campaignEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3"
          >
            {/* Tag & Calendar Badge */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                {ev.tag?.[lang] || 'Événement'}
              </span>
              <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>2026</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
              {ev.title[lang]}
            </h2>

            {/* Description */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {ev.description[lang]}
            </p>

            {/* Date & Location Chips */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{formatDate(ev.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                <span>{ev.location[lang]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-zinc-900/60 border border-amber-200/50 dark:border-zinc-800 text-center">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Entrée libre et ouverte à tous les citoyens d'Aïn El Turck.
        </p>
      </div>
    </div>
  );
};
