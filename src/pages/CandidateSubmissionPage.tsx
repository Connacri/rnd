import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ImagePlus, Loader2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabaseClient';

interface CandidateSubmissionPageProps { onNavigate: (page: string) => void; }

const copy = {
  fr: { title: 'Soumettre mon profil', intro: 'Présentez votre parcours et vos compétences. Votre profil sera vérifié par le bureau avant toute publication.', name: 'Nom et prénom', profession: 'Profession', education: 'Niveau d’études', diplomas: 'Diplômes et formations', experience: 'Expérience professionnelle et associative', skills: 'Compétences et savoir-faire', motivation: 'Motivation et engagement pour Aïn El Turck', pin: 'Code PIN personnel (10 chiffres)', pinConfirm: 'Confirmer le code PIN', photo: 'Photo de profil (JPG, PNG ou WebP — 5 Mo max.)', submit: 'Envoyer mon profil', submitting: 'Envoi en cours…', required: 'Veuillez remplir tous les champs obligatoires et choisir une photo.', pinError: 'Le code PIN doit contenir exactement 10 chiffres et les deux codes doivent correspondre.', photoError: 'La photo doit être au format JPG, PNG ou WebP et ne pas dépasser 5 Mo.', success: 'Votre profil a été envoyé. Il sera visible uniquement après vérification et approbation du bureau.', failure: 'Impossible d’envoyer le profil. Vérifiez votre connexion puis réessayez.', back: 'Retour', privacy: 'Votre code PIN est enregistré sous forme d’empreinte et n’est jamais affiché publiquement. Ne le communiquez à personne.' },
  ar: { title: 'إرسال ملفي الشخصي', intro: 'قدموا مساركم وكفاءاتكم. سيقوم المكتب بمراجعة الملف قبل نشره.', name: 'الاسم واللقب', profession: 'المهنة', education: 'المستوى الدراسي', diplomas: 'الشهادات والتكوينات', experience: 'الخبرة المهنية والجمعوية', skills: 'الكفاءات والمهارات', motivation: 'الدوافع والالتزام من أجل عين الترك', pin: 'رمز PIN شخصي (10 أرقام)', pinConfirm: 'تأكيد رمز PIN', photo: 'صورة شخصية (JPG أو PNG أو WebP — 5 ميغابايت كحد أقصى)', submit: 'إرسال الملف', submitting: 'جارٍ الإرسال…', required: 'يرجى ملء الحقول المطلوبة واختيار صورة.', pinError: 'يجب أن يتكون رمز PIN من 10 أرقام متطابقة في الخانتين.', photoError: 'يجب أن تكون الصورة JPG أو PNG أو WebP وألا يتجاوز حجمها 5 ميغابايت.', success: 'تم إرسال ملفكم. لن يظهر إلا بعد مراجعته والموافقة على نشره من طرف المكتب.', failure: 'تعذر إرسال الملف. تحققوا من الاتصال ثم أعيدوا المحاولة.', back: 'رجوع', privacy: 'يُحفظ رمز PIN كبصمة رقمية ولا يظهر للعموم. لا تشاركوه مع أي شخص.' },
  en: { title: 'Submit my profile', intro: 'Share your background and skills. The communal office will review your profile before publication.', name: 'Full name', profession: 'Profession', education: 'Education level', diplomas: 'Diplomas and training', experience: 'Professional and community experience', skills: 'Skills and expertise', motivation: 'Motivation and commitment to Ain El Turck', pin: 'Personal PIN (10 digits)', pinConfirm: 'Confirm PIN', photo: 'Profile photo (JPG, PNG or WebP — max 5 MB)', submit: 'Submit profile', submitting: 'Submitting…', required: 'Complete all required fields and choose a photo.', pinError: 'The PIN must contain exactly 10 digits and both entries must match.', photoError: 'Photo must be JPG, PNG or WebP and no larger than 5 MB.', success: 'Your profile has been submitted. It will only appear after office review and approval.', failure: 'Could not submit the profile. Check your connection and try again.', back: 'Back', privacy: 'Your PIN is stored as a hash and is never displayed publicly. Do not share it with anyone.' }
};

export const CandidateSubmissionPage: React.FC<CandidateSubmissionPageProps> = ({ onNavigate }) => {
  const { lang, isRtl } = useLanguage();
  const t = copy[lang as keyof typeof copy] || copy.fr;
  const [form, setForm] = useState({ name: '', profession: '', education: '', diplomas: '', experience: '', skills: '', motivation: '', pin: '', pinConfirm: '' });
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);
  const setField = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); setSuccess('');
    if (!form.name.trim() || !form.profession.trim() || !form.education.trim() || !form.skills.trim() || !photo) { setError(t.required); return; }
    if (!/^\d{10}$/.test(form.pin) || form.pin !== form.pinConfirm) { setError(t.pinError); return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(photo.type) || photo.size > 5 * 1024 * 1024) { setError(t.photoError); return; }
    setBusy(true);
    try {
      const pinBytes = new TextEncoder().encode(form.pin);
      const digest = await crypto.subtle.digest('SHA-256', pinBytes);
      const pinHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
      const extension = photo.type === 'image/jpeg' ? 'jpg' : photo.type === 'image/png' ? 'png' : 'webp';
      const filePath = `submissions/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage.from('candidate-photos').upload(filePath, photo, { contentType: photo.type, cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrl } = supabase.storage.from('candidate-photos').getPublicUrl(filePath);
      const localized = (value: string) => ({ fr: value.trim(), ar: value.trim(), en: value.trim() });
      const { error: insertError } = await supabase.from('candidates').insert({
        name: form.name.trim(), photo_url: publicUrl.publicUrl,
        profession: localized(form.profession), education_level: localized(form.education),
        diplomas: localized(form.diplomas), experience: localized(form.experience),
        skills: localized(form.skills), motivation: localized(form.motivation),
        candidate_pin_hash: pinHash, profile_status: 'pending', is_published: false,
        is_active: true, pin_failed_attempts: 0, submitted_at: new Date().toISOString()
      });
      if (insertError) throw insertError;
      setSuccess(t.success);
      setForm({ name: '', profession: '', education: '', diplomas: '', experience: '', skills: '', motivation: '', pin: '', pinConfirm: '' });
      setPhoto(null);
    } catch (submissionError) {
      console.error('Candidate profile submission failed', submissionError);
      setError(t.failure);
    } finally { setBusy(false); }
  };

  const inputClass = 'w-full min-h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-green-600';
  const labelClass = 'block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5';
  return (
    <main dir={isRtl ? 'rtl' : 'ltr'} className="max-w-3xl mx-auto px-4 py-6 sm:py-10 pb-28 space-y-6">
      <button type="button" onClick={() => onNavigate('council')} className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-green-800 dark:text-green-300"><ArrowLeft className="w-4 h-4" />{t.back}</button>
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 dark:bg-green-950/40 px-3 py-1.5 text-xs font-bold text-green-800 dark:text-green-300"><ShieldCheck className="w-4 h-4" />RND • Aïn El Turck</div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{t.title}</h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t.intro}</p>
      </header>
      <form onSubmit={submit} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-7 space-y-5 shadow-sm">
        <div><label className={labelClass}>{t.photo} *</label><label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/40 p-4 text-center text-sm text-zinc-600 dark:text-zinc-300"><ImagePlus className="w-7 h-7 text-green-700" />{photo ? photo.name : t.photo}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setPhoto(e.target.files?.[0] || null)} /></label></div>
        <div><label className={labelClass}>{t.name} *</label><input className={inputClass} autoComplete="name" maxLength={120} value={form.name} onChange={e => setField('name', e.target.value)} required /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>{t.profession} *</label><input className={inputClass} maxLength={160} value={form.profession} onChange={e => setField('profession', e.target.value)} required /></div>
          <div><label className={labelClass}>{t.education} *</label><input className={inputClass} maxLength={160} value={form.education} onChange={e => setField('education', e.target.value)} required /></div>
        </div>
        {([['diplomas', t.diplomas], ['experience', t.experience], ['skills', t.skills], ['motivation', t.motivation]] as const).map(([key, label]) => <div key={key}><label className={labelClass}>{label}{key === 'skills' ? ' *' : ''}</label><textarea className={inputClass + ' min-h-28 resize-y'} maxLength={key === 'motivation' ? 2000 : 1500} value={form[key]} onChange={e => setField(key, e.target.value)} required={key === 'skills'} /></div>)}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>{t.pin} *</label><input className={inputClass} type="password" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} autoComplete="new-password" value={form.pin} onChange={e => setField('pin', e.target.value.replace(/\D/g, '').slice(0, 10))} required /></div>
          <div><label className={labelClass}>{t.pinConfirm} *</label><input className={inputClass} type="password" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} autoComplete="new-password" value={form.pinConfirm} onChange={e => setField('pinConfirm', e.target.value.replace(/\D/g, '').slice(0, 10))} required /></div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.privacy}</p>
        {error && <p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
        {success && <p role="status" className="rounded-xl bg-green-50 dark:bg-green-950/40 p-3 text-sm text-green-800 dark:text-green-300 flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" />{success}</p>}
        <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-black text-white transition hover:bg-green-800 disabled:opacity-60">{busy && <Loader2 className="w-4 h-4 animate-spin" />}{busy ? t.submitting : t.submit}</button>
      </form>
    </main>
  );
};
