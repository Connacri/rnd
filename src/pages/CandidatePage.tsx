import React from 'react';
import { Star, Shield, Award, HeartHandshake, Lightbulb, Scale, Sprout, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useCampaign } from '../context/CampaignContext';
import { AudioPlayer } from '../components/AudioPlayer';

interface CandidatePageProps {
  onNavigate: (page: string) => void;
}

export const CandidatePage: React.FC<CandidatePageProps> = ({ onNavigate }) => {
  const { lang, t, isRtl } = useLanguage();
  const { candidate } = useCampaign();

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

  return (
    <div className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-10 pb-24 md:pb-16">
      {/* Top Banner / Avatar */}
      <section className="text-center relative">
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
          {/* Sunburst organic outline */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 animate-spin-slow opacity-80" />
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden p-1 bg-white dark:bg-zinc-900 shadow-xl">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-full h-full object-cover object-top rounded-full bg-amber-50"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
              }}
            />
          </div>

          {/* Official RND Badge on Candidate */}
          <div className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-1 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 shadow-lg border border-amber-200/90 text-xs font-black text-zinc-900 dark:text-zinc-100 z-10">
            <img
              src="assets/icons/icon.png"
              alt="RND"
              className="w-4 h-4 rounded-full object-contain"
            />
            <span>RND</span>
          </div>

          <div className="absolute top-1 right-1 sm:right-2 flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-[#18181B] text-amber-300 shadow-md text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>2026</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {candidate.name}
        </h1>
        <p className="text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 mt-1">
          {candidate.role[lang] || candidate.role.fr}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {candidate.location[lang] || candidate.location.fr}
        </p>

        {/* Party Badge with official RND icon */}
        <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-200/80 dark:border-zinc-700 shadow-xs text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <img src="assets/icons/icon.png" alt="RND" className="w-4 h-4 rounded-full object-cover" />
          <span>{candidate.party[lang] || candidate.party.fr}</span>
        </div>

        {/* Audio Speech Player */}
        <div className="mt-6 max-w-sm mx-auto">
          <AudioPlayer />
        </div>
      </section>

      {/* Two columns on desktop: Vision + Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Vision Statement Quote */}
        <section className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-100/60 to-rose-100/40 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <span className="text-6xl text-rose-400/20 font-serif absolute -top-4 left-3 select-none">
              “
            </span>
            <h2 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2 relative z-10 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>{t('ourVision')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed relative z-10">
              {t('visionText')}
            </p>
          </div>
        </section>

        {/* Engagement for Ain El Turck */}
        <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3">
          <h2 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white">
            {t('commitment')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t('commitmentText')}
          </p>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
            <p className="text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
              💡 {t('approach')}
            </p>
          </div>
        </section>
      </div>

      {/* Values */}
      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white">
          {t('ourValues')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${v.color}`}>
                  <Icon className="w-4 h-4" />
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

      {/* Call to Action */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#18181B] text-white text-center shadow-lg space-y-3 max-w-xl mx-auto">
        <div className="w-10 h-10 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-1">
          <img src="assets/icons/icon.png" alt="RND" className="w-6 h-6 object-contain rounded-lg" />
        </div>
        <h3 className="text-base sm:text-lg font-bold">
          {t('joinMovement')}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md mx-auto">
          {t('membershipDesc')}
        </p>
        <button
          onClick={() => onNavigate('membership')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition mx-auto min-h-[44px]"
        >
          <span>{t('joinUs')}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
