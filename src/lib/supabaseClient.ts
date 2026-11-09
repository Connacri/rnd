import { createClient } from '@supabase/supabase-js';
import { firebaseAuth } from './firebase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://liveclvibiqcpekanfbp.supabase.co';
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_mzz76HbzQ5g9EtFmk-p51Q_4Ut6sW6_';

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  accessToken: async () => {
    const firebaseUser = firebaseAuth.currentUser;
    return firebaseUser ? firebaseUser.getIdToken() : null;
  },
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
