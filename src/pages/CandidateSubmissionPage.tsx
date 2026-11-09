import React, { useEffect, useState } from 'react';
import { CheckCircle2, ImagePlus, Loader2, LogIn, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { collection, doc, getDocs, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { firestore } from '../lib/firebase';
import { firebaseStorage } from '../lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface CandidateSubmissionPageProps { onNavigate: (page: string) => void; }
const copy = {
 fr: {
  title:'Espace réservé aux candidats', intro:'Connectez-vous avec le compte Google associé à votre candidature.',
  google:'Continuer avec Google', connected:'Compte Google connecté', name:'Nom et prénom', profession:'Profession', education:'Niveau d’études',
  diplomas:'Diplômes et formations', experience:'Expérience professionnelle et associative',
  skills:'Compétences et savoir-faire', motivation:'Motivation et engagement pour Aïn El Turck',
  photo:'Photo de profil (JPG, PNG ou WebP — 5 Mo max.)', submit:'Envoyer mon profil', submitting:'Envoi en cours…',
  required:'Veuillez remplir le nom, la profession, le niveau d’études, les compétences et choisir une photo.',
  photoError:'La photo doit être au format JPG, PNG ou WebP et ne pas dépasser 5 Mo.',
  success:'Votre profil a été envoyé. Il sera visible uniquement après validation de l’administrateur.',
  failure:'Impossible d’envoyer le profil. Vérifiez votre connexion puis réessayez.',
  back:'Retour', accessLoading:'Vérification de votre compte…',
  signout:'Changer de compte Google', emailError:'Aucun profil candidat n’est associé à cette adresse Google. Contactez l’administrateur.',
  googleError:'La connexion Google n’a pas abouti. Réessayez.'
 },
 ar: {
  title:'فضاء خاص بالمترشحين', intro:'سجّل الدخول بحساب Google المرتبط بترشحك.',
  google:'المتابعة باستخدام Google', connected:'حساب Google متصل', name:'الاسم واللقب', profession:'المهنة', education:'المستوى الدراسي',
  diplomas:'الشهادات والتكوينات', experience:'الخبرة المهنية والجمعوية', skills:'الكفاءات والمهارات',
  motivation:'الدوافع والالتزام من أجل عين الترك', photo:'صورة شخصية (JPG أو PNG أو WebP — 5 ميغابايت كحد أقصى)',
  submit:'إرسال الملف', submitting:'جارٍ الإرسال…',
  required:'يرجى ملء الاسم والمهنة والمستوى الدراسي والكفاءات واختيار صورة.',
  photoError:'يجب أن تكون الصورة JPG أو PNG أو WebP وألا يتجاوز حجمها 5 ميغابايت.',
  success:'تم إرسال ملفكم. لن يظهر إلا بعد موافقة المسؤول.', failure:'تعذر إرسال الملف. تحقق من الاتصال ثم أعد المحاولة.',
  back:'رجوع', accessLoading:'جارٍ التحقق من حسابك…',
  signout:'تغيير حساب Google', emailError:'لا يوجد ملف مترشح مرتبط بهذا الحساب. يرجى الاتصال بالمسؤول.',
  googleError:'تعذر تسجيل الدخول عبر Google. حاول مجدداً.'
 },
 en: {
  title:'Candidates’ secure area', intro:'Sign in with the Google account associated with your candidacy.',
  google:'Continue with Google', connected:'Google account connected', name:'Full name', profession:'Profession', education:'Education level',
  diplomas:'Diplomas and training', experience:'Professional and community experience',
  skills:'Skills and expertise', motivation:'Motivation and commitment to Ain El Turck',
  photo:'Profile photo (JPG, PNG or WebP — max 5 MB)', submit:'Submit profile', submitting:'Submitting…',
  required:'Complete your name, profession, education, skills and choose a photo.',
  photoError:'Photo must be JPG, PNG or WebP and no larger than 5 MB.',
  success:'Your profile has been submitted. It will appear only after administrator approval.',
  failure:'Could not submit the profile. Check your connection and try again.',
  back:'Back', accessLoading:'Checking your account…',
  signout:'Switch Google account', emailError:'No candidate profile is linked to this Google account. Contact the administrator.',
  googleError:'Google sign-in failed. Please try again.'
 }
};
export const CandidateSubmissionPage: React.FC<CandidateSubmissionPageProps> = () => {
 const { lang, isRtl } = useLanguage();
 const { user, logout, loginWithGoogle } = useAuth();
 const t = copy[lang as keyof typeof copy] || copy.fr;
 const [candidateId, setCandidateId] = useState('');
 const [authorized, setAuthorized] = useState(false);
 const [form, setForm] = useState({name:'',profession:'',education:'',diplomas:'',experience:'',skills:'',motivation:''});
 const [photo, setPhoto] = useState<File|null>(null);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [busy, setBusy] = useState(false);
 const setField = (key:keyof typeof form,value:string) => setForm(v=>({...v,[key]:value}));

 const signInGoogle = async () => {
  setError('');
  const result = await loginWithGoogle();
  if (!result.success) setError(result.error || t.googleError);
 };
 useEffect(() => {
  if (!user?.email) { setAuthorized(false); setCandidateId(''); return; }
  let active = true;
  setAuthorized(false); setCandidateId('');
  setBusy(true); setError('');
  const findAssignedProfile = async () => {
   try {
    const snapshot = await getDocs(query(collection(firestore, 'candidates'), where('google_email', '==', user.email.trim().toLowerCase())));
    const match = snapshot.docs.find(item => item.data().is_office_profile !== true && item.data().is_active !== false);
    if (!match) throw new Error(t.emailError);
    if (!active) return;
    const data = match.data();
    setCandidateId(match.id);
    setForm({
     name: data.name || '',
     profession: data.profession?.[lang] || data.profession?.fr || '',
     education: data.education_level?.[lang] || data.education_level?.fr || '',
     diplomas: data.diplomas?.[lang] || data.diplomas?.fr || '',
     experience: data.experience?.[lang] || data.experience?.fr || '',
     skills: data.skills?.[lang] || data.skills?.fr || '',
     motivation: data.motivation?.[lang] || data.motivation?.fr || '',
    });
    setAuthorized(true);
   } catch (err) {
    if (active) { setAuthorized(false); setError(err instanceof Error ? err.message : t.emailError); }
   } finally { if (active) setBusy(false); }
  };
  void findAssignedProfile();
  return () => { active = false; };
 }, [user?.id, user?.email, lang]);
 const submit = async (event:React.FormEvent) => {
  event.preventDefault(); setError(''); setSuccess('');
  if (!form.name.trim() || !form.profession.trim() || !form.education.trim() || !form.skills.trim() || !photo) { setError(t.required); return; }
  if (!['image/jpeg','image/png','image/webp'].includes(photo.type) || photo.size > 5*1024*1024) { setError(t.photoError); return; }
  setBusy(true);
  try {
   const ext = photo.type==='image/jpeg'?'jpg':photo.type==='image/png'?'png':'webp';
   const path = `submissions/${user.id}/${crypto.randomUUID()}.${ext}`;
   const photoRef = ref(firebaseStorage, `candidate-photos/${path}`);
   const uploaded = await uploadBytes(photoRef, photo, { contentType: photo.type, cacheControl: 'public,max-age=3600' });
   const photoUrl = await getDownloadURL(uploaded.ref);
   const localized = (value:string) => ({fr:value.trim(),ar:value.trim(),en:value.trim()});
   const batch = writeBatch(firestore);
   batch.update(doc(firestore, 'candidates', candidateId), {
    name:form.name.trim(), photo_url:photoUrl,
    profession:localized(form.profession), education_level:localized(form.education),
    diplomas:localized(form.diplomas), experience:localized(form.experience),
    skills:localized(form.skills), motivation:localized(form.motivation),
    profile_status:'pending', is_published:false, is_active:true,
    submitted_at:serverTimestamp(), updated_at:serverTimestamp(),
   });
   batch.delete(doc(firestore, 'publishedCandidates', candidateId));
   await batch.commit();
   setSuccess(t.success); setPhoto(null);
  } catch (err) { console.error(err); setError(err instanceof Error ? err.message : t.failure); }
  finally { setBusy(false); }
 };
 const input='w-full min-h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-green-600';
 const label='block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5';

 return <main dir={isRtl?'rtl':'ltr'} className="min-h-dvh w-full bg-[#FAF7F2] dark:bg-[#121110] px-4 py-8 sm:py-12 flex flex-col items-center justify-start">
  <div className="w-full max-w-2xl space-y-6">
   <div className="text-center space-y-2">
    <div className="text-xs font-extrabold tracking-[0.18em] text-green-800 dark:text-green-300">RND • AÏN EL TÜRK</div>
    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">{t.title}</h1>
    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{authorized?t.name:t.intro}</p>
   </div>

   {!user ? <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 space-y-5 shadow-sm text-center">
    <div className="mx-auto size-14 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center"><LogIn className="size-7 text-green-700"/></div>
    <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.intro}</p>
    <button type="button" onClick={()=>void signInGoogle()} className="w-full min-h-12 rounded-full bg-white text-zinc-800 border border-zinc-300 font-black flex items-center justify-center gap-3 shadow-sm"><span className="text-lg font-black">G</span>{t.google}</button>
    {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
   </section> : busy && !authorized ? <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-7 text-center text-sm text-zinc-600 dark:text-zinc-300"><Loader2 className="mx-auto mb-3 size-6 animate-spin text-green-700"/>{t.accessLoading}</section> : !authorized ? <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 space-y-5 shadow-sm">
    <div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold text-green-700 dark:text-green-300">{t.connected}</p><p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{user.email}</p></div><button type="button" onClick={()=>void logout()} className="shrink-0 text-xs font-semibold text-zinc-500 hover:text-rose-600 flex items-center gap-1"><LogOut className="size-4"/>{t.signout}</button></div>
    {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
   </section> : <form onSubmit={submit} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-7 space-y-5 shadow-sm">
    <div className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="text-xs font-bold text-green-700 dark:text-green-300">{t.connected}</p><p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{user.email}</p></div><button type="button" onClick={()=>void logout()} className="shrink-0 text-xs font-semibold text-zinc-500 hover:text-rose-600 flex items-center gap-1"><LogOut className="size-4"/>{t.signout}</button></div>
    <div><label className={label}>{t.photo} *</label><label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/40 p-4 text-center text-sm text-zinc-600 dark:text-zinc-300"><ImagePlus className="w-7 h-7 text-green-700"/>{photo?photo.name:t.photo}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setPhoto(e.target.files?.[0]||null)}/></label></div>
    <div><label className={label}>{t.name} *</label><input className={input} maxLength={120} value={form.name} onChange={e=>setField('name',e.target.value)} required/></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className={label}>{t.profession} *</label><input className={input} maxLength={160} value={form.profession} onChange={e=>setField('profession',e.target.value)} required/></div><div><label className={label}>{t.education} *</label><input className={input} maxLength={160} value={form.education} onChange={e=>setField('education',e.target.value)} required/></div></div>
    {([['diplomas',t.diplomas],['experience',t.experience],['skills',t.skills],['motivation',t.motivation]] as const).map(([key,title])=><div key={key}><label className={label}>{title}{key==='skills'?' *':''}</label><textarea className={input+' min-h-28 resize-y'} maxLength={2000} value={form[key]} onChange={e=>setField(key,e.target.value)} required={key==='skills'}/></div>)}
    {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
    {success&&<p role="status" className="rounded-xl bg-green-50 dark:bg-green-950/40 p-3 text-sm text-green-800 dark:text-green-300 flex gap-2"><CheckCircle2 className="size-5 shrink-0"/>{success}</p>}
    <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-black text-white disabled:opacity-60">{busy?<Loader2 className="size-4 animate-spin"/>:t.submit}</button>
   </form>}
  </div>
 </main>;
};
