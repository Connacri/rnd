import React from 'react';
import { Calendar, MapPin, Clock, Sparkles, Building2 } from 'lucide-react';
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
    <div className="max-w-xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-16">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-sky-200/80 dark:border-zinc-700 shadow-xs text-sky-800 dark:text-sky-300 text-xs font-bold mb-3">
          <img src="assets/icons/icon.png" alt="RND" className="w-4 h-4 rounded-full object-contain" />
          <span>Agenda Officiel de Campagne</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {t('upcomingEvents')}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
          Venez échanger directement avec Zenasni Nabil, la tête de liste et les candidats experts du Conseil Communal d'Aïn El Turck.
        </p>
      </div>

      {/* Events Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {campaignEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-5 sm:p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Tag & Calendar Badge */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-bold text-[10px]">
                  {ev.tag?.[lang] || 'Événement'}
                </span>
                <span className="text-[11px] text-zinc-400 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Campagne 2026</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                {ev.title[lang]}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                {ev.description[lang]}
              </p>
            </div>

            {/* Date & Location Chips */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{formatDate(ev.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                <MapPin className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <span>{ev.location[lang]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 dark:bg-zinc-900/60 border border-amber-200/60 dark:border-zinc-800 text-center max-w-xl mx-auto space-y-1">
        <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
          Entrée libre et ouverte à tous les citoyennes et citoyens d'Aïn El Turck.
        </p>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Pour organiser une rencontre dans votre quartier ou inviter les candidats, utilisez le formulaire de contact.
        </p>
      </div>
    </div>
  );
};
