-- 004_content_tables.sql
--
-- Tables de contenu éditable par l'administrateur depuis le dashboard
-- Supabase (Table Editor). L'application ne fait que LIRE ces tables.
--
-- Conventions :
--   * les champs textuels visibles par l'utilisateur sont en JSONB
--     localisé {"fr": "...", "en": "...", "ar": "..."} ; l'app applique
--     un repli sur "fr" si la langue demandée est absente.
--   * RLS activée : SELECT public (anon), aucune policy d'écriture
--     côté client — seuls le dashboard / le service role écrivent.
--   * L'app Flutter garde des données statiques de secours (fallback)
--     si les tables sont vides ou injoignables.

-- ---------------------------------------------------------------------------
-- Programme (piliers)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.programs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number       text NOT NULL DEFAULT '01',          -- '01' .. '06'
  icon         text NOT NULL DEFAULT '💼',          -- emoji
  accent_color text NOT NULL DEFAULT '#00d4ff',     -- hex
  title        jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  subtitle     jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  tag          jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  sort_order   int  NOT NULL DEFAULT 0,
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Points du programme (listes de promesses sous chaque pilier)
CREATE TABLE IF NOT EXISTS public.program_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id  uuid NOT NULL REFERENCES public.programs(id) ON DELETE CASCADE,
  text        jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  sort_order  int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Événements
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  description  jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  location     jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  event_date   timestamptz,
  image_url    text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order   int NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Candidat(s) / équipe
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.candidates (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  role        jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  party       jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  biography   jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  photo_url   text,
  sort_order  int NOT NULL DEFAULT 0,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Infos / actualités (source des notifications FCM "infos")
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  body          jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  image_url     text,
  is_published  boolean NOT NULL DEFAULT true,
  push_sent_at  timestamptz,          -- renseigné par la function FCM
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Chiffres de la page d'accueil (stats : 451 mairies, 6521 élus, ...)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.home_stats (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon       text NOT NULL DEFAULT '🏛️',
  number     text NOT NULL,
  label      jsonb NOT NULL DEFAULT '{"fr":"","en":"","ar":""}',
  sort_order int NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- Index
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_program_items_program ON public.program_items(program_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC NULLS LAST, sort_order);
CREATE INDEX IF NOT EXISTS idx_news_created ON public.news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_candidates_sort ON public.candidates(sort_order);

-- ---------------------------------------------------------------------------
-- RLS : lecture publique uniquement (écriture via dashboard/service role)
-- ---------------------------------------------------------------------------
ALTER TABLE public.programs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.program_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_stats    ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['programs','program_items','events','candidates','news','home_stats'] LOOP
    EXECUTE format(
      'CREATE POLICY "Public read %I" ON public.%I FOR SELECT USING (true)', t, t);
  END LOOP;
END $$;
