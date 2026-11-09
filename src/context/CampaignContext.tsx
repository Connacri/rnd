import React, { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import type { CandidateInfo, ProgramPillar, NewsArticle, CouncilCandidate, CampaignSettings, MembershipSubmission } from '../types';
import { candidateData as initialCandidate, programPillars as initialPillars, campaignNews as initialNews, defaultCouncilCandidates, defaultCampaignSettings } from '../data/campaignData';
import { firestore } from '../lib/firebase';
import { useAuth } from './AuthContext';

interface CampaignContextType {
  candidate: CandidateInfo; updateCandidate: (data: Partial<CandidateInfo>) => void;
  pillars: ProgramPillar[]; updatePillar: (id: string, updated: Partial<ProgramPillar>) => void;
  addPillarAction: (pillarId: string, actionText: string) => void; deletePillarAction: (pillarId: string, actionIndex: number) => void;
  news: NewsArticle[]; addNews: (article: Omit<NewsArticle, 'id'>) => void; deleteNews: (id: string) => void;
  councilCandidates: CouncilCandidate[]; addCouncilCandidate: (cand: Omit<CouncilCandidate, 'id'>) => void;
  updateCouncilCandidate: (id: string, cand: Partial<CouncilCandidate>) => void; deleteCouncilCandidate: (id: string) => void;
  settings: CampaignSettings; updateSettings: (newSettings: Partial<CampaignSettings>) => void;
  submissions: MembershipSubmission[]; addSubmission: (sub: Omit<MembershipSubmission, 'id' | 'submittedAt'>) => Promise<void>;
  deleteSubmission: (id: string) => void; resetToDefault: () => void;
}
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Keep the committed programme as the baseline while preserving any additional
// content already maintained in Firestore by the campaign administrators.
const mergePillarWithDefaults = (defaults: ProgramPillar, remote: ProgramPillar): ProgramPillar => {
  const mergeItems = (language: 'fr' | 'ar' | 'en') => {
    const baseline = defaults.items?.[language] || defaults.items?.fr || [];
    const stored = remote.items?.[language] || [];
    return [...new Set([...baseline, ...stored])];
  };

  return {
    ...defaults,
    ...remote,
    id: defaults.id,
    items: {
      fr: mergeItems('fr'),
      ar: mergeItems('ar'),
      en: mergeItems('en'),
    },
  };
};

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin } = useAuth();
  const [candidate, setCandidate] = useState<CandidateInfo>(initialCandidate);
  const [pillars, setPillars] = useState<ProgramPillar[]>(initialPillars);
  const [news, setNews] = useState<NewsArticle[]>(initialNews);
  const [councilCandidates, setCouncilCandidates] = useState<CouncilCandidate[]>(defaultCouncilCandidates);
  const [settings, setSettings] = useState<CampaignSettings>(defaultCampaignSettings);
  const [submissions, setSubmissions] = useState<MembershipSubmission[]>([]);

  useEffect(() => {
    const unsubscribers = [
      onSnapshot(doc(firestore, 'siteContent', 'candidate'), snap => { if (snap.exists()) setCandidate(snap.data() as CandidateInfo); }),
      onSnapshot(doc(firestore, 'siteContent', 'settings'), snap => { if (snap.exists()) setSettings({ ...defaultCampaignSettings, ...snap.data() } as CampaignSettings); }),
      onSnapshot(collection(firestore, 'programPillars'), snap => {
        const storedPillars = new Map(snap.docs.map(d => [d.id, { ...d.data(), id: d.id } as ProgramPillar]));

        // Publish the eight committed domains to Firestore when an administrator
        // opens the app. Only missing documents are created: existing admin-edited
        // content is preserved and merged with the committed commitments below.
        if (isAdmin) {
          initialPillars.forEach(defaultPillar => {
            if (!storedPillars.has(defaultPillar.id)) {
              void setDoc(doc(firestore, 'programPillars', defaultPillar.id), defaultPillar)
                .catch(error => console.error(`Unable to seed programme domain ${defaultPillar.id}:`, error));
            }
          });
        }

        const mergedPillars = initialPillars.map(defaultPillar => {
          const stored = storedPillars.get(defaultPillar.id);
          return stored ? mergePillarWithDefaults(defaultPillar, stored) : defaultPillar;
        });
        const legacyPillarIds = new Set(["p1", "p2", "p3", "p4", "p5", "p6"]);
        const additionalPillars = [...storedPillars.values()].filter(stored => !initialPillars.some(item => item.id === stored.id) && !legacyPillarIds.has(stored.id));
        setPillars([...mergedPillars, ...additionalPillars].sort((a,b) => a.number.localeCompare(b.number)));
      }),
      onSnapshot(collection(firestore, 'campaignNews'), snap => setNews(snap.empty ? initialNews : snap.docs.map(d => ({ ...d.data(), id: d.id }) as NewsArticle).sort((a,b) => b.date.localeCompare(a.date)))),
      onSnapshot(collection(firestore, 'councilCandidates'), snap => { if (!snap.empty) setCouncilCandidates(snap.docs.map(d => ({ ...d.data(), id: d.id }) as CouncilCandidate).sort((a,b) => a.order-b.order)); }),
    ];
    if (isAdmin) {
      unsubscribers.push(onSnapshot(collection(firestore, 'membershipSubmissions'), snap => setSubmissions(snap.docs.map(d => { const v=d.data(); return { ...v, id:d.id, submittedAt:v.submittedAt?.toDate ? v.submittedAt.toDate().toISOString() : v.submittedAt } as MembershipSubmission; }).sort((a,b) => b.submittedAt.localeCompare(a.submittedAt)))));
    } else {
      setSubmissions([]);
    }
    return () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }, [isAdmin]);

  const updateCandidate = (data: Partial<CandidateInfo>) => {
    setCandidate(prev => { const next={...prev,...data}; void setDoc(doc(firestore,'siteContent','candidate'),next,{merge:true}); return next; });
  };
  const updatePillar = (id: string, updated: Partial<ProgramPillar>) => {
    setPillars(prev => { const next=prev.map(p=>p.id===id?{...p,...updated}:p); const item=next.find(p=>p.id===id); if(item) void setDoc(doc(firestore,'programPillars',id),item); return next; });
  };
  const addPillarAction = (pillarId: string, actionText: string) => {
    if (!actionText.trim()) return;
    setPillars(prev => { const next=prev.map(p=>p.id!==pillarId?p:{...p,items:{fr:[...p.items.fr,actionText.trim()],ar:[...(p.items.ar||p.items.fr),actionText.trim()],en:[...(p.items.en||p.items.fr),actionText.trim()]}}); const item=next.find(p=>p.id===pillarId); if(item) void setDoc(doc(firestore,'programPillars',pillarId),item); return next; });
  };
  const deletePillarAction = (pillarId: string, actionIndex: number) => {
    setPillars(prev => { const next=prev.map(p=>p.id!==pillarId?p:{...p,items:{fr:p.items.fr.filter((_,i)=>i!==actionIndex),ar:(p.items.ar||[]).filter((_,i)=>i!==actionIndex),en:(p.items.en||[]).filter((_,i)=>i!==actionIndex)}}); const item=next.find(p=>p.id===pillarId); if(item) void setDoc(doc(firestore,'programPillars',pillarId),item); return next; });
  };
  const addNews = (article: Omit<NewsArticle,'id'>) => { const id=crypto.randomUUID(); const item={...article,id}; setNews(prev=>[item,...prev]); void setDoc(doc(firestore,'campaignNews',id),item); };
  const deleteNews = (id: string) => { setNews(prev=>prev.filter(n=>n.id!==id)); void deleteDoc(doc(firestore,'campaignNews',id)); };
  const addCouncilCandidate = (cand: Omit<CouncilCandidate,'id'>) => { const id=crypto.randomUUID(); const item={...cand,id}; setCouncilCandidates(prev=>[...prev,item]); void setDoc(doc(firestore,'councilCandidates',id),item); };
  const updateCouncilCandidate = (id: string, cand: Partial<CouncilCandidate>) => { setCouncilCandidates(prev=>{ const next=prev.map(c=>c.id===id?{...c,...cand}:c); const item=next.find(c=>c.id===id); if(item) void updateDoc(doc(firestore,'councilCandidates',id),cand); return next; }); };
  const deleteCouncilCandidate = (id: string) => { setCouncilCandidates(prev=>prev.filter(c=>c.id!==id)); void deleteDoc(doc(firestore,'councilCandidates',id)); };
  const updateSettings = (data: Partial<CampaignSettings>) => { setSettings(prev=>{ const next={...prev,...data}; void setDoc(doc(firestore,'siteContent','settings'),next,{merge:true}); return next; }); };
  const addSubmission = async (sub: Omit<MembershipSubmission,'id'|'submittedAt'>) => {
    const clean = Object.fromEntries(Object.entries(sub).filter(([, value]) => value !== undefined && value !== null));
    await addDoc(collection(firestore,'membershipSubmissions'),{...clean,submittedAt:serverTimestamp()});
  };
  const deleteSubmission = (id: string) => { setSubmissions(prev=>prev.filter(s=>s.id!==id)); void deleteDoc(doc(firestore,'membershipSubmissions',id)); };
  const resetToDefault = () => {
    setCandidate(initialCandidate); setPillars(initialPillars); setNews(initialNews); setCouncilCandidates(defaultCouncilCandidates); setSettings(defaultCampaignSettings);
    void setDoc(doc(firestore,'siteContent','candidate'),initialCandidate);
    void setDoc(doc(firestore,'siteContent','settings'),defaultCampaignSettings);
    initialPillars.forEach(item=>void setDoc(doc(firestore,'programPillars',item.id),item));
    initialNews.forEach(item=>void setDoc(doc(firestore,'campaignNews',item.id),item));
    defaultCouncilCandidates.forEach(item=>void setDoc(doc(firestore,'councilCandidates',item.id),item));
  };

  return <CampaignContext.Provider value={{candidate,updateCandidate,pillars,updatePillar,addPillarAction,deletePillarAction,news,addNews,deleteNews,councilCandidates,addCouncilCandidate,updateCouncilCandidate,deleteCouncilCandidate,settings,updateSettings,submissions,addSubmission,deleteSubmission,resetToDefault}}>{children}</CampaignContext.Provider>;
};
export const useCampaign = () => { const context=useContext(CampaignContext); if(!context) throw new Error('useCampaign must be used within a CampaignProvider'); return context; };
