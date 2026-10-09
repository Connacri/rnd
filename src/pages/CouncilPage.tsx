import React, { useState } from 'react';
import { Users, Award, ShieldCheck, Mail, Phone, Sparkles, Filter, ChevronRight, MessageSquare, ArrowRight } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { useLanguage } from '../i18n/LanguageContext';
import { CouncilCandidate } from '../types';

interface CouncilPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const CouncilPage: React.FC<CouncilPageProps> = ({ onNavigate }) => {
  const { councilCandidates, candidate } = useCampaign();
  const { lang, t, isRtl } = useLanguage();

  const [selectedCommission, setSelectedCommission] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<CouncilCandidate | null>(null);

  const commissions = [
    { id: 'all', label: 'Toutes les compétences' },
    { id: 'Urbanisme', label: 'Urbanisme & Littoral' },
    { id: 'Santé', label: 'Santé & Social' },
    { id: 'Tourisme', label: 'Tourisme & Économie' },
    { id: 'Numérique', label: 'Numérique & Jeunesse' },
  ];

  const filteredCandidates = selectedCommission === 'all'
    ? councilCandidates
    : councilCandidates.filter((c) => c.commission.toLowerCase().includes(selectedCommission.toLowerCase()));

  return (
    <div className="max-w-xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-10 pb-24 md:pb-16">
      {/* Header Banner */}
      <section className="text-center relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-200/90 dark:border-zinc-700 shadow-xs text-amber-900 dark:text-amber-300 text-xs font-bold mb-3">
          <img src="assets/icons/icon.png" alt="RND" className="w-4 h-4 rounded-full object-contain" />
          <span>Élections Communales 2026 • Liste RND</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
          Nos Candidats au Conseil Communal
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl mx-auto">
          Une équipe de compétences avérées, d'experts du terrain et de citoyens dévoués pour métamorphoser et gouverner avec rigueur la commune d'Aïn El Turck.
        </p>

        {/* Tête de liste endorsement pill */}
        <div className="mt-4 inline-flex items-center gap-2.5 p-2 pr-4 rounded-full bg-amber-50 dark:bg-zinc-800/80 border border-amber-200/70 dark:border-zinc-700 shadow-xs">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="w-7 h-7 rounded-full object-cover border border-amber-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
            }}
          />
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Liste conduite par {candidate.name}
          </span>
        </div>
      </section>

      {/* Commission Filter Pills */}
      <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 md:mx-0 md:flex-wrap">
        {commissions.map((comm) => (
          <button
            key={comm.id}
            onClick={() => setSelectedCommission(comm.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[38px] ${
              selectedCommission === comm.id
                ? 'bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700 hover:border-zinc-400'
            }`}
          >
            {comm.label}
          </button>
        ))}
      </div>

      {/* Responsive Grid of Council Experts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className="p-5 sm:p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              {/* Header Profile with Avatar & Expertise */}
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-400 to-rose-400 flex-shrink-0 shadow-md">
                  <img
                    src={cand.photoUrl}
                    alt={cand.name}
                    className="w-full h-full object-cover rounded-[14px] sm:rounded-[22px] bg-amber-50"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'assets/icons/icon.png';
                    }}
                  />
                  <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
                      {cand.role}
                    </span>
                    <span className="text-xs font-bold text-zinc-400">
                      #{cand.order}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white leading-tight">
                    {cand.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
                    <Award className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{cand.expertise}</span>
                  </div>
                </div>
              </div>

              {/* Commission badge */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{cand.commission}</span>
                </span>
              </div>

              {/* Bio & vision */}
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {cand.bio}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-zinc-400 font-medium">
                {cand.email || 'Permanence RND Ain El Turck'}
              </span>

              <button
                onClick={() => onNavigate('membership')}
                className="px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-zinc-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-1 transition min-h-[36px]"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Échanger / Proposer</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="p-6 sm:p-8 rounded-[36px] bg-[#18181B] text-white text-center shadow-xl space-y-3 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-1">
          <img src="assets/icons/icon.png" alt="RND" className="w-7 h-7 object-contain" />
        </div>
        <h2 className="text-base sm:text-xl font-bold">
          Vous souhaitez rejoindre la liste ou apporter votre expertise ?
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg mx-auto">
          Le Bureau Communal du RND est ouvert à toutes les compétences citoyennes d'Aïn El Turck désireuses de s'investir pour l'intérêt général.
        </p>
        <button
          onClick={() => onNavigate('membership')}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-zinc-950 font-bold text-xs sm:text-sm active:scale-95 transition inline-flex items-center gap-2 min-h-[44px]"
        >
          <span>Soumettre ma candidature citoyenne</span>
          <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
        </button>
      </section>
    </div>
  );
};
