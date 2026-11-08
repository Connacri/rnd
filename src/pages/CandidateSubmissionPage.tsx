import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ImagePlus, Loader2, ShieldCheck, LockKeyhole } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabaseClient';

interface CandidateSubmissionPageProps { onNavigate: (page: string) => void; }
const copy = {
 fr:{title:'Espace réservé aux élus',intro:'Saisissez le code PIN de 10 chiffres qui vous a été communiqué personnellement par l’administrateur.',verify:'Vérifier mon accès',name:'Nom et prénom',profession:'Profession',education:'Niveau d’études',diplomas:'Diplômes et formations',experience:'Expérience professionnelle et associative',skills:'Compétences et savoir-faire',motivation:'Motivation et engagement pour Aïn El Turck',photo:'Photo de profil (JPG, PNG ou WebP — 5 Mo max.)',submit:'Envoyer mon profil',submitting:'Envoi en cours…',required:'Veuillez remplir le nom, la profession, le niveau d’études, les compétences et choisir une photo.',photoError:'La photo doit être au format JPG, PNG ou WebP et ne pas dépasser 5 Mo.',success:'Votre profil a été envoyé. Il sera visible uniquement après validation de l’administrateur.',failure:'Impossible d’envoyer le profil. Vérifiez votre connexion puis réessayez.',back:'Retour',pin:'Code PIN communiqué par l’administrateur',invalid:'Code PIN invalide ou accès temporairement bloqué. Contactez l’administrateur.',privacy:'Votre code PIN est personnel. Il est vérifié côté serveur et n’est jamais publié.'},
 ar:{title:'فضاء خاص بالمترشحين',intro:'أدخل رمز PIN المكوّن من 10 أرقام الذي سلّمه لك المسؤول شخصياً.',verify:'التحقق من الدخول',name:'الاسم واللقب',profession:'المهنة',education:'المستوى الدراسي',diplomas:'الشهادات والتكوينات',experience:'الخبرة المهنية والجمعوية',skills:'الكفاءات والمهارات',motivation:'الدوافع والالتزام من أجل عين الترك',photo:'صورة شخصية (JPG أو PNG أو WebP — 5 ميغابايت كحد أقصى)',submit:'إرسال الملف',submitting:'جارٍ الإرسال…',required:'يرجى ملء الاسم والمهنة والمستوى الدراسي والكفاءات واختيار صورة.',photoError:'يجب أن تكون الصورة JPG أو PNG أو WebP وألا يتجاوز حجمها 5 ميغابايت.',success:'تم إرسال ملفكم. لن يظهر إلا بعد موافقة المسؤول.',failure:'تعذر إرسال الملف. تحقق من الاتصال ثم أعد المحاولة.',back:'رجوع',pin:'رمز PIN الذي سلّمه المسؤول',invalid:'رمز PIN غير صحيح أو تم توقيف الدخول مؤقتاً. اتصل بالمسؤول.',privacy:'رمز PIN شخصي ويتم التحقق منه على الخادم ولا يُنشر أبداً.'},
 en:{title:'Candidates’ secure area',intro:'Enter the 10-digit PIN personally issued to you by the administrator.',verify:'Verify access',name:'Full name',profession:'Profession',education:'Education level',diplomas:'Diplomas and training',experience:'Professional and community experience',skills:'Skills and expertise',motivation:'Motivation and commitment to Ain El Turck',photo:'Profile photo (JPG, PNG or WebP — max 5 MB)',submit:'Submit profile',submitting:'Submitting…',required:'Complete your name, profession, education, skills and choose a photo.',photoError:'Photo must be JPG, PNG or WebP and no larger than 5 MB.',success:'Your profile has been submitted. It will appear only after administrator approval.',failure:'Could not submit the profile. Check your connection and try again.',back:'Back',pin:'PIN issued by the administrator',invalid:'Invalid PIN or access temporarily locked. Contact the administrator.',privacy:'Your PIN is personal, verified server-side and never published.'}
};
export const CandidateSubmissionPage: React.FC<CandidateSubmissionPageProps> = ({onNavigate}) => {
 const {lang,isRtl}=useLanguage(); const t=copy[lang as keyof typeof copy]||copy.fr;
 const [pin,setPin]=useState(''),[candidateId,setCandidateId]=useState(''),[authorized,setAuthorized]=useState(false);
 const [form,setForm]=useState({name:'',profession:'',education:'',diplomas:'',experience:'',skills:'',motivation:''});
 const [photo,setPhoto]=useState<File|null>(null),[error,setError]=useState(''),[success,setSuccess]=useState(''),[busy,setBusy]=useState(false);
 const setField=(key:keyof typeof form,value:string)=>setForm(v=>({...v,[key]:value}));
 const verify=async(e:React.FormEvent)=>{e.preventDefault();setError('');setBusy(true);
  const {data,error}=await supabase.functions.invoke('candidate-access',{body:{action:'verify',pin}});
  setBusy(false);if(error||!data?.success){setError(data?.error||t.invalid);return;}setCandidateId(data.candidateId);setAuthorized(true);
 };
 
 const submit=async(e:React.FormEvent)=>{e.preventDefault();setError('');setSuccess('');
  if(!form.name.trim()||!form.profession.trim()||!form.education.trim()||!form.skills.trim()||!photo){setError(t.required);return;}
  if(!['image/jpeg','image/png','image/webp'].includes(photo.type)||photo.size>5*1024*1024){setError(t.photoError);return;}
  setBusy(true);
  try{
   const ext=photo.type==='image/jpeg'?'jpg':photo.type==='image/png'?'png':'webp';
   const path=`submissions/${candidateId}/${crypto.randomUUID()}.${ext}`;
   const {error:uploadError}=await supabase.storage.from('candidate-photos').upload(path,photo,{contentType:photo.type,cacheControl:'3600',upsert:false});
   if(uploadError)throw uploadError;
   const localized=(v:string)=>({fr:v.trim(),ar:v.trim(),en:v.trim()});
   const {data,error:submitError}=await supabase.functions.invoke('candidate-access',{body:{action:'submit',candidateId,pin,profile:{name:form.name,profession:localized(form.profession),education_level:localized(form.education),diplomas:localized(form.diplomas),experience:localized(form.experience),skills:localized(form.skills),motivation:localized(form.motivation),photoPath:path,photoType:photo.type}}});
   if(submitError||!data?.success)throw new Error(data?.error||submitError?.message||t.failure);
   setSuccess(t.success);setAuthorized(false);setCandidateId('');setPin('');setPhoto(null);setForm({name:'',profession:'',education:'',diplomas:'',experience:'',skills:'',motivation:''});
  }catch(err){console.error(err);setError(t.failure);}finally{setBusy(false);}
 };
 const input='w-full min-h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-green-600';
 const label='block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5';
 return <main dir={isRtl?'rtl':'ltr'} className="max-w-3xl mx-auto px-4 py-6 sm:py-10 pb-28 space-y-6">
  <button type="button" onClick={()=>onNavigate('home')} className="inline-flex items-center gap-2 min-h-11 text-sm font-bold text-green-800 dark:text-green-300"><ArrowLeft className="w-4 h-4"/>{t.back}</button>
  <header className="rounded-3xl bg-[#073b31] text-white p-6 sm:p-8 space-y-3"><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold"><ShieldCheck className="w-4 h-4"/>RND • Aïn El Turck</div><h1 className="text-2xl sm:text-3xl font-black">{t.title}</h1><p className="text-sm leading-relaxed text-white/80">{t.intro}</p></header>
  {!authorized?<form onSubmit={verify} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-7 space-y-5 shadow-sm">
   <div className="mx-auto size-14 rounded-2xl bg-green-50 dark:bg-green-950/40 flex items-center justify-center"><LockKeyhole className="size-7 text-green-700"/></div>
   <div><label className={label}>{t.pin} *</label><input className={input+' text-center tracking-[0.35em] text-xl font-black'} type="password" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} autoComplete="one-time-code" value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,'').slice(0,10))} required /></div>
   <p className="text-xs text-zinc-500">{t.privacy}</p>
   {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
   <button disabled={busy||pin.length!==10} className="w-full min-h-12 rounded-full bg-green-700 text-white font-black disabled:opacity-50">{busy?<Loader2 className="inline size-4 animate-spin"/>:t.verify}</button>
  </form>:<form onSubmit={submit} className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-7 space-y-5 shadow-sm">
   <div><label className={label}>{t.photo} *</label><label className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/40 p-4 text-center text-sm text-zinc-600 dark:text-zinc-300"><ImagePlus className="w-7 h-7 text-green-700"/>{photo?photo.name:t.photo}<input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>setPhoto(e.target.files?.[0]||null)}/></label></div>
   <div><label className={label}>{t.name} *</label><input className={input} maxLength={120} value={form.name} onChange={e=>setField('name',e.target.value)} required/></div>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className={label}>{t.profession} *</label><input className={input} maxLength={160} value={form.profession} onChange={e=>setField('profession',e.target.value)} required/></div><div><label className={label}>{t.education} *</label><input className={input} maxLength={160} value={form.education} onChange={e=>setField('education',e.target.value)} required/></div></div>
   {([['diplomas',t.diplomas],['experience',t.experience],['skills',t.skills],['motivation',t.motivation]] as const).map(([key,title])=><div key={key}><label className={label}>{title}{key==='skills'?' *':''}</label><textarea className={input+' min-h-28 resize-y'} maxLength={2000} value={form[key]} onChange={e=>setField(key,e.target.value)} required={key==='skills'}/></div>)}
   {error&&<p role="alert" className="rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-sm text-rose-700 dark:text-rose-300">{error}</p>}
   {success&&<p role="status" className="rounded-xl bg-green-50 dark:bg-green-950/40 p-3 text-sm text-green-800 dark:text-green-300 flex gap-2"><CheckCircle2 className="size-5 shrink-0"/>{success}</p>}
   <button type="submit" disabled={busy} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-black text-white disabled:opacity-60">{busy?<Loader2 className="size-4 animate-spin"/>:t.submit}</button>
  </form>}
 </main>;
};
