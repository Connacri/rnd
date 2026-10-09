import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, HeartHandshake, Lightbulb, Scale, Sprout, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { candidateData, campaignStats, programPillars, campaignNews } from '../data/campaignData';
import { AudioPlayer } from '../components/AudioPlayer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { lang, t, isRtl } = useLanguage();

  const values = [
    {
      icon: HeartHandshake,
      title: t('proximity'),
      desc: t('proximityDesc'),
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      icon: Lightbulb,
      title: t('innovation'),
      desc: t('innovationDesc'),
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    },
    {
      icon: Scale,
      title: t('transparency'),
      desc: t('transparencyDesc'),
      color: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
    },
    {
      icon: Sprout,
      title: t('development'),
      desc: t('developmentDesc'),
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300',
    },
  ];

  const screenshots = [
    { src: '/assets/images/1000011155.png', title: t('home') },
    { src: '/assets/images/1000011156.png', title: t('program') },
    { src: '/assets/images/1000011157.png', title: t('membership') },
    { src: '/assets/images/1000011158.png', title: t('events') },
  ];

  return (
    <div className="space-y-12 pb-24">
      {/* ================= HERO SECTION (Purrweb Style Profile Card) ================= */}
      <section className="relative overflow-hidden pt-4 pb-8">
        {/* Soft Organic Wavy Backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-rose-200/50 via-amber-200/40 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-md mx-auto px-4 text-center">
          {/* Header pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181B] text-amber-300 text-xs font-bold shadow-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('elections2026')}</span>
          </div>

          {/* Profile Avatar Card with Decorative Starburst Ring (Inspired by uploaded image) */}
          <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
            {/* Scalloped / Sunburst background ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-200 opacity-70 animate-spin-slow p-1">
              <div className="w-full h-full rounded-full border-4 border-dashed border-rose-400/40" />
            </div>

            {/* Inner glow circle */}
            <div className="relative w-40 h-40 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-amber-400 to-rose-400 shadow-xl shadow-rose-900/10">
              <img
                src={candidateData.photoUrl}
                alt={candidateData.name}
                className="w-full h-full object-cover object-top rounded-full bg-amber-50"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/icons/icon.png';
                }}
              />
            </div>

            {/* Floating Star Rating / Verification Badge (matching screenshot aesthetic) */}
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-amber-200/50 text-xs font-bold text-zinc-900 dark:text-zinc-100">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0</span>
            </div>

            {/* Location floating chip */}
            <div className="absolute bottom-1 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-amber-200/50 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              <span>📍 {t('city')}</span>
            </div>
          </div>

          {/* Candidate Name & Role */}
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            {candidateData.name}
          </h1>
          <p className="mt-1 text-sm font-semibold text-rose-600 dark:text-rose-400">
            {candidateData.role[lang]}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {candidateData.party[lang]}
          </p>

          {/* Slogan & Description Quote */}
          <div className="mt-5 p-4 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-amber-200/50 dark:border-zinc-800 shadow-sm text-center">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              {t('slogan')}
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {candidateData.biography[lang]}
            </p>
          </div>

          {/* Interactive Audio Speech Player */}
          <div className="mt-5">
            <AudioPlayer />
          </div>

          {/* Action Button Pills (like "Book" and "Chat" in the reference design) */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('program')}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition"
            >
              <span>{t('ourProgram')}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => onNavigate('membership')}
              className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-sm shadow-sm border border-amber-200 dark:border-zinc-700 hover:bg-amber-50/50 active:scale-95 transition"
            >
              <span>{t('joinUs')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= KEY STATS CAPSULES (Purrweb Style Metrics) ================= */}
      <section className="max-w-md mx-auto px-4">
        <div className="p-4 rounded-[28px] bg-gradient-to-br from-amber-100/60 via-rose-100/40 to-sky-100/40 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {campaignStats.map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-white/90 dark:bg-zinc-800/90 border border-white/60 dark:border-zinc-700 shadow-sm text-center"
              >
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6 PROGRAM PILLARS PREVIEW (Stacked Cards Style) ================= */}
      <section className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400">
              {t('program')}
            </span>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              {t('discoverProgram')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('program')}
            className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>{t('learnMore')}</span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Stacked / Highlighted Cards in Warm Pastels */}
        <div className="space-y-3">
          {programPillars.slice(0, 3).map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigate('program')}
              className="group cursor-pointer p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start gap-3.5">
                <div
                  style={{ backgroundColor: `${pillar.accentColor}18`, color: pillar.accentColor }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform"
                >
                  {pillar.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      style={{ color: pillar.accentColor }}
                      className="text-[10px] font-black uppercase tracking-wider"
                    >
                      {pillar.tag[lang]}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      #{pillar.number}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1 mt-0.5">
                    {pillar.title[lang]}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1">
                    {pillar.subtitle[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => onNavigate('program')}
            className="w-full py-3 rounded-2xl bg-amber-100/70 dark:bg-zinc-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-200/80 transition"
          >
            <span>{t('discoverProgram')}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </section>

      {/* ================= VALUES SECTION ================= */}
      <section className="max-w-md mx-auto px-4">
        <div className="text-center mb-5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
            {t('whoWeAre')}
          </span>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white mt-0.5">
            {t('ourValues')}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
            {t('approach')}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${v.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {v.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= NEWS SECTION ================= */}
      {campaignNews.length > 0 && (
        <section className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              {t('latestNews')}
            </h2>
            <span className="text-xs font-semibold text-zinc-400">
              {campaignNews.length} articles
            </span>
          </div>

          <div className="space-y-3">
            {campaignNews.map((item) => (
              <article
                key={item.id}
                className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                    {item.tag?.[lang] || 'Info'}
                  </span>
                  <span className="text-zinc-400 font-medium">{item.date}</span>
                </div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                  {item.title[lang]}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {item.body[lang]}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ================= SCREENSHOTS PREVIEW SECTION ================= */}
      <section className="max-w-md mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-black text-zinc-900 dark:text-white">
            Aperçu de l'application
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Découvrez les écrans officiels de la campagne
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              className="p-2 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm overflow-hidden text-center"
            >
              <div className="rounded-2xl overflow-hidden bg-zinc-950 aspect-[9/16] relative">
                <img
                  src={s.src}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if asset not ready
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-2 mb-1">
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="max-w-md mx-auto px-4 pt-6 border-t border-amber-200/50 dark:border-zinc-800 text-center">
        {/* Tricolor Ribbon: Blue, Green, Red */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <span className="w-8 h-1.5 rounded-full bg-[#0047AB]" />
          <span className="w-8 h-1.5 rounded-full bg-[#00A651]" />
          <span className="w-8 h-1.5 rounded-full bg-[#C8102E]" />
        </div>

        <h3 className="font-black text-sm text-zinc-900 dark:text-zinc-100">
          {candidateData.name} — {t('partyShort')}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          {t('footerDesc')}
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          {['Facebook', 'Twitter', 'Instagram', 'Telegram'].map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-[10px] font-semibold text-zinc-700 dark:text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>

        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-5">
          {t('rights')}
        </p>
        <p className="text-[10px] text-zinc-400/80 dark:text-zinc-600 mt-1 pb-4">
          {t('developerCredit')}
        </p>
      </footer>
    </div>
  );
};
