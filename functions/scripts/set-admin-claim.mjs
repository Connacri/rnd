import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error('Usage: GOOGLE_APPLICATION_CREDENTIALS=/path/service-account.json node scripts/set-admin-claim.mjs admin@example.com');
  process.exit(1);
}
initializeApp({ credential: applicationDefault(), projectId: 'rnd-aet' });
const user = await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid, { ...(user.customClaims || {}), admin: true, role: 'admin' });
console.log(`Admin claim assigned to ${email} (${user.uid}). Ask the user to sign out and sign in again.`);
