import React from 'react';
import { Star, Shield, Award, HeartHandshake, Lightbulb, Scale, Sprout, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { candidateData } from '../data/campaignData';
import { AudioPlayer } from '../components/AudioPlayer';

interface CandidatePageProps {
  onNavigate: (page: string) => void;
}

export const CandidatePage: React.FC<CandidatePageProps> = ({ onNavigate }) => {
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

  return (
    <div className="max-w-md mx-auto px-4 py-4 space-y-8 pb-24">
      {/* Top Banner / Avatar */}
      <section className="text-center relative">
        <div className="relative w-44 h-44 mx-auto mb-5 flex items-center justify-center">
          {/* Sunburst organic outline */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-rose-300 to-amber-200 animate-spin-slow opacity-80" />
          
          <div className="relative w-36 h-36 rounded-full overflow-hidden p-1 bg-white dark:bg-zinc-900 shadow-xl">
            <img
              src={candidateData.photoUrl}
              alt={candidateData.name}
              className="w-full h-full object-cover object-top rounded-full bg-amber-50"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/icons/icon.png';
              }}
            />
          </div>

          <div className="absolute top-1 right-2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#18181B] text-amber-300 shadow-md text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>2026</span>
          </div>
        </div>

        <h1 className="text-3xl font-black text-zinc-900 dark:text-white">
          {candidateData.name}
        </h1>
        <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mt-1">
          {candidateData.role[lang]}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          {candidateData.location[lang]}
        </p>

        {/* Party Badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#0047AB]/10 via-[#00A651]/10 to-[#C8102E]/10 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200">
          <Shield className="w-3.5 h-3.5 text-[#0047AB]" />
          <span>{candidateData.party[lang]}</span>
        </div>

        {/* Audio Speech Player */}
        <div className="mt-6">
          <AudioPlayer />
        </div>
      </section>

      {/* Vision Statement Quote */}
      <section className="p-5 rounded-3xl bg-gradient-to-br from-amber-100/60 to-rose-100/40 dark:from-zinc-900 dark:to-zinc-950 border border-amber-200/60 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <span className="text-6xl text-rose-400/20 font-serif absolute -top-4 left-3 select-none">
          “
        </span>
        <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2 relative z-10 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-600" />
          <span>{t('ourVision')}</span>
        </h2>
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed relative z-10">
          {t('visionText')}
        </p>
      </section>

      {/* Engagement for Ain El Turck */}
      <section className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3">
        <h2 className="text-base font-black text-zinc-900 dark:text-white">
          {t('commitment')}
        </h2>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t('commitmentText')}
        </p>

        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
          <p className="text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
            💡 {t('approach')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-3">
        <h2 className="text-base font-black text-zinc-900 dark:text-white">
          {t('ourValues')}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${v.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {v.title}
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <div className="p-5 rounded-3xl bg-[#18181B] text-white text-center shadow-lg space-y-3">
        <h3 className="text-base font-bold">
          {t('joinMovement')}
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed">
          {t('membershipDesc')}
        </p>
        <button
          onClick={() => onNavigate('membership')}
          className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
        >
          <span>{t('joinUs')}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};
