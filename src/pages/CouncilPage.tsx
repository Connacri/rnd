import React, { useEffect, useMemo, useState } from 'react';
import { Users, Award, ShieldCheck, Sparkles, UserRound, ArrowRight, RefreshCw } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { useLanguage } from '../i18n/LanguageContext';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { ShareButton } from '../components/ShareButton';

interface CouncilPageProps {
  onNavigate: (page: string, params?: any) => void;
}

type LocalizedProfileValue = string | Record<string, string> | null;
interface PublishedCandidateProfile {
  id: string;
  name: string;
  photo_url: string | null;
  candidate_number: number | null;
  profession: LocalizedProfileValue;
  education_level: LocalizedProfileValue;
  diplomas: LocalizedProfileValue;
  experience: LocalizedProfileValue;
  skills: LocalizedProfileValue;
  motivation: LocalizedProfileValue;
}

const profileText = (value: LocalizedProfileValue, lang: string): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.fr || value.ar || value.en || Object.values(value).find(Boolean) || '';
};

export const CouncilPage: React.FC<CouncilPageProps> = ({ onNavigate }) => {
  const { candidate } = useCampaign();
  const { lang, t, isRtl } = useLanguage();
  const [profiles, setProfiles] = useState<PublishedCandidateProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadProfiles = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const snapshot = await getDocs(query(
        collection(firestore, 'publishedCandidates'),
        orderBy('candidate_number', 'asc'),
        orderBy('submitted_at', 'asc'),
      ));
      setProfiles(snapshot.docs.map(item => ({ id: item.id, ...item.data() })) as PublishedCandidateProfile[]);
    } catch (error) {
      console.error('Firebase candidate profiles could not be loaded:', error);
      setLoadError(lang === 'ar' ? 'تعذر تحميل ملفات المترشحين. يرجى المحاولة مجدداً.' : lang === 'en' ? 'Candidate profiles could not be loaded. Please try again.' : 'Impossible de charger les profils des candidats. Veuillez réessayer.');
      setProfiles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadProfiles();
  }, [lang]);

  const pageTitle = lang === 'ar' ? 'المترشحين' : lang === 'en' ? 'Candidates' : 'Les candidats';
  const pageDescription = lang === 'ar'
    ? 'اكتشفوا المترشحين الذين أرسلوا ملفاتهم وتمت المصادقة عليها ونشرها من طرف المكتب.'
    : lang === 'en'
      ? 'Meet candidates who submitted their profiles and were approved for publication.'
      : 'Découvrez les personnes ayant réellement soumis leur profil et dont la candidature a été approuvée et publiée par le bureau.';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="max-w-xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-10 pb-24 md:pb-16">
      <section className="text-center relative space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-green-200 dark:border-zinc-700 shadow-xs text-green-800 dark:text-green-300 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'ar' ? 'القائمة البلدية • 2026' : 'Élections Communales 2026 • Liste RND'}</span>
        </div>
        <h1 className="text-xl sm:text-4xl leading-tight break-words px-1 font-black text-zinc-900 dark:text-white tracking-tight">{pageTitle}</h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">{pageDescription}</p>
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300 text-xs font-bold">
          <Users className="w-4 h-4" />
          <span>{profiles.length} {lang === 'ar' ? 'ملف منشور' : lang === 'en' ? 'published profiles' : 'profils publiés'}</span>
        </div>
        <div className="flex justify-center">
          <ShareButton variant="pill" size="sm" title={pageTitle + ' — RND Aïn El Turck'} text={pageDescription} label={t('share')} />
        </div>
      </section>

      {loadError && (
        <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 dark:bg-rose-950/30 dark:border-rose-900 p-4 text-sm text-rose-700 dark:text-rose-300 flex flex-wrap items-center justify-between gap-3">
          <span>{loadError}</span>
          <button type="button" onClick={() => void loadProfiles()} className="inline-flex items-center gap-2 min-h-11 px-3 rounded-xl border border-rose-300 font-bold"><RefreshCw className="w-4 h-4" />{lang === 'ar' ? 'إعادة المحاولة' : 'Réessayer'}</button>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" aria-label="Chargement des profils">
          {[0,1,2,3].map(i => <div key={i} className="h-56 rounded-3xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />)}
        </div>
      ) : profiles.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-12 text-center space-y-3">
          <UserRound className="w-12 h-12 mx-auto text-zinc-400" />
          <h2 className="font-black text-zinc-900 dark:text-white">{lang === 'ar' ? 'لا توجد ملفات مترشحين منشورة حالياً' : lang === 'en' ? 'No candidate profiles published yet' : 'Aucun profil de candidat publié pour le moment'}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">{lang === 'ar' ? 'ستظهر هنا الملفات الحقيقية بعد إرسالها ومراجعتها والموافقة على نشرها.' : lang === 'en' ? 'Real profiles will appear here after submission, review and approval for publication.' : 'Les vrais profils apparaîtront ici après leur soumission, leur examen et leur approbation pour publication.'}</p>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {profiles.map(profile => {
            const profession = profileText(profile.profession, lang);
            const education = profileText(profile.education_level, lang);
            const diplomas = profileText(profile.diplomas, lang);
            const experience = profileText(profile.experience, lang);
            const skills = profileText(profile.skills, lang);
            const motivation = profileText(profile.motivation, lang);
            return (
              <article key={profile.id} className="min-w-0 p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  {profile.photo_url ? <img src={profile.photo_url} alt={profile.name} loading="lazy" className="w-20 h-20 rounded-2xl object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0" /> : <div className="w-20 h-20 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center shrink-0"><UserRound className="w-8 h-8 text-green-700 dark:text-green-300" /></div>}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-950/50 px-2 py-1 rounded-full">{lang === 'ar' ? 'مترشح مصادق عليه' : lang === 'en' ? 'Approved candidate' : 'Candidature approuvée'}</span>
                      {profile.candidate_number != null && <span className="text-xs font-bold text-zinc-400">N° {profile.candidate_number}</span>}
                    </div>
                    <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white break-words">{profile.name}</h2>
                    {profession && <p className="mt-1 text-sm font-bold text-green-800 dark:text-green-300">{profession}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {[
                    [lang === 'ar' ? 'المستوى الدراسي' : lang === 'en' ? 'Education' : 'Niveau d’études', education],
                    [lang === 'ar' ? 'الشهادات' : lang === 'en' ? 'Diplomas' : 'Diplômes', diplomas],
                    [lang === 'ar' ? 'الخبرة' : lang === 'en' ? 'Experience' : 'Expérience', experience],
                  ].filter(([, value]) => value).map(([label, value]) => <div key={label} className="min-w-0"><p className="text-[11px] font-bold text-zinc-400">{label}</p><p className="mt-0.5 text-zinc-700 dark:text-zinc-300 break-words">{value}</p></div>)}
                </div>
                {skills && <div className="rounded-2xl bg-green-50/80 dark:bg-green-950/30 p-3"><p className="text-[11px] font-bold text-green-800 dark:text-green-300 flex items-center gap-1.5 mb-1"><Sparkles className="w-3.5 h-3.5" />{lang === 'ar' ? 'الكفاءات والمهارات' : lang === 'en' ? 'Skills & expertise' : 'Compétences et savoir-faire'}</p><p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-line break-words">{skills}</p></div>}
                {motivation && <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line break-words">{motivation}</p>}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <ShareButton variant="pill" size="sm" title={profile.name + ' — RND Aïn El Turck'} text={[profile.name, profession, skills].filter(Boolean).join(' • ')} label={t('shareProfile')} />
                </div>
              </article>
            );
          })}
        </div>
      )}


    </div>
  );
};
