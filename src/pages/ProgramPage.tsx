import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Sparkles, Gem } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { programPillars } from '../data/campaignData';

export const ProgramPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [expandedPillar, setExpandedPillar] = useState<string | null>(programPillars[0]?.id || null);

  const filterOptions = [
    { id: 'all', label: t('allPillars') },
    ...programPillars.map((p) => ({ id: p.id, label: p.tag[lang] })),
  ];

  const filteredPillars = selectedFilter === 'all'
    ? programPillars
    : programPillars.filter((p) => p.id === selectedFilter);

  const toggleExpand = (id: string) => {
    setExpandedPillar(expandedPillar === id ? null : id);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Page Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>{t('elections2026')}</span>
        </div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          {t('programTitle')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
          6 Piliers d'action concrets pour métamorphoser et dynamiser Aïn El Turck
        </p>
      </div>

      {/* Slogan Banner Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-100/70 via-rose-100/60 to-sky-100/60 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center text-xl shadow-xs flex-shrink-0">
          <Gem className="w-5 h-5 text-amber-500" />
        </div>
        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug italic">
          {t('slogan')}
        </p>
      </div>

      {/* Filter Horizontal Pill Scroll (Purrweb style tab pills) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedFilter(opt.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedFilter === opt.id
                ? 'bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/70 dark:border-zinc-700 hover:border-zinc-400'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Pillars List */}
      <div className="space-y-3.5">
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
                className="w-full text-left p-4 flex items-start gap-3.5"
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
                      Pilier #{pillar.number}
                    </span>
                  </div>

                  <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 leading-snug">
                    {pillar.title[lang]}
                  </h2>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    {pillar.subtitle[lang]}
                  </p>
                </div>

                <div className="text-zinc-400 pt-1">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* Collapsible Action Items List */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
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
                      {items.length} engagements concrets
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ================= SOLEMN ENGAGEMENT SECTION ================= */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-amber-100/60 via-rose-100/40 to-sky-100/40 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm text-center space-y-3">
        <h2 className="text-base font-black text-zinc-900 dark:text-white">
          {t('engagement')}
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t('engagementText1')}
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t('engagementText2')}
        </p>
        <p className="text-xs font-bold text-rose-600 dark:text-rose-400 leading-relaxed italic">
          {t('engagementText3')}
        </p>

        {/* 3 Tricolor Stripes */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          <span className="w-8 h-1 rounded-full bg-[#0047AB]" />
          <span className="w-8 h-1 rounded-full bg-[#00A651]" />
          <span className="w-8 h-1 rounded-full bg-[#C8102E]" />
        </div>
      </section>
    </div>
  );
};
