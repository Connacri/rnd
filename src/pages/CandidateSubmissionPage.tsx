import React, { useRef, useState } from 'react';
import { CheckCircle2, ImagePlus, Loader2, LockKeyhole, LogIn, LogOut } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface CandidateSubmissionPageProps { onNavigate: (page: string) => void; }
const copy = {
 fr: {
  title:'Espace réservé aux candidats', intro:'Connectez-vous avec le compte Google associé à votre candidature.',
  google:'Continuer avec Google', connected:'Compte Google connecté', pinTitle:'Code PIN commun',
  verify:'Vérifier mon accès', name:'Nom et prénom', profession:'Profession', education:'Niveau d’études',
  diplomas:'Diplômes et formations', experience:'Expérience professionnelle et associative',
  skills:'Compétences et savoir-faire', motivation:'Motivation et engagement pour Aïn El Turck',
  photo:'Photo de profil (JPG, PNG ou WebP — 5 Mo max.)', submit:'Envoyer mon profil', submitting:'Envoi en cours…',
  required:'Veuillez remplir le nom, la profession, le niveau d’études, les compétences et choisir une photo.',
  photoError:'La photo doit être au format JPG, PNG ou WebP et ne pas dépasser 5 Mo.',
  success:'Votre profil a été envoyé. Il sera visible uniquement après validation de l’administrateur.',
  failure:'Impossible d’envoyer le profil. Vérifiez votre connexion puis réessayez.',
  back:'Retour', pin:'Saisissez le code à 10 chiffres', invalid:'Code PIN invalide ou accès temporairement bloqué.',
  privacy:'Votre compte Google identifie votre profil. Le PIN commun est vérifié de manière sécurisée sur le serveur.',
  signout:'Changer de compte Google', emailError:'Aucun profil candidat n’est associé à cette adresse Google. Contactez l’administrateur.',
  googleError:'La connexion Google n’a pas abouti. Réessayez.'
 },
 ar: {
  title:'فضاء خاص بالمترشحين', intro:'سجّل الدخول بحساب Google المرتبط بترشحك.',
  google:'المتابعة باستخدام Google', connected:'حساب Google متصل', pinTitle:'رمز PIN موحد',
  verify:'التحقق من الدخول', name:'الاسم واللقب', profession:'المهنة', education:'المستوى الدراسي',
  diplomas:'الشهادات والتكوينات', experience:'الخبرة المهنية والجمعوية', skills:'الكفاءات والمهارات',
  motivation:'الدوافع والالتزام من أجل عين الترك', photo:'صورة شخصية (JPG أو PNG أو WebP — 5 ميغابايت كحد أقصى)',
  submit:'إرسال الملف', submitting:'جارٍ الإرسال…',
  required:'يرجى ملء الاسم والمهنة والمستوى الدراسي والكفاءات واختيار صورة.',
  photoError:'يجب أن تكون الصورة JPG أو PNG أو WebP وألا يتجاوز حجمها 5 ميغابايت.',
  success:'تم إرسال ملفكم. لن يظهر إلا بعد موافقة المسؤول.', failure:'تعذر إرسال الملف. تحقق من الاتصال ثم أعد المحاولة.',
  back:'رجوع', pin:'أدخل الرمز المكوّن من 10 أرقام', invalid:'رمز PIN غير صحيح أو تم توقيف الدخول مؤقتاً.',
  privacy:'حساب Google يحدد ملفك. يتم التحقق من رمز PIN الموحد بشكل آمن على الخادم.',
  signout:'تغيير حساب Google', emailError:'لا يوجد ملف مترشح مرتبط بهذا الحساب. يرجى الاتصال بالمسؤول.',
  googleError:'تعذر تسجيل الدخول عبر Google. حاول مجدداً.'
 },
 en: {
  title:'Candidates’ secure area', intro:'Sign in with the Google account associated with your candidacy.',
  google:'Continue with Google', connected:'Google account connected', pinTitle:'Shared PIN',
  verify:'Verify access', name:'Full name', profession:'Profession', education:'Education level',
  diplomas:'Diplomas and training', experience:'Professional and community experience',
  skills:'Skills and expertise', motivation:'Motivation and commitment to Ain El Turck',
  photo:'Profile photo (JPG, PNG or WebP — max 5 MB)', submit:'Submit profile', submitting:'Submitting…',
  required:'Complete your name, profession, education, skills and choose a photo.',
  photoError:'Photo must be JPG, PNG or WebP and no larger than 5 MB.',
  success:'Your profile has been submitted. It will appear only after administrator approval.',
  failure:'Could not submit the profile. Check your connection and try again.',
  back:'Back', pin:'Enter the 10-digit code', invalid:'Invalid PIN or access temporarily locked.',
  privacy:'Your Google account identifies your profile. The shared PIN is securely verified on the server.',
  signout:'Switch Google account', emailError:'No candidate profile is linked to this Google account. Contact the administrator.',
  googleError:'Google sign-in failed. Please try again.'
 }
};
export const CandidateSubmissionPage: React.FC<CandidateSubmissionPageProps> = () => {
 const { lang, isRtl } = useLanguage();
 const { user, logout, loginWithGoogle } = useAuth();
 const t = copy[lang as keyof typeof copy] || copy.fr;
 const [digits, setDigits] = useState<string[]>(Array(10).fill(''));
 const [candidateId, setCandidateId] = useState('');
 const [authorized, setAuthorized] = useState(false);
 const [form, setForm] = useState({name:'',profession:'',education:'',diplomas:'',experience:'',skills:'',motivation:''});
 const [photo, setPhoto] = useState<File|null>(null);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState('');
 const [busy, setBusy] = useState(false);
 const refs = useRef<Array<HTMLInputElement|null>>([]);
 const pin = digits.join('');
 const setField = (key:keyof typeof form,value:string) => setForm(v=>({...v,[key]:value}));

 const signInGoogle = async () => {
  setError('');
  const result = await loginWithGoogle();
  if (!result.success) setError(result.error || t.googleError);
 };
 const changeDigit = (index:number, value:string) => {
  const digit = value.replace(/\D/g,'').slice(-1);
  setDigits(old => old.map((v,i)=>i===index?digit:v));
  if (digit && index < 9) refs.current[index+1]?.focus();
 };
 const verify = async (event:React.FormEvent) => {
  event.preventDefault(); setError(''); setBusy(true);
  const { data, error:invokeError } = await supabase.functions.invoke('candidate-access',{body:{action:'verify',pin}});
  setBusy(false);
  if (invokeError || !data?.success) { setError(data?.error || t.invalid); return; }
  setCandidateId(data.candidateId); setAuthorized(true);
 };
 const submit = async (event:React.FormEvent) => {
  event.preventDefault(); setError(''); setSuccess('');
  if (!form.name.trim() || !form.profession.trim() || !form.education.trim() || !form.skills.trim() || !photo) { setError(t.required); return; }
  if (!['image/jpeg','image/png','image/webp'].includes(photo.type) || photo.size > 5*1024*1024) { setError(t.photoError); return; }
  setBusy(true);
  try {
   const ext = photo.type==='image/jpeg'?'jpg':photo.type==='image/png'?'png':'webp';
   const path = `submissions/${candidateId}/${crypto.randomUUID()}.${ext}`;
   const {error:uploadError} = await supabase.storage.from('candidate-photos').upload(path,photo,{contentType:photo.type,cacheControl:'3600',upsert:false});
   if (uploadError) throw uploadError;
   const localized = (value:string) => ({fr:value.trim(),ar:value.trim(),en:value.trim()});
   const {data,error:submitError} = await supabase.functions.invoke('candidate-access',{body:{
    action:'submit',pin,profile:{
     name:form.name,profession:localized(form.profession),education_level:localized(form.education),
     diplomas:localized(form.diplomas),experience:localized(form.experience),skills:localized(form.skills),
     motivation:localized(form.motivation),photoPath:path,photoType:photo.type
    }
   }});
   if (submitError || !data?.success) throw new Error(data?.error || submitError?.message || t.failure);
   setSuccess(t.success); setAuthorized(false); setCandidateId(''); setDigits(Array(10).fill('')); setPhoto(null);
   setForm({name:'',profession:'',education:'',diplomas:'',experience:'',skills:'',motivation:''});
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
    <button type="button" onClick={()=>void signInGoogle()} className="w-full min-h-12 rounded-full bg-white text-zinc-800 border border-zinc-300 font-black flex items-center justify-center gap-3 shadow-sm">
     <span className="text-lg font-black">G</span>{t.google}
    </button>
    {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
   </section> : !authorized ? <form onSubmit={verify} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 space-y-5 shadow-sm">
    <div className="flex items-center justify-between gap-3">
     <div className="min-w-0"><p className="text-xs font-bold text-green-700 dark:text-green-300">{t.connected}</p><p className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">{user.email}</p></div>
     <button type="button" onClick={()=>void logout()} className="shrink-0 text-xs font-semibold text-zinc-500 hover:text-rose-600 flex items-center gap-1"><LogOut className="size-4"/>{t.signout}</button>
    </div>
    <div className="mx-auto size-14 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center"><LockKeyhole className="size-7 text-green-700"/></div>
    <div>
     <h2 className="text-center font-black text-zinc-900 dark:text-white">{t.pinTitle}</h2>
     <label className={label+' text-center mt-2'}>{t.pin}</label>
     <div dir="ltr" className="grid grid-cols-5 sm:grid-cols-10 gap-2">
      {digits.map((digit,index)=><input key={index} ref={el=>{refs.current[index]=el;}} aria-label={`PIN chiffre ${index+1}`} className="min-w-0 h-12 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-center text-lg font-black text-zinc-900 dark:text-white focus:ring-2 focus:ring-green-600 outline-none" inputMode="numeric" pattern="[0-9]" maxLength={1} autoComplete={index===0?'one-time-code':'off'} value={digit} onChange={e=>changeDigit(index,e.target.value)} onKeyDown={e=>{if(e.key==='Backspace'&&!digits[index]&&index>0)refs.current[index-1]?.focus();}} required />)}
     </div>
    </div>
    <p className="text-xs text-zinc-500">{t.privacy}</p>
    {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
    <button disabled={busy||pin.length!==10} className="w-full min-h-12 rounded-full bg-green-700 text-white font-black disabled:opacity-50">{busy?<Loader2 className="inline size-4 animate-spin"/>:t.verify}</button>
   </form> : <form onSubmit={submit} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-7 space-y-5 shadow-sm">
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
