import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CandidateInfo,
  ProgramPillar,
  NewsArticle,
  CouncilCandidate,
  CampaignSettings,
  MembershipSubmission
} from '../types';
import {
  candidateData as initialCandidate,
  programPillars as initialPillars,
  campaignNews as initialNews,
  defaultCouncilCandidates,
  defaultCampaignSettings
} from '../data/campaignData';

interface CampaignContextType {
  candidate: CandidateInfo;
  updateCandidate: (data: Partial<CandidateInfo>) => void;

  pillars: ProgramPillar[];
  updatePillar: (id: string, updated: Partial<ProgramPillar>) => void;
  addPillarAction: (pillarId: string, actionText: string) => void;
  deletePillarAction: (pillarId: string, actionIndex: number) => void;

  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  deleteNews: (id: string) => void;

  councilCandidates: CouncilCandidate[];
  addCouncilCandidate: (cand: Omit<CouncilCandidate, 'id'>) => void;
  updateCouncilCandidate: (id: string, cand: Partial<CouncilCandidate>) => void;
  deleteCouncilCandidate: (id: string) => void;

  settings: CampaignSettings;
  updateSettings: (newSettings: Partial<CampaignSettings>) => void;

  submissions: MembershipSubmission[];
  addSubmission: (sub: Omit<MembershipSubmission, 'id' | 'submittedAt'>) => void;
  deleteSubmission: (id: string) => void;

  resetToDefault: () => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load candidate
  const [candidate, setCandidate] = useState<CandidateInfo>(() => {
    try {
      const saved = localStorage.getItem('rnd_candidate');
      return saved ? JSON.parse(saved) : initialCandidate;
    } catch {
      return initialCandidate;
    }
  });

  // Load pillars
  const [pillars, setPillars] = useState<ProgramPillar[]>(() => {
    try {
      const saved = localStorage.getItem('rnd_pillars');
      return saved ? JSON.parse(saved) : initialPillars;
    } catch {
      return initialPillars;
    }
  });

  // Load news
  const [news, setNews] = useState<NewsArticle[]>(() => {
    try {
      const saved = localStorage.getItem('rnd_news');
      return saved ? JSON.parse(saved) : initialNews;
    } catch {
      return initialNews;
    }
  });

  // Load council candidates
  const [councilCandidates, setCouncilCandidates] = useState<CouncilCandidate[]>(() => {
    try {
      const saved = localStorage.getItem('rnd_council_candidates');
      return saved ? JSON.parse(saved) : defaultCouncilCandidates;
    } catch {
      return defaultCouncilCandidates;
    }
  });

  // Load settings
  const [settings, setSettings] = useState<CampaignSettings>(() => {
    try {
      const saved = localStorage.getItem('rnd_settings');
      return saved ? JSON.parse(saved) : defaultCampaignSettings;
    } catch {
      return defaultCampaignSettings;
    }
  });

  // Load submissions
  const [submissions, setSubmissions] = useState<MembershipSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('rnd_submissions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync candidate
  useEffect(() => {
    localStorage.setItem('rnd_candidate', JSON.stringify(candidate));
  }, [candidate]);

  // Sync pillars
  useEffect(() => {
    localStorage.setItem('rnd_pillars', JSON.stringify(pillars));
  }, [pillars]);

  // Sync news
  useEffect(() => {
    localStorage.setItem('rnd_news', JSON.stringify(news));
  }, [news]);

  // Sync council candidates
  useEffect(() => {
    localStorage.setItem('rnd_council_candidates', JSON.stringify(councilCandidates));
  }, [councilCandidates]);

  // Sync settings
  useEffect(() => {
    localStorage.setItem('rnd_settings', JSON.stringify(settings));
  }, [settings]);

  // Sync submissions
  useEffect(() => {
    localStorage.setItem('rnd_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const updateCandidate = (data: Partial<CandidateInfo>) => {
    setCandidate((prev) => ({ ...prev, ...data }));
  };

  const updatePillar = (id: string, updated: Partial<ProgramPillar>) => {
    setPillars((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const addPillarAction = (pillarId: string, actionText: string) => {
    if (!actionText.trim()) return;
    setPillars((prev) =>
      prev.map((p) => {
        if (p.id !== pillarId) return p;
        return {
          ...p,
          items: {
            ...p.items,
            fr: [...p.items.fr, actionText.trim()],
            ar: [...(p.items.ar || p.items.fr), actionText.trim()],
            en: [...(p.items.en || p.items.fr), actionText.trim()],
          },
        };
      })
    );
  };

  const deletePillarAction = (pillarId: string, actionIndex: number) => {
    setPillars((prev) =>
      prev.map((p) => {
        if (p.id !== pillarId) return p;
        return {
          ...p,
          items: {
            ...p.items,
            fr: p.items.fr.filter((_, idx) => idx !== actionIndex),
            ar: (p.items.ar || []).filter((_, idx) => idx !== actionIndex),
            en: (p.items.en || []).filter((_, idx) => idx !== actionIndex),
          },
        };
      })
    );
  };

  const addNews = (article: Omit<NewsArticle, 'id'>) => {
    const newItem: NewsArticle = {
      ...article,
      id: 'news_' + Date.now().toString(36),
    };
    setNews((prev) => [newItem, ...prev]);
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
  };

  const addCouncilCandidate = (cand: Omit<CouncilCandidate, 'id'>) => {
    const newCand: CouncilCandidate = {
      ...cand,
      id: 'cc_' + Date.now().toString(36),
    };
    setCouncilCandidates((prev) => [...prev, newCand]);
  };

  const updateCouncilCandidate = (id: string, cand: Partial<CouncilCandidate>) => {
    setCouncilCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...cand } : c))
    );
  };

  const deleteCouncilCandidate = (id: string) => {
    setCouncilCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const updateSettings = (newSettings: Partial<CampaignSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addSubmission = (sub: Omit<MembershipSubmission, 'id' | 'submittedAt'>) => {
    const newSub: MembershipSubmission = {
      ...sub,
      id: 'sub_' + Date.now().toString(36),
      submittedAt: new Date().toISOString(),
    };
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const deleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
  };

  const resetToDefault = () => {
    setCandidate(initialCandidate);
    setPillars(initialPillars);
    setNews(initialNews);
    setCouncilCandidates(defaultCouncilCandidates);
    setSettings(defaultCampaignSettings);
    localStorage.removeItem('rnd_candidate');
    localStorage.removeItem('rnd_pillars');
    localStorage.removeItem('rnd_news');
    localStorage.removeItem('rnd_council_candidates');
    localStorage.removeItem('rnd_settings');
  };

  return (
    <CampaignContext.Provider
      value={{
        candidate,
        updateCandidate,
        pillars,
        updatePillar,
        addPillarAction,
        deletePillarAction,
        news,
        addNews,
        deleteNews,
        councilCandidates,
        addCouncilCandidate,
        updateCouncilCandidate,
        deleteCouncilCandidate,
        settings,
        updateSettings,
        submissions,
        addSubmission,
        deleteSubmission,
        resetToDefault,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
