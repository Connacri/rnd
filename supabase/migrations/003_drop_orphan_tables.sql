-- 003_drop_orphan_tables.sql
--
-- Suppression des tables présentes dans le projet Supabase mais absentes
-- du code Flutter (aucune lecture/écriture dans lib/), toutes vides :
--
--   branches, staffs, type_activites, activite_jours, time_offs,
--   planifications, planning_hebdos
--
-- Ces tables étaient en plus exposées sans Row Level Security (RLS) :
-- lisible/modifiable par quiconque possède l'anon key.

DROP TABLE IF EXISTS public.branches CASCADE;
DROP TABLE IF EXISTS public.staffs CASCADE;
DROP TABLE IF EXISTS public.type_activites CASCADE;
DROP TABLE IF EXISTS public.activite_jours CASCADE;
DROP TABLE IF EXISTS public.time_offs CASCADE;
DROP TABLE IF EXISTS public.planifications CASCADE;
DROP TABLE IF EXISTS public.planning_hebdos CASCADE;
