import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Sparkles, Gem } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCampaign } from '../context/CampaignContext';

export const ProgramPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { pillars } = useCampaign();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const pledge = {
    ar: {
      title: 'التزامنا الرسمي الصادق',
      first: 'برنامجنا مبني على مشاريع ملموسة وقابلة للتحقيق ومالياً مسؤولة.',
      second: 'نحن لا نعد بمشاريع غير قابلة للتحقيق أو تعتمد على تمويلات غير مؤكدة.',
      closing: 'معاً، لنجعل عين الترك بلدية يحسن العيش فيها والاستثمار والعمل واستقبال الزوار الكرام.'
    },
    fr: {
      title: 'Notre engagement officiel et sincère',
      first: 'Notre programme repose sur des projets concrets, réalisables et financièrement responsables.',
      second: 'Nous ne promettons pas de projets irréalisables ou dépendant de financements incertains.',
      closing: 'Ensemble, faisons d’Aïn El Turck une commune où il fait bon vivre, investir, travailler et accueillir dignement nos visiteurs.'
    },
    en: {
      title: 'Our sincere official commitment',
      first: 'Our program is built on concrete, achievable and financially responsible projects.',
      second: 'We do not promise projects that cannot be delivered or that depend on uncertain funding.',
      closing: 'Together, let us make Ain El Turck a municipality where people can live, invest, work and warmly welcome visitors.'
    }
  }[lang] || {
    title: 'Notre engagement officiel et sincère',
    first: 'Notre programme repose sur des projets concrets, réalisables et financièrement responsables.',
    second: 'Nous ne promettons pas de projets irréalisables ou dépendant de financements incertains.',
    closing: 'Ensemble, faisons d’Aïn El Turck une commune où il fait bon vivre, investir, travailler et accueillir dignement nos visiteurs.'
  };
  const [expandedPillar, setExpandedPillar] = useState<string | null>(pillars[0]?.id || null);

  const filterOptions = [
    { id: 'all', label: t('allPillars') },
    ...pillars.map((p) => ({ id: p.id, label: p.tag[lang] || p.tag.fr })),
  ];

  const filteredPillars = selectedFilter === 'all'
    ? pillars
    : pillars.filter((p) => p.id === selectedFilter);

  const toggleExpand = (id: string) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-16">
      {/* Page Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-200/80 dark:border-zinc-700 shadow-xs text-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
          <img src="assets/icons/icon.png" alt="Nos Candidats" className="w-4 h-4 rounded-full object-cover" />
          <span>{t('elections2026')}</span>
        </div>
        <h1 className="text-xl sm:text-4xl leading-tight break-words px-1 font-black text-zinc-900 dark:text-white">
          {t('programTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
          {lang === 'ar' ? '6 محاور عمل ملموسة لتطوير عين الترك وتنشيطها' : lang === 'en' ? '6 concrete action areas to transform and energize Ain El Turck' : "6 axes d’action concrets pour transformer et dynamiser Aïn El Turck"}
        </p>
      </div>

      {/* Slogan Banner Card */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-100/70 via-rose-100/60 to-sky-100/60 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm flex items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-xl shadow-xs flex-shrink-0">
          <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
        </div>
        <p className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200 leading-snug italic">
          {t('slogan')}
        </p>
      </div>

      {/* Filter Horizontal Pill Scroll (Purrweb style tab pills) */}
      <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 md:mx-0 md:flex-wrap">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedFilter(opt.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold transition-all min-h-[36px] flex items-center justify-center ${
              selectedFilter === opt.id
                ? 'bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02] font-bold'
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/70 dark:border-zinc-700 hover:border-zinc-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Pillars List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
        {filteredPillars.map((pillar) => {
          const isExpanded = expandedPillar === pillar.id;
          const items = pillar.items[lang] || pillar.items.fr;

          return (
            <div
              key={pillar.id}
              className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Header Tap Area */}
              <button
                onClick={() => toggleExpand(pillar.id)}
                className={`w-full p-4 sm:p-5 flex items-start gap-3.5 min-h-[64px] ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div
                  style={{ backgroundColor: `${pillar.accentColor}18`, color: pillar.accentColor }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-xs"
                >
                  {pillar.icon}
                </div>

                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      style={{ color: pillar.accentColor }}
                      className="text-[10px] font-black uppercase tracking-wider"
                    >
                      {pillar.tag[lang]}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      {lang === 'ar' ? `المحور #${pillar.number}` : lang === 'en' ? `Pillar #${pillar.number}` : `Axe n° ${pillar.number}`}
                    </span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug">
                    {pillar.title[lang]}
                  </h2>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                    {pillar.subtitle[lang]}
                  </p>
                </div>

                <div className="text-zinc-400 pt-1 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Collapsible Action Items List */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2.5">
                    {t('viewDetails')} ({items.length})
                  </h3>

                  <ul className="space-y-2.5">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <CheckCircle
                          style={{ color: pillar.accentColor }}
                          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-2 flex justify-end">
                    <span
                      style={{ borderColor: `${pillar.accentColor}40`, color: pillar.accentColor }}
                      className="px-3 py-1 rounded-full text-[11px] font-bold border"
                    >
                      {lang === 'ar' ? `${items.length} التزامات عملية` : lang === 'en' ? `${items.length} concrete commitments` : `${items.length} engagements concrets`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= OFFICIAL PROGRAM COMMITMENT ================= */}
      <section className="rounded-3xl bg-white dark:bg-zinc-900 border border-green-200 dark:border-green-900/60 shadow-sm overflow-hidden text-center">
        <div className="h-1.5 bg-gradient-to-r from-[#00A651] via-white to-[#C8102E]" />
        <div className="p-5 sm:p-8 space-y-4">
          <h2 className="text-lg sm:text-2xl font-black text-green-900 dark:text-green-300">{pledge.title}</h2>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{pledge.first}</p>
          <p className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">{pledge.second}</p>
          <p className="text-sm sm:text-base leading-relaxed font-black text-green-800 dark:text-green-300">{pledge.closing}</p>
        </div>
      </section>
    </div>
  );
};
