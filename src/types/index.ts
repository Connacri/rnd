export type Language = 'fr' | 'ar' | 'en';

export interface LocalizedString {
  fr: string;
  ar: string;
  en: string;
}

export interface ProgramPillar {
  id: string;
  number: string;
  icon: string;
  accentColor: string;
  bgLight: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  tag: LocalizedString;
  items: {
    fr: string[];
    ar: string[];
    en: string[];
  };
}

export interface CandidateInfo {
  name: string;
  photoUrl: string;
  role: LocalizedString;
  party: LocalizedString;
  location: LocalizedString;
  biography: LocalizedString;
}

export interface CampaignStat {
  icon: string;
  number: string;
  label: LocalizedString;
}

export interface CampaignEvent {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  location: LocalizedString;
  date: string; // ISO date string
  tag?: LocalizedString;
}

export interface NewsArticle {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
  date: string;
  tag?: LocalizedString;
}

export interface MembershipSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  age?: string;
  profession?: string;
  address?: string;
  message?: string;
  suggestion?: string;
  submittedAt: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
}

export interface CouncilCandidate {
  id: string;
  name: string;
  photoUrl: string;
  expertise: string; // Titre de l'expert (ex: Ingénieur Urbaniste, Médecin Spécialiste, Économiste...)
  role: string; // Rôle dans la liste électorale
  commission: string; // Commission communale (Urbanisme, Tourisme, Social...)
  bio: string;
  order: number;
  phone?: string;
  email?: string;
}

export interface CampaignSettings {
  recipientEmail: string;
  secondaryEmail?: string;
  contactPhone?: string;
  officeAddress?: string;
  sloganText?: string;
}
