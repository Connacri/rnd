import { onCall, HttpsError, type CallableRequest } from 'firebase-functions/v2/https';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { createHash, pbkdf2Sync, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

initializeApp({ storageBucket: 'rnd-aet.firebasestorage.app' });
const db = getFirestore();
const ITERATIONS = 310000;

const publicCandidateFields = (data: Record<string, any>) => ({
  name: data.name || '',
  photo_url: data.photo_url || null,
  candidate_number: data.candidate_number ?? null,
  profession: data.profession || {},
  education_level: data.education_level || {},
  diplomas: data.diplomas || {},
  experience: data.experience || {},
  skills: data.skills || {},
  motivation: data.motivation || {},
  submitted_at: data.submitted_at || null,
  is_active: data.is_active !== false,
  is_office_profile: false,
});

const isAdmin = (request: CallableRequest<any>) =>
  request.auth?.token.admin === true || request.auth?.token.role === 'admin';
const requireAdmin = (request: CallableRequest<any>) => {
  if (!request.auth || !isAdmin(request)) throw new HttpsError('permission-denied', 'Accès administrateur requis.');
};
const requireGoogleUser = (request: CallableRequest<any>) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Connectez-vous avec votre compte Google.');
  const token = request.auth.token;
  if ((token.firebase as { sign_in_provider?: string } | undefined)?.sign_in_provider !== 'google.com'
      || typeof token.email !== 'string' || token.email_verified !== true) {
    throw new HttpsError('permission-denied', 'Connectez-vous avec un compte Google dont l’adresse e-mail est vérifiée.');
  }
  return { uid: request.auth.uid, email: token.email.trim().toLowerCase() };
};
const hashPin = (pin: string) => {
  const salt = randomBytes(16);
  const hash = pbkdf2Sync(pin, salt, ITERATIONS, 32, 'sha256');
  return `pbkdf2$${ITERATIONS}$${salt.toString('base64')}$${hash.toString('base64')}`;
};
const verifyHash = (pin: string, stored: string) => {
  const [kind, rounds, salt, expected] = stored.split('$');
  if (kind !== 'pbkdf2' || Number(rounds) !== ITERATIONS || !salt || !expected) return false;
  const actual = pbkdf2Sync(pin, Buffer.from(salt, 'base64'), ITERATIONS, 32, 'sha256');
  const target = Buffer.from(expected, 'base64');
  return actual.length === target.length && timingSafeEqual(actual, target);
};
const cleanText = (value: unknown, max: number) => String(value || '').trim().slice(0, max);
const verifySharedPin = async (pin: string, uid: string, email: string) => {
  if (!/^\d{10}$/.test(pin)) throw new HttpsError('invalid-argument', 'Le code PIN doit contenir 10 chiffres.');
  const attemptRef = db.collection('candidatePinAttempts').doc(createHash('sha256').update(uid).digest('hex'));
  const attempt = await attemptRef.get();
  const lockedUntil = attempt.get('lockedUntil')?.toDate?.() as Date | undefined;
  if (lockedUntil && lockedUntil.getTime() > Date.now()) throw new HttpsError('resource-exhausted', 'Trop de tentatives. Réessayez dans 15 minutes.');
  const config = await db.doc('candidateAccess/shared').get();
  const storedHash = config.get('pinHash');
  const valid = typeof storedHash === 'string' && verifyHash(pin, storedHash);
  if (!valid) {
    const count = Number(attempt.get('attempts') || 0) + 1;
    await attemptRef.set({
      attempts: count >= 5 ? 0 : count,
      lockedUntil: count >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });
    throw new HttpsError('permission-denied', 'Code PIN invalide ou accès temporairement bloqué.');
  }
  await attemptRef.delete().catch(() => undefined);
  const candidates = await db.collection('candidates').where('google_email', '==', email).limit(2).get();
  const candidate = candidates.docs.find(item => item.get('is_office_profile') !== true);
  if (!candidate) throw new HttpsError('not-found', 'Aucun profil candidat associé à cette adresse Google.');
  return candidate;
};

export const setSharedCandidatePin = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  requireAdmin(request);
  const pin = String(request.data?.pin || '');
  if (!/^\d{10}$/.test(pin)) throw new HttpsError('invalid-argument', 'Le PIN doit contenir exactement 10 chiffres.');
  await db.doc('candidateAccess/shared').set({ pinHash: hashPin(pin), updatedAt: FieldValue.serverTimestamp() });
  return { success: true };
});

export const getSharedCandidatePinStatus = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  requireAdmin(request);
  const snapshot = await db.doc('candidateAccess/shared').get();
  const updatedAt = snapshot.get('updatedAt')?.toDate?.();
  return { configured: snapshot.exists && typeof snapshot.get('pinHash') === 'string', updatedAt: updatedAt?.toISOString() || null };
});

export const createCandidateProfile = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  requireAdmin(request);
  const name = cleanText(request.data?.name, 120);
  const email = cleanText(request.data?.email, 254).toLowerCase();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpsError('invalid-argument', 'Nom et adresse Google du candidat obligatoires.');
  const existing = await db.collection('candidates').where('google_email', '==', email).limit(1).get();
  if (!existing.empty) throw new HttpsError('already-exists', 'Cette adresse Google est déjà associée à un profil.');
  const ref = await db.collection('candidates').add({
    name, google_email: email, profile_status: 'draft', is_published: false,
    is_active: true, is_office_profile: false, candidate_number: null,
    created_at: FieldValue.serverTimestamp(), updated_at: FieldValue.serverTimestamp(),
  });
  return { candidateId: ref.id };
});

export const verifyCandidatePin = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  const { uid, email } = requireGoogleUser(request);
  const candidate = await verifySharedPin(String(request.data?.pin || ''), uid, email);
  return { success: true, candidateId: candidate.id, candidateName: candidate.get('name') || '' };
});

export const submitCandidateProfile = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  const { uid, email } = requireGoogleUser(request);
  const candidate = await verifySharedPin(String(request.data?.pin || ''), uid, email);
  if (candidate.id !== String(request.data?.candidateId || '')) throw new HttpsError('permission-denied', 'Le profil candidat ne correspond pas à ce compte.');
  const profile = request.data?.profile || {};
  const photoPath = String(profile.photoPath || '');
  if (!photoPath.startsWith(`candidate-submissions/${uid}/`)) throw new HttpsError('invalid-argument', 'Chemin de photo invalide.');
  const file = getStorage().bucket().file(photoPath);
  const [metadata] = await file.getMetadata().catch(() => [null]);
  if (!metadata || !['image/jpeg', 'image/png', 'image/webp'].includes(String(metadata.contentType))
      || Number(metadata.size || 0) > 5 * 1024 * 1024) {
    throw new HttpsError('invalid-argument', 'Photo invalide ou trop volumineuse.');
  }
  const downloadToken = randomUUID();
  await file.setMetadata({ metadata: { firebaseStorageDownloadTokens: downloadToken } });
  const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${getStorage().bucket().name}/o/${encodeURIComponent(photoPath)}?alt=media&token=${downloadToken}`;
  await candidate.ref.update({
    name: cleanText(profile.name, 120),
    photo_url: downloadUrl,
    profession: profile.profession || {},
    education_level: profile.education_level || {},
    diplomas: profile.diplomas || {},
    experience: profile.experience || {},
    skills: profile.skills || {},
    motivation: profile.motivation || {},
    profile_status: 'pending',
    is_published: false,
    is_active: true,
    submitted_at: new Date().toISOString(),
    updated_at: FieldValue.serverTimestamp(),
  });
  await db.collection('publishedCandidates').doc(candidate.id).delete();
  return { success: true };
});

export const reviewCandidateProfile = onCall({ region: 'europe-west1', enforceAppCheck: false }, async request => {
  requireAdmin(request);
  const id = cleanText(request.data?.candidateId, 128);
  const status = request.data?.status;
  if (!id || !['approved', 'rejected'].includes(status)) {
    throw new HttpsError('invalid-argument', 'Profil ou décision de modération invalide.');
  }
  const candidateRef = db.collection('candidates').doc(id);
  const publicRef = db.collection('publishedCandidates').doc(id);
  await db.runTransaction(async transaction => {
    const candidate = await transaction.get(candidateRef);
    if (!candidate.exists) throw new HttpsError('not-found', 'Profil candidat introuvable.');
    const data = candidate.data() || {};
    const published = status === 'approved';
    if (published && (data.is_office_profile === true || data.is_active === false)) {
      throw new HttpsError('failed-precondition', 'Ce profil ne peut pas être publié.');
    }
    transaction.update(candidateRef, {
      profile_status: status,
      is_published: published,
      updated_at: FieldValue.serverTimestamp(),
    });
    if (published) transaction.set(publicRef, publicCandidateFields(data));
    else transaction.delete(publicRef);
  });
  return { success: true, status, is_published: status === 'approved' };
});
