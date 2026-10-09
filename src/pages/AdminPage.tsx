import React, { useState } from 'react';
import {
  ShieldCheck,
  Mail,
  Users,
  Newspaper,
  BookOpen,
  User,
  Inbox,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Eye,
  RefreshCw,
  Phone,
  MapPin,
  Briefcase
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { CouncilCandidate } from '../types';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const {
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
    deleteCouncilCandidate,
    settings,
    updateSettings,
    submissions,
    deleteSubmission,
    resetToDefault,
  } = useCampaign();

  const { user, isAdmin, toggleAdminRole } = useAuth();
  const { lang, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'settings' | 'council' | 'news' | 'pillars' | 'candidate' | 'inbox'>('council');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    recipientEmail: settings.recipientEmail || '',
    secondaryEmail: settings.secondaryEmail || '',
    contactPhone: settings.contactPhone || '',
    officeAddress: settings.officeAddress || '',
    sloganText: settings.sloganText || '',
  });

  // Candidate editor state
  const [candidateForm, setCandidateForm] = useState({
    name: candidate.name,
    photoUrl: candidate.photoUrl,
    roleFr: candidate.role.fr,
    biographyFr: candidate.biography.fr,
  });

  // Council candidate form state
  const [councilForm, setCouncilForm] = useState({
    name: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    expertise: '',
    role: 'Candidat au Conseil Communal',
    commission: 'Commission Urbanisme & Aménagement Côtier',
    bio: '',
    email: '',
    phone: '',
  });

  // News form state
  const [newsForm, setNewsForm] = useState({
    titleFr: '',
    tagFr: 'Actualité RND',
    date: new Date().toISOString().split('T')[0],
    bodyFr: '',
  });

  // Pillar editor state
  const [selectedPillarId, setSelectedPillarId] = useState<string>(pillars[0]?.id || 'p1');
  const [newActionText, setNewActionText] = useState('');

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('Paramètres et emails de réception enregistrés avec succès !');
  };

  const handleSaveCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidate({
      name: candidateForm.name,
      photoUrl: candidateForm.photoUrl,
      role: { ...candidate.role, fr: candidateForm.roleFr },
      biography: { ...candidate.biography, fr: candidateForm.biographyFr },
    });
    showToast('Profil du candidat tête de liste mis à jour !');
  };

  const handleAddCouncilCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!councilForm.name || !councilForm.expertise) {
      alert('Veuillez renseigner au moins le nom et l\'expertise du candidat');
      return;
    }

    addCouncilCandidate({
      name: councilForm.name.trim(),
      photoUrl: councilForm.photoUrl.trim(),
      expertise: councilForm.expertise.trim(),
      role: councilForm.role.trim(),
      commission: councilForm.commission.trim(),
      bio: councilForm.bio.trim() || `Expert engagé pour le développement durable d'Aïn El Turck.`,
      order: councilCandidates.length + 1,
      email: councilForm.email.trim() || undefined,
      phone: councilForm.phone.trim() || undefined,
    });

    setCouncilForm({
      name: '',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      expertise: '',
      role: 'Candidat au Conseil Communal',
      commission: 'Commission Urbanisme & Aménagement Côtier',
      bio: '',
      email: '',
      phone: '',
    });

    showToast('Nouveau membre expert ajouté à la liste électorale !');
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.titleFr || !newsForm.bodyFr) return;

    addNews({
      title: { fr: newsForm.titleFr, ar: newsForm.titleFr, en: newsForm.titleFr },
      body: { fr: newsForm.bodyFr, ar: newsForm.bodyFr, en: newsForm.bodyFr },
      date: newsForm.date,
      tag: { fr: newsForm.tagFr, ar: newsForm.tagFr, en: newsForm.tagFr },
    });

    setNewsForm({
      titleFr: '',
      tagFr: 'Actualité RND',
      date: new Date().toISOString().split('T')[0],
      bodyFr: '',
    });

    showToast('Nouvel article de campagne publié avec succès !');
  };

  const handleAddAction = (pillarId: string) => {
    if (!newActionText.trim()) return;
    addPillarAction(pillarId, newActionText.trim());
    setNewActionText('');
    showToast('Nouvelle action ajoutée au programme !');
  };

  const currentSelectedPillar = pillars.find((p) => p.id === selectedPillarId) || pillars[0];

  const presetPhotos = [
    { label: 'Homme 1', url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Femme 1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
    { label: 'Homme 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'Homme 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
    { label: 'Femme 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { label: 'RND Logo', url: '/assets/icons/icon.png' },
  ];

  return (
    <div className="max-w-xl md:max-w-5xl lg:max-w-6xl mx-auto px-4 py-4 sm:py-8 space-y-6 pb-28 md:pb-16">
      {/* Top Banner Header */}
      <div className="p-5 sm:p-7 rounded-[32px] bg-[#18181B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-300/20">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight">
                Panneau d'Administration RND
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-zinc-950">
                ADMIN
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Gestion de campagne • Aïn El Turck 2026 • {user?.email || 'Secrétariat Communal'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 min-h-[38px]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Voir le site</span>
          </button>
          <button
            onClick={resetToDefault}
            title="Réinitialiser toutes les données aux valeurs d'origine"
            className="px-3.5 py-2 rounded-full bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 min-h-[38px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 md:mx-0 md:flex-wrap">
        {[
          { id: 'council', label: 'Candidats Conseil (Experts)', icon: Users, count: councilCandidates.length },
          { id: 'settings', label: 'Emails de Réception & Contact', icon: Mail },
          { id: 'news', label: 'Actualités & Communiqués', icon: Newspaper, count: news.length },
          { id: 'pillars', label: 'Programme & Piliers', icon: BookOpen },
          { id: 'candidate', label: 'Tête de Liste (Zenasni)', icon: User },
          { id: 'inbox', label: 'Boîte de Réception', icon: Inbox, count: submissions.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all min-h-[42px] ${
                isActive
                  ? 'bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 shadow-md scale-[1.02]'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700 hover:border-zinc-400'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-amber-400 text-zinc-950'
                      : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: CONSEIL COMMUNAL (EXPERTS) ================= */}
      {activeTab === 'council' && (
        <div className="space-y-6">
          {/* Add candidate form */}
          <form
            onSubmit={handleAddCouncilCandidate}
            className="p-5 sm:p-7 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <Users className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                Ajouter un Membre de la Liste du Conseil Communal (Profil Expert)
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Chaque candidat de la liste RND dispose d'un profil valorisant ses compétences professionnelles et son expertise au service de la commune.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Nom et Prénom <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={councilForm.name}
                  onChange={(e) => setCouncilForm({ ...councilForm, name: e.target.value })}
                  placeholder="Ex: Dr. Karima Brahimi"
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-400 min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Titre d'Expertise / Métier <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={councilForm.expertise}
                  onChange={(e) => setCouncilForm({ ...councilForm, expertise: e.target.value })}
                  placeholder="Ex: Architecte Urbaniste & Ingénieur d'État"
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-400 min-h-[42px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Commission Municipale
                </label>
                <select
                  value={councilForm.commission}
                  onChange={(e) => setCouncilForm({ ...councilForm, commission: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
                >
                  <option value="Commission Urbanisme, Voirie & Aménagement Côtier">Urbanisme & Aménagement Côtier</option>
                  <option value="Commission Santé, Hygiène & Affaires Sociales">Santé, Hygiène & Affaires Sociales</option>
                  <option value="Commission Tourisme, Artisanat & Développement Économique">Tourisme & Développement Économique</option>
                  <option value="Commission Numérique, Modernisation de l'APC & Jeunesse">Numérique, Modernisation & Jeunesse</option>
                  <option value="Commission Environnement, Propreté & Espaces Verts">Environnement & Espaces Verts</option>
                  <option value="Commission Finances, Investissements & Marchés Publics">Finances & Investissements</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Rôle sur la liste
                </label>
                <input
                  type="text"
                  value={councilForm.role}
                  onChange={(e) => setCouncilForm({ ...councilForm, role: e.target.value })}
                  placeholder="Ex: Candidate au Conseil Communal"
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
                />
              </div>
            </div>

            {/* Photo URL & Presets */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                URL de la Photo de profil
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  value={councilForm.photoUrl}
                  onChange={(e) => setCouncilForm({ ...councilForm, photoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
                <img
                  src={councilForm.photoUrl}
                  alt="Aperçu"
                  className="w-10 h-10 rounded-full object-cover border border-amber-200 flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/icons/icon.png';
                  }}
                />
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[10px] text-zinc-400">Photos modèles :</span>
                {presetPhotos.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCouncilForm({ ...councilForm, photoUrl: p.url })}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-amber-100 transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Présentation de l'expertise & Engagement citoyen
              </label>
              <textarea
                rows={2}
                value={councilForm.bio}
                onChange={(e) => setCouncilForm({ ...councilForm, bio: e.target.value })}
                placeholder="Décrivez en quelques phrases le parcours, les réalisations et la vision de cet expert pour la commune..."
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-700 dark:text-zinc-300 mb-1">Email de contact (optionnel)</label>
                <input
                  type="email"
                  value={councilForm.email}
                  onChange={(e) => setCouncilForm({ ...councilForm, email: e.target.value })}
                  placeholder="expert@rnd-ainturck.dz"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-700 dark:text-zinc-300 mb-1">Téléphone (optionnel)</label>
                <input
                  type="text"
                  value={councilForm.phone}
                  onChange={(e) => setCouncilForm({ ...councilForm, phone: e.target.value })}
                  placeholder="+213 550 00 00 00"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition min-h-[46px]"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter ce candidat expert à la liste électorale</span>
            </button>
          </form>

          {/* List of existing council members */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center justify-between">
              <span>Candidats Experts inscrits sur la liste ({councilCandidates.length})</span>
              <button
                onClick={() => onNavigate('council')}
                className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Voir la page publique</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {councilCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={cand.photoUrl}
                      alt={cand.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-amber-200/60 dark:border-zinc-700 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/icons/icon.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                          {cand.role}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400">#{cand.order}</span>
                      </div>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white leading-tight">
                        {cand.name}
                      </h4>
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                        {cand.expertise}
                      </p>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-600 dark:text-zinc-300 mt-1 font-medium">
                        {cand.commission}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {cand.bio}
                  </p>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 text-[11px] truncate max-w-[200px]">
                      {cand.email || cand.phone || 'Contact via Bureau RND'}
                    </span>
                    <button
                      onClick={() => deleteCouncilCandidate(cand.id)}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-bold flex items-center gap-1 p-1 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SETTINGS & EMAILS DE RECEPTION ================= */}
      {activeTab === 'settings' && (
        <form
          onSubmit={handleSaveSettings}
          className="p-5 sm:p-7 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-5"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <Mail className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
              Configuration des Emails de Réception & Contact
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Définissez les adresses emails où seront automatiquement transmises toutes les demandes de contact, propositions citoyennes et adhésions au RND Aïn El Turck.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Email Principal de Réception (Contact & Adhésions) <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={settingsForm.recipientEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, recipientEmail: e.target.value })}
                placeholder="contact@rnd-ainturck.dz"
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-400 min-h-[44px]"
              />
              <p className="text-[10px] text-zinc-400 mt-1">Reçoit immédiatement chaque formulaire soumis par un citoyen.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Email Secondaire (Notification du Secrétariat)
              </label>
              <input
                type="email"
                value={settingsForm.secondaryEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, secondaryEmail: e.target.value })}
                placeholder="secretariat.rnd.aet@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white focus:ring-2 focus:ring-amber-400 min-h-[44px]"
              />
              <p className="text-[10px] text-zinc-400 mt-1">Copie d'archivage ou permanence.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Téléphone de la Permanence Électorale
              </label>
              <input
                type="text"
                value={settingsForm.contactPhone}
                onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                placeholder="+213 41 33 55 77"
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Adresse Physique de la Permanence
              </label>
              <input
                type="text"
                value={settingsForm.officeAddress}
                onChange={(e) => setSettingsForm({ ...settingsForm, officeAddress: e.target.value })}
                placeholder="Bureau Communal RND, Boulevard de la Corniche, Aïn El Turck"
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Slogan Officiel de la Campagne
            </label>
            <input
              type="text"
              value={settingsForm.sloganText}
              onChange={(e) => setSettingsForm({ ...settingsForm, sloganText: e.target.value })}
              placeholder="Ensemble pour un Aïn El Turck moderne, prospère et solidaire"
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition min-h-[48px]"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer la configuration de réception</span>
          </button>
        </form>
      )}

      {/* ================= TAB 3: NEWS & ARTICLES ================= */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddNews}
            className="p-5 sm:p-7 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <Newspaper className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                Publier un Nouveau Communiqué / Actualité
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Titre du Communiqué <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newsForm.titleFr}
                  onChange={(e) => setNewsForm({ ...newsForm, titleFr: e.target.value })}
                  placeholder="Ex: Rencontre avec les jeunes et associations sportives..."
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Catégorie / Tag
                </label>
                <input
                  type="text"
                  value={newsForm.tagFr}
                  onChange={(e) => setNewsForm({ ...newsForm, tagFr: e.target.value })}
                  placeholder="Communiqué officiel"
                  className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Contenu de l'article <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={newsForm.bodyFr}
                onChange={(e) => setNewsForm({ ...newsForm, bodyFr: e.target.value })}
                placeholder="Rédigez le texte de l'article qui apparaîtra immédiatement sur la page d'accueil pour tous les citoyens..."
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition min-h-[46px]"
            >
              <Plus className="w-4 h-4" />
              <span>Publier l'actualité</span>
            </button>
          </form>

          {/* Existing news */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Articles et communiqués en ligne ({news.length})
            </h3>
            <div className="space-y-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
                        {item.tag?.[lang] || 'Info'}
                      </span>
                      <span className="text-zinc-400 text-xs">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                      {item.title[lang] || item.title.fr}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                      {item.body[lang] || item.body.fr}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNews(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 rounded-xl transition flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PROGRAMME & ACTIONS ================= */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-7 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                Éditer les Piliers et les Actions du Programme
              </h2>
            </div>

            {/* Select pillar */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                Sélectionner le pilier à modifier :
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pillars.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPillarId(p.id)}
                    className={`p-2.5 rounded-2xl text-left border text-xs font-bold transition ${
                      selectedPillarId === p.id
                        ? 'border-amber-500 bg-amber-50 dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                    }`}
                  >
                    <span className="text-base mr-1">{p.icon}</span>
                    <span>#{p.number} {p.tag.fr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Currently selected pillar details */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Pilier #{currentSelectedPillar.number} : {currentSelectedPillar.title.fr}
                </h3>
                <span className="text-xs text-zinc-400">
                  {currentSelectedPillar.items.fr.length} actions enregistrées
                </span>
              </div>
              <p className="text-xs text-zinc-500">{currentSelectedPillar.subtitle.fr}</p>

              {/* Add action input */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                  Ajouter un nouvel engagement concret à ce pilier :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newActionText}
                    onChange={(e) => setNewActionText(e.target.value)}
                    placeholder="Ex: Raccordement au réseau de fibre optique des écoles de Trouville..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddAction(currentSelectedPillar.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs"
                  >
                    Ajouter
                  </button>
                </div>
              </div>

              {/* List of actions with delete button */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Actions actuelles :
                </h4>
                {currentSelectedPillar.items.fr.map((act, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center justify-between text-xs gap-3"
                  >
                    <span className="flex-1 text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      • {act}
                    </span>
                    <button
                      type="button"
                      onClick={() => deletePillarAction(currentSelectedPillar.id, index)}
                      className="text-rose-500 hover:text-rose-700 p-1 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: CANDIDAT TETE DE LISTE ================= */}
      {activeTab === 'candidate' && (
        <form
          onSubmit={handleSaveCandidate}
          className="p-5 sm:p-7 rounded-[32px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <User className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
              Édition du Candidat Tête de Liste
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                required
                value={candidateForm.name}
                onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
                Rôle politique & communal
              </label>
              <input
                type="text"
                required
                value={candidateForm.roleFr}
                onChange={(e) => setCandidateForm({ ...candidateForm, roleFr: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white min-h-[42px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              URL de la Photo de profil
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={candidateForm.photoUrl}
                onChange={(e) => setCandidateForm({ ...candidateForm, photoUrl: e.target.value })}
                className="flex-1 px-3.5 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
              />
              <img
                src={candidateForm.photoUrl}
                alt="Aperçu"
                className="w-11 h-11 rounded-full object-cover border border-amber-300 flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/icons/icon.png';
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Biographie & Message officiel
            </label>
            <textarea
              rows={4}
              value={candidateForm.biographyFr}
              onChange={(e) => setCandidateForm({ ...candidateForm, biographyFr: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition min-h-[48px]"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les informations de la tête de liste</span>
          </button>
        </form>
      )}

      {/* ================= TAB 6: BOITE DE RECEPTION ================= */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-amber-50/80 dark:bg-zinc-900 border border-amber-200/80 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600" />
                <span>Destination des messages : {settings.recipientEmail}</span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                {submissions.length} messages reçus depuis la plateforme citoyenne
              </p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-center space-y-2">
              <Inbox className="w-10 h-10 text-zinc-300 mx-auto" />
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Aucun message reçu pour le moment
              </p>
              <p className="text-xs text-zinc-400">
                Les formulaires soumis via le site apparaîtront ici immédiatement et seront envoyés à l'email configuré.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                    <div>
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        {sub.fullName}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">({sub.email})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-zinc-400">
                        {new Date(sub.submittedAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => deleteSubmission(sub.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Téléphone</span>
                      <span className="font-semibold">{sub.phone}</span>
                    </div>
                    {sub.profession && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Profession</span>
                        <span className="font-semibold">{sub.profession}</span>
                      </div>
                    )}
                    {sub.age && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Âge</span>
                        <span className="font-semibold">{sub.age} ans</span>
                      </div>
                    )}
                    {sub.address && (
                      <div>
                        <span className="text-zinc-400 block text-[10px]">Quartier / Adresse</span>
                        <span className="font-semibold">{sub.address}</span>
                      </div>
                    )}
                  </div>

                  {sub.message && (
                    <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 text-xs text-zinc-700 dark:text-zinc-300">
                      <span className="font-bold block text-[10px] text-zinc-400 mb-0.5">Message / Motivation :</span>
                      {sub.message}
                    </div>
                  )}

                  {sub.suggestion && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/50 text-xs text-amber-900 dark:text-amber-200">
                      <span className="font-bold block text-[10px] text-amber-700 dark:text-amber-300 mb-0.5">Proposition citoyenne :</span>
                      {sub.suggestion}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
