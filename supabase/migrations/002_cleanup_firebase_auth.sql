-- 002_cleanup_firebase_auth.sql
--
-- Bascule vers Firebase Auth :
--   * plus de session Supabase Auth (auth.uid() toujours NULL côté client)
--   * le user_id devient l'UID Firebase (chaîne, pas un UUID)
--   * seules les tables réellement lues par l'app sont conservées.
--
-- Tables SUPPRIMÉES (aucune lecture/écriture dans le code Flutter) :
--   users, events, candidates, programs
-- Table CONSERVÉE : memberships (formulaire d'adhésion)

-- ---------------------------------------------------------------------------
-- 1. memberships : policies existantes d'abord (elles référencent user_id,
--    on ne peut pas changer le type d'une colonne utilisée par une policy)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can insert own membership" ON memberships;
DROP POLICY IF EXISTS "Users can view own memberships" ON memberships;

-- ---------------------------------------------------------------------------
-- 2. memberships : on casse la FK vers users, user_id passe en TEXT
-- ---------------------------------------------------------------------------
ALTER TABLE memberships DROP CONSTRAINT IF EXISTS memberships_user_id_fkey;
ALTER TABLE memberships ALTER COLUMN user_id TYPE TEXT USING user_id::text;

-- ---------------------------------------------------------------------------
-- 3. Suppression des tables inutilisées
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ---------------------------------------------------------------------------
-- 4. Politiques RLS adaptées à Firebase Auth
--    (la session Supabase n'existe plus : auth.uid() est NULL)
-- ---------------------------------------------------------------------------

-- L'adhésion est un formulaire public côté app (login Firebase imposé côté
-- client). Pas de SELECT côté client : les données ne se lisent que depuis
-- le dashboard Supabase.
CREATE POLICY "Anyone can submit a membership"
  ON memberships FOR INSERT
  WITH CHECK (TRUE);

-- Guardrails anti-spam basiques (colonnes non vides, tailles raisonnables)
ALTER TABLE memberships ALTER COLUMN full_name SET NOT NULL;
ALTER TABLE memberships ALTER COLUMN email SET NOT NULL;
ALTER TABLE memberships ALTER COLUMN phone SET NOT NULL;
