import React, { useState } from 'react';
import { Send, CheckCircle2, UserCheck, AlertCircle, Heart, Sparkles, MessageSquare, Mail, Phone, MapPin, Building, ShieldCheck, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';
import { MembershipSubmission } from '../types';

export const MembershipPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { settings, addSubmission, submissions } = useCampaign();

  const [subjectType, setSubjectType] = useState<string>('membership');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    neighborhood: 'Centre-ville',
    age: '',
    profession: '',
    address: '',
    message: '',
    suggestion: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');

  const neighborhoods = [
    'Centre-ville (Ain El Turck)',
    'Bouisseville',
    'Trouville',
    'Clairefontaine',
    'Cap Falcon',
    'Paradis Plage',
    'Dunes / Les Ondines',
    'Autre secteur',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('nomRequired');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('emailInvalid');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('phoneRequired');
    } else if (formData.phone.trim().replace(/\D/g, '').length < 8) {
      newErrors.phone = 'Numéro de téléphone incomplet (au moins 8 chiffres)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const submissionData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age.trim() || undefined,
      profession: formData.profession.trim() || undefined,
      address: `${formData.neighborhood}${formData.address ? ' - ' + formData.address.trim() : ''}`,
      message: `[Objet: ${
        subjectType === 'membership'
          ? 'Adhésion au RND'
          : subjectType === 'question'
          ? 'Question aux candidats'
          : 'Proposition citoyenne'
      }] ${formData.message.trim()}`,
      suggestion: formData.suggestion.trim() || undefined,
    };

    addSubmission(submissionData);

    const refId = 'RND-' + Date.now().toString(36).toUpperCase();
    setLastSubmittedId(refId);

    setIsSubmitting(false);
    setShowSuccessModal(true);

    // Reset optional fields
    setFormData((prev) => ({
      ...prev,
      phone: '',
      age: '',
      profession: '',
      address: '',
      message: '',
      suggestion: '',
    }));
  };

  return (
    <div className="max-w-xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 pb-24 md:pb-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-amber-200/90 dark:border-zinc-700 shadow-xs text-rose-700 dark:text-rose-300 text-xs font-bold mb-3">
          <img src="/assets/icons/icon.png" alt="RND" className="w-4 h-4 rounded-full object-contain" />
          <span>Permanence Citoyenne & Adhésion RND</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          Contact, Adhésion & Propositions
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-lg mx-auto">
          Votre voix compte pour Aïn El Turck. Envoyez votre message directement au Bureau Communal du RND et à l'équipe de campagne de Zenasni Nabil.
        </p>
      </div>

      {/* Recipient Email & Bureau Info Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/90 dark:bg-zinc-900 border border-amber-200/80 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-zinc-950 flex items-center justify-center font-bold flex-shrink-0 shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                Email officiel de réception :
              </span>
              <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                {settings.recipientEmail}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Permanence : {settings.officeAddress || 'Boulevard de la Corniche, Aïn El Turck'} • {settings.contactPhone}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold self-end sm:self-center">
          Réception garantie ✓
        </span>
      </div>

      {/* Subject Selector Tabs */}
      <div className="flex items-center justify-center gap-2">
        {[
          { id: 'membership', label: 'Adhésion au RND' },
          { id: 'proposal', label: 'Proposition pour mon quartier' },
          { id: 'question', label: 'Message / Question' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSubjectType(tab.id)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[38px] ${
              subjectType === tab.id
                ? 'bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 shadow-sm scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-8 rounded-[36px] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4 sm:space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {t('nom')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder={t('namePlaceholder')}
              className={`w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border ${
                errors.fullName ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
              } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]`}
            />
            {errors.fullName && (
              <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {t('emailField')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t('emailPlaceholder')}
              className={`w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border ${
                errors.email ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
              } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]`}
            />
            {errors.email && (
              <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              {t('phoneField')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t('phonePlaceholder')}
              className={`w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border ${
                errors.phone ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
              } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400 min-h-[44px]`}
            />
            {errors.phone && (
              <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Neighborhood in Ain El Turck */}
          <div>
            <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
              Quartier / Secteur à Aïn El Turck
            </label>
            <select
              value={formData.neighborhood}
              onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
              className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 min-h-[44px]"
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Age & Profession */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t('ageOptional')}
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder={t('agePlaceholder')}
              className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t('professionOptional')}
            </label>
            <input
              type="text"
              value={formData.profession}
              onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
              placeholder={t('professionPlaceholder')}
              className="w-full px-3.5 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 min-h-[44px]"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            {subjectType === 'membership'
              ? 'Motivation / Pourquoi souhaitez-vous rejoindre le RND ?'
              : 'Votre message ou question'}
          </label>
          <textarea
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={t('messagePlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Suggestion / Idea for Ain El Turck */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            <span>Votre idée ou proposition prioritaire pour Aïn El Turck (optionnel) :</span>
          </label>
          <textarea
            rows={2}
            value={formData.suggestion}
            onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
            placeholder="Ex: Aménagement d'un espace vert pour enfants à Cap Falcon..."
            className="w-full px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-50 min-h-[48px]"
        >
          {isSubmitting ? (
            <span>Envoi sécurisé en cours...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer ma demande au Bureau Communal RND</span>
            </>
          )}
        </button>
      </form>

      {/* ================= SUCCESS MODAL DIALOG ================= */}
      {showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowSuccessModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm sm:max-w-md rounded-[32px] sm:rounded-[36px] bg-[#FAF7F2] dark:bg-[#1A1816] p-6 sm:p-8 text-center border border-amber-200/80 dark:border-zinc-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-sm">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
              <img
                src="/assets/icons/icon.png"
                alt="RND"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                Réf: {lastSubmittedId}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-zinc-900 dark:text-white">
                Message & Adhésion Reçus avec Succès !
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Votre formulaire a été instantanément transmis à la boîte de réception officielle du Bureau Communal RND :{' '}
              <strong className="text-zinc-900 dark:text-white">{settings.recipientEmail}</strong>. Notre équipe vous contactera dans les plus brefs délais.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs sm:text-sm hover:opacity-90 active:scale-95 transition min-h-[44px]"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
