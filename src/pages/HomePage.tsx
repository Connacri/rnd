import React, { useState } from 'react';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, HeartHandshake, Lightbulb, Scale, Sprout, Sparkles, Star, X, Building2, MapPin, Users, Award } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCampaign } from '../context/CampaignContext';
import { campaignStats } from '../data/campaignData';
import { AudioPlayer } from '../components/AudioPlayer';
import { ProgramPillar } from '../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { lang, t, isRtl } = useLanguage();
  const { candidate, pillars, news, councilCandidates } = useCampaign();
  const [selectedPillar, setSelectedPillar] = useState<ProgramPillar | null>(null);

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
    { src: 'assets/images/1000011155.png', title: t('home') },
    { src: 'assets/images/1000011156.png', title: t('program') },
    { src: 'assets/images/1000011157.png', title: t('membership') },
    { src: 'assets/images/1000011158.png', title: t('events') },
  ];

  return (
    <div className="space-y-10 sm:space-y-16 pb-24 md:pb-16">
      {/* ================= HERO SECTION (Purrweb Style Profile Card) ================= */}
      <section className="relative overflow-hidden pt-3 sm:pt-6 pb-6 sm:pb-10">
        {/* Soft Organic Wavy Backdrop */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-b from-rose-200/50 via-amber-200/40 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-xl md:max-w-3xl mx-auto px-4 text-center">
          {/* Header pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#18181B] text-amber-300 text-xs font-bold shadow-sm mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('elections2026')}</span>
          </div>

          {/* Profile Avatar Card with Decorative Starburst Ring (Inspired by uploaded image) */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-5 sm:mb-7 flex items-center justify-center">
            {/* Scalloped / Sunburst background ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-200 opacity-70 animate-spin-slow p-1">
              <div className="w-full h-full rounded-full border-4 border-dashed border-rose-400/40" />
            </div>

            {/* Inner glow circle */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-amber-400 to-rose-400 shadow-xl shadow-rose-900/10">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-full h-full object-cover object-top rounded-full bg-amber-50"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
                }}
              />
            </div>

            {/* Official RND Party Seal Badge */}
            <div className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 shadow-lg border border-amber-200/90 text-xs font-black text-zinc-900 dark:text-zinc-100 z-10">
              <img
                src="assets/icons/icon.png"
                alt="RND"
                className="w-4 h-4 rounded-full object-contain"
              />
              <span>RND</span>
            </div>

            {/* Floating Star Rating / Verification Badge (matching screenshot aesthetic) */}
            <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-amber-200/60 text-xs font-bold text-zinc-900 dark:text-zinc-100">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0</span>
            </div>

            {/* Location floating chip */}
            <div className="absolute -bottom-1 -left-1 sm:bottom-0 sm:left-1 flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white dark:bg-zinc-900 shadow-md border border-amber-200/60 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              <span>📍 {t('city')}</span>
            </div>
          </div>

          {/* Candidate Name & Role */}
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            {candidate.name}
          </h1>
          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400">
            {candidate.role[lang] || candidate.role.fr}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
            {candidate.party[lang] || candidate.party.fr}
          </p>

          {/* Slogan & Description Quote */}
          <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-amber-200/60 dark:border-zinc-800 shadow-sm text-center">
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
              {t('slogan')}
            </p>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto">
              {candidate.biography[lang] || candidate.biography.fr}
            </p>
          </div>

          {/* Interactive Audio Speech Player */}
          <div className="mt-4 sm:mt-6">
            <AudioPlayer />
          </div>

          {/* Action Button Pills (like "Book" and "Chat" in the reference design) */}
          <div className="mt-5 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm sm:max-w-md mx-auto">
            <button
              onClick={() => onNavigate('program')}
              className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm shadow-md hover:opacity-90 active:scale-95 transition min-h-[44px]"
            >
              <span>{t('ourProgram')}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => onNavigate('membership')}
              className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold text-xs sm:text-sm shadow-sm border border-amber-200 dark:border-zinc-700 hover:bg-amber-50/50 active:scale-95 transition min-h-[44px]"
            >
              <span>{t('joinUs')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= KEY STATS CAPSULES (Purrweb Style Metrics) ================= */}
      <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        <div className="p-3.5 sm:p-5 rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-amber-100/60 via-rose-100/40 to-sky-100/40 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {campaignStats.map((stat, i) => (
              <div
                key={i}
                className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/90 dark:bg-zinc-800/90 border border-white/60 dark:border-zinc-700 shadow-sm text-center transition-transform hover:-translate-y-0.5"
              >
                <div className="text-xl sm:text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 dark:text-zinc-50 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {stat.label[lang]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6 PROGRAM PILLARS PREVIEW (Stacked Cards Style) ================= */}
      <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400">
              {t('program')}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white">
              {t('discoverProgram')}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('program')}
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:underline min-h-[36px]"
          >
            <span>{t('learnMore')}</span>
            <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Responsive Grid: Stacks on mobile, 3-column cards on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {pillars.slice(0, 3).map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar)}
              className="group cursor-pointer p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-3">
                  <div
                    style={{ backgroundColor: `${pillar.accentColor}18`, color: pillar.accentColor }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-105 transition-transform"
                  >
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-bold text-zinc-400">
                    #{pillar.number}
                  </span>
                </div>

                <span
                  style={{ color: pillar.accentColor }}
                  className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider block mb-1"
                >
                  {pillar.tag[lang] || pillar.tag.fr}
                </span>

                <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                  {pillar.title[lang] || pillar.title.fr}
                </h3>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mt-1.5 leading-relaxed">
                  {pillar.subtitle[lang] || pillar.subtitle.fr}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                <span>{pillar.items[lang]?.length || pillar.items.fr.length} points d'action</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-0.5">
                  <span>Détails</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate('program')}
          className="mt-4 w-full py-3.5 rounded-2xl bg-amber-100/70 dark:bg-zinc-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-amber-200/80 active:scale-95 transition min-h-[44px]"
        >
          <span>{t('discoverProgram')}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </section>

      {/* ================= CANDIDATS DU CONSEIL COMMUNAL (EXPERTS) PREVIEW ================= */}
      {councilCandidates.length > 0 && (
        <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
                Compétences & Équipe municipale
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white">
                Nos Candidats Experts au Conseil
              </h2>
            </div>
            <button
              onClick={() => onNavigate('council')}
              className="flex items-center gap-1 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:underline min-h-[36px]"
            >
              <span>Voir toute la liste ({councilCandidates.length})</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {councilCandidates.slice(0, 3).map((cand) => (
              <div
                key={cand.id}
                onClick={() => onNavigate('council')}
                className="group cursor-pointer p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={cand.photoUrl}
                      alt={cand.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-amber-300/80 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
                      }}
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 block truncate">
                        {cand.role}
                      </span>
                      <h3 className="text-sm font-black text-zinc-900 dark:text-white truncate">
                        {cand.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-1.5">
                    <Award className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{cand.expertise}</span>
                  </div>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {cand.bio}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 font-semibold">
                  <span className="truncate max-w-[170px]">{cand.commission}</span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= VALUES SECTION ================= */}
      <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        <div className="text-center mb-5 sm:mb-8">
          <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
            {t('whoWeAre')}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white mt-0.5">
            {t('ourValues')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
            {t('approach')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-3 ${v.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
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
      {news.length > 0 && (
        <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white">
              {t('latestNews')}
            </h2>
            <span className="text-xs font-semibold text-zinc-400">
              {news.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            {news.map((item) => (
              <article
                key={item.id}
                className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold">
                      {item.tag?.[lang] || item.tag?.fr || 'Info'}
                    </span>
                    <span className="text-zinc-400 font-medium">{item.date}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                    {item.title[lang] || item.title.fr}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                    {item.body[lang] || item.body.fr}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ================= SCREENSHOTS PREVIEW SECTION ================= */}
      <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-white">
            Aperçu de l'application
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Découvrez les écrans officiels de la campagne
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-2.5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm overflow-hidden text-center"
            >
              <div className="rounded-2xl overflow-hidden bg-zinc-950 aspect-[9/16] relative">
                <img
                  src={s.src}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
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

      {/* ================= RND BUREAU COMMUNAL SECTION ================= */}
      <section className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4">
        <div className="p-5 sm:p-7 rounded-[32px] bg-gradient-to-br from-white via-amber-50/40 to-rose-50/30 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/80 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white dark:bg-zinc-800 p-2 shadow-md border border-amber-200/80 dark:border-zinc-700 flex items-center justify-center flex-shrink-0">
            <img
              src="assets/icons/icon.png"
              alt="Logo Officiel RND"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-[10px] sm:text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('partyShort')} — Bureau Communal</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white">
              Rassemblement National Démocratique • Aïn El Turck
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Sous l'impulsion de Zenasni Nabil, le Bureau Communal du RND œuvre quotidiennement pour l'essor économique, touristique et social d'Aïn El Turck et de ses habitants.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Aïn El Turck, Wilaya d'Oran</span>
              </span>
              <span>•</span>
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Élections Locales 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 pt-8 border-t border-amber-200/50 dark:border-zinc-800 text-center">
        {/* Official RND Logo Emblem in Footer */}
        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 p-1.5 shadow-sm border border-amber-200/80 dark:border-zinc-700 mx-auto mb-3 flex items-center justify-center">
          <img
            src="assets/icons/icon.png"
            alt="RND"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Tricolor Ribbon: Blue, Green, Red */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <span className="w-8 h-1.5 rounded-full bg-[#0047AB]" />
          <span className="w-8 h-1.5 rounded-full bg-[#00A651]" />
          <span className="w-8 h-1.5 rounded-full bg-[#C8102E]" />
        </div>

        <h3 className="font-black text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
          {candidate.name} — {t('partyShort')}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
          {t('footerDesc')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {['Facebook', 'Twitter', 'Instagram', 'Telegram'].map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-[10px] sm:text-xs font-semibold text-zinc-700 dark:text-zinc-300"
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

      {/* ================= RESPONSIVE PILLAR MODAL DIALOG ================= */}
      {selectedPillar && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPillar(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-[32px] sm:rounded-[36px] bg-[#FAF7F2] dark:bg-[#1A1816] p-5 sm:p-7 border border-amber-200/80 dark:border-zinc-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  style={{ backgroundColor: `${selectedPillar.accentColor}20`, color: selectedPillar.accentColor }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                >
                  {selectedPillar.icon}
                </div>
                <div>
                  <span
                    style={{ color: selectedPillar.accentColor }}
                    className="text-[10px] font-black uppercase tracking-wider block"
                  >
                    Pilier #{selectedPillar.number} • {selectedPillar.tag[lang]}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight">
                    {selectedPillar.title[lang]}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedPillar(null)}
                aria-label="Fermer"
                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 active:scale-95 transition flex-shrink-0 min-h-[36px]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed bg-white/70 dark:bg-zinc-900/60 p-3.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800">
              {selectedPillar.subtitle[lang]}
            </p>

            {/* Action items list */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Engagements & Actions concrètes ({selectedPillar.items[lang]?.length || 5})
              </h4>
              <ul className="space-y-2">
                {(selectedPillar.items[lang] || selectedPillar.items.fr).map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed"
                  >
                    <CheckCircle2
                      style={{ color: selectedPillar.accentColor }}
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                onClick={() => {
                  setSelectedPillar(null);
                  onNavigate('program');
                }}
                className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 active:scale-95 transition min-h-[44px]"
              >
                <span>Voir le programme complet</span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setSelectedPillar(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm active:scale-95 transition min-h-[44px]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
