import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, UserCheck, AlertCircle, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { MembershipSubmission } from '../types';

export const MembershipPage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    age: '',
    profession: '',
    address: '',
    message: '',
    suggestion: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionsList, setSubmissionsList] = useState<MembershipSubmission[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rnd_submissions');
      if (saved) {
        setSubmissionsList(JSON.parse(saved));
      }
    } catch {
      // Ignore parse error
    }
  }, []);

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
    } else if (!/^(\+?213|0)?[567][0-9]{8}$/.test(formData.phone.trim().replace(/\s+/g, '')) && formData.phone.trim().length < 8) {
      newErrors.phone = t('phoneInvalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const newSubmission: MembershipSubmission = {
      id: 'sub_' + Date.now().toString(36),
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age.trim() || undefined,
      profession: formData.profession.trim() || undefined,
      address: formData.address.trim() || undefined,
      message: formData.message.trim() || undefined,
      suggestion: formData.suggestion.trim() || undefined,
      submittedAt: new Date().toISOString(),
    };

    const updated = [newSubmission, ...submissionsList];
    setSubmissionsList(updated);
    localStorage.setItem('rnd_submissions', JSON.stringify(updated));

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
    <div className="max-w-md mx-auto px-4 py-4 space-y-6 pb-24">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-bold mb-2">
          <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
          <span>{t('joinMovement')}</span>
        </div>
        <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
          {t('membershipTitle')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs mx-auto">
          {t('membershipDesc')}
        </p>
      </div>

      {/* User Status Card */}
      <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-zinc-900 border border-amber-200/60 dark:border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-200 dark:bg-zinc-800 flex items-center justify-center text-amber-900 dark:text-amber-200">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {isAuthenticated ? `${t('welcomeUser')}, ${user?.name}` : t('guestBadge')}
            </p>
            <p className="text-[10px] text-zinc-500">
              {isAuthenticated ? user?.email : 'Adhésion ouverte à tous les citoyens'}
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
          2026
        </span>
      </div>

      {/* Membership Form */}
      <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
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
            className={`w-full px-3.5 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border ${
              errors.fullName ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
            } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400`}
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
            className={`w-full px-3.5 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border ${
              errors.email ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
            } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.email && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1">
            {t('phone')} <span className="text-rose-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={t('phonePlaceholder')}
            className={`w-full px-3.5 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border ${
              errors.phone ? 'border-rose-400' : 'border-zinc-200 dark:border-zinc-700'
            } text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400`}
          />
          {errors.phone && (
            <p className="text-[10px] text-rose-500 font-medium mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Age & Profession in 2 Columns */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              {t('ageOptional')}
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder={t('agePlaceholder')}
              className="w-full px-3 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
              className="w-full px-3 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            {t('addressOptional')}
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder={t('addressPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            {t('messageOptional')}
          </label>
          <textarea
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={t('messagePlaceholder')}
            className="w-full px-3.5 py-2 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Suggestion / Idea */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-amber-500" />
            <span>{t('suggestionOptional')}</span>
          </label>
          <textarea
            rows={2}
            value={formData.suggestion}
            onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
            placeholder={t('suggestionPlaceholder')}
            className="w-full px-3.5 py-2 rounded-2xl text-xs bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>{t('submitting')}</span>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>{t('send')}</span>
            </>
          )}
        </button>
      </form>

      {/* Recent Submissions List if user submitted */}
      {submissionsList.length > 0 && (
        <div className="p-4 rounded-3xl bg-zinc-100/70 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800">
          <h2 className="text-xs font-bold text-zinc-600 dark:text-zinc-400 mb-2">
            Vos candidatures soumises ({submissionsList.length})
          </h2>
          <div className="space-y-2">
            {submissionsList.slice(0, 2).map((s) => (
              <div
                key={s.id}
                className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-zinc-900 dark:text-zinc-100">{s.fullName}</p>
                  <p className="text-[10px] text-zinc-500">{new Date(s.submittedAt).toLocaleDateString()}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold text-[10px]">
                  Enregistré ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SUCCESS MODAL DIALOG ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[32px] bg-[#FAF7F2] dark:bg-[#1A1816] p-6 text-center border border-amber-200/80 dark:border-zinc-800 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-lg font-black text-zinc-900 dark:text-white">
              {t('thankYou')}
            </h2>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {t('successMessage')}
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-full bg-[#18181B] dark:bg-white text-white dark:text-zinc-950 font-bold text-xs hover:opacity-90 active:scale-95 transition"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
