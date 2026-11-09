import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const enc = new TextEncoder();
const ITERATIONS = 310000;
const b64 = (v: Uint8Array) => btoa(String.fromCharCode(...v));
const unb64 = (v: string) => Uint8Array.from(atob(v), c => c.charCodeAt(0));

async function hashPin(pin: string, salt = crypto.getRandomValues(new Uint8Array(16))) {
  const key = await crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, ["deriveBits"]);
  const bits = new Uint8Array(await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS }, key, 256
  ));
  return `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(bits)}`;
}
async function verifyPin(pin: string, stored: string) {
  const [kind, iterations, salt, expected] = stored.split("$");
  if (kind !== "pbkdf2" || Number(iterations) !== ITERATIONS || !salt || !expected) return false;
  const actual = await hashPin(pin, unb64(salt));
  const a = unb64(actual.split("$")[3]), b = unb64(expected);
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
async function ipKey(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const digest = await crypto.subtle.digest("SHA-256", enc.encode(ip));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}
function normalizeEmail(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const db = createClient(url, serviceKey);
  const body = await req.json().catch(() => null);
  if (!body || typeof body.action !== "string") return json({ error: "Invalid request" }, 400);

  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return json({ error: "Authentification requise." }, 401);
  const auth = createClient(url, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: authData, error: authError } = await auth.auth.getUser(token);
  const user = authData?.user;
  if (authError || !user) return json({ error: "Session Google invalide. Reconnectez-vous." }, 401);

  const isAdmin = user.app_metadata?.role === "admin";
  const isGoogle = user.app_metadata?.provider === "google" ||
    (user.identities || []).some(identity => identity.provider === "google");
  const email = normalizeEmail(user.email);
  if (!isGoogle || !email || !user.email_confirmed_at) {
    return json({ error: "Connectez-vous avec un compte Google dont l'adresse e-mail est vérifiée." }, 403);
  }

  if (body.action === "set-shared-pin") {
    if (!isAdmin) return json({ error: "Accès administrateur requis." }, 403);
    const pin = String(body.pin || "");
    if (!/^\d{10}$/.test(pin)) return json({ error: "Le PIN doit contenir exactement 10 chiffres." }, 400);
    const { error } = await db.from("candidate_access_config").upsert({
      id: 1, pin_hash: await hashPin(pin), pin_lookup: "shared", updated_at: new Date().toISOString()
    });
    if (error) return json({ error: "Impossible d'enregistrer le PIN commun." }, 500);
    return json({ success: true });
  }

  if (body.action === "create") {
    if (!isAdmin) return json({ error: "Accès administrateur requis." }, 403);
    const name = String(body.name || "").trim().slice(0, 120);
    const candidateEmail = normalizeEmail(body.email);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateEmail)) {
      return json({ error: "Nom et adresse Google du candidat obligatoires." }, 400);
    }
    const { data, error } = await db.from("candidates").insert({
      name, google_email: candidateEmail, profile_status: "draft", is_published: false,
      is_active: true, pin_failed_attempts: 0, sort_order: 0
    }).select("id").single();
    if (error || !data) return json({ error: "Impossible de créer le profil. Vérifiez que cette adresse Google n'est pas déjà associée." }, 400);
    return json({ candidateId: data.id });
  }

  if (body.action === "verify" || body.action === "submit") {
    const pin = String(body.pin || "");
    if (!/^\d{10}$/.test(pin)) return json({ error: "Code PIN invalide." }, 400);

    const key = await ipKey(req);
    const { data: attempt } = await db.from("candidate_pin_attempts").select("*").eq("id", key).maybeSingle();
    if (attempt?.locked_until && new Date(attempt.locked_until).getTime() > Date.now()) {
      return json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, 423);
    }

    const { data: config } = await db.from("candidate_access_config")
      .select("pin_hash").eq("id", 1).maybeSingle();
    const validPin = !!config?.pin_hash && await verifyPin(pin, config.pin_hash);
    if (!validPin) {
      const count = (attempt?.attempts || 0) + 1;
      await db.from("candidate_pin_attempts").upsert({
        id: key, attempts: count >= 5 ? 0 : count,
        locked_until: count >= 5 ? new Date(Date.now() + 900000).toISOString() : null,
        updated_at: new Date().toISOString()
      });
      return json({ error: "Code PIN invalide ou accès temporairement bloqué." }, 401);
    }

    const { data: candidate, error: candidateError } = await db.from("candidates")
      .select("id,name,google_email")
      .ilike("google_email", email)
      .maybeSingle();
    if (candidateError || !candidate) {
      return json({ error: "Aucun profil candidat n'est associé à cette adresse Google. Contactez l'administrateur." }, 404);
    }
    await db.from("candidate_pin_attempts").delete().eq("id", key);
    if (body.action === "verify") return json({ success: true, candidateId: candidate.id, candidateName: candidate.name });

    const profile = body.profile || {};
    const path = String(profile.photoPath || "");
    const type = String(profile.photoType || "");
    if (!path.startsWith(`submissions/${candidate.id}/`) ||
        !["image/jpeg", "image/png", "image/webp"].includes(type)) {
      return json({ error: "Photo invalide." }, 400);
    }
    const { data: publicUrl } = db.storage.from("candidate-photos").getPublicUrl(path);
    const clean = (value: unknown, max: number) => String(value || "").trim().slice(0, max);
    const { error } = await db.from("candidates").update({
      name: clean(profile.name, 120), photo_url: publicUrl.publicUrl,
      profession: profile.profession || {}, education_level: profile.education_level || {},
      diplomas: profile.diplomas || {}, experience: profile.experience || {},
      skills: profile.skills || {}, motivation: profile.motivation || {},
      profile_status: "pending", is_published: false, is_active: true,
      submitted_at: new Date().toISOString(), updated_at: new Date().toISOString()
    }).eq("id", candidate.id);
    if (error) return json({ error: "Impossible d’enregistrer le profil." }, 400);
    return json({ success: true });
  }

  return json({ error: "Unknown action" }, 400);
});
