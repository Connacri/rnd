import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const input = process.argv[2] || 'supabase-candidates.json';
const rows = JSON.parse(await readFile(input, 'utf8'));
if (!Array.isArray(rows)) throw new Error('The export must be a JSON array of candidate records.');

initializeApp({ credential: applicationDefault(), projectId: 'rnd-aet', storageBucket: 'rnd-aet.firebasestorage.app' });
const db = getFirestore();
const bucket = getStorage().bucket();
let imported = 0;

for (const row of rows) {
  const id = String(row.id || '').trim();
  if (!id) { console.warn('Skipping a candidate without an id.'); continue; }
  let photoUrl = row.photo_url || null;
  if (photoUrl && /^https?:\/\//i.test(photoUrl)) {
    try {
      const response = await fetch(photoUrl);
      if (response.ok) {
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        if (['image/jpeg', 'image/png', 'image/webp'].includes(contentType)) {
          const ext = contentType === 'image/png' ? 'png' : contentType === 'image/webp' ? 'webp' : 'jpg';
          const path = `candidate-submissions/imported/${id}.${ext}`;
          const token = randomUUID();
          await bucket.file(path).save(Buffer.from(await response.arrayBuffer()), {
            resumable: false,
            metadata: { contentType, metadata: { firebaseStorageDownloadTokens: token } },
          });
          photoUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
        }
      }
    } catch (error) {
      console.warn(`Could not migrate photo for candidate ${id}:`, error instanceof Error ? error.message : error);
    }
  }
  const clean = { ...row };
  for (const key of ['candidate_pin_hash', 'pin_failed_attempts', 'pin_locked_until', 'created_at', 'updated_at']) delete clean[key];
  await db.collection('candidates').doc(id).set({
    ...clean,
    photo_url: photoUrl,
    google_email: String(row.google_email || '').trim().toLowerCase() || null,
    candidate_number: row.candidate_number ?? null,
    is_office_profile: row.is_office_profile === true,
    is_active: row.is_active !== false,
    is_published: row.is_published === true,
    profile_status: row.profile_status || 'draft',
    created_at: row.created_at ? new Date(row.created_at) : FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
  }, { merge: true });
  imported += 1;
}
console.log(`Imported ${imported} candidate profiles into Firestore.`);
