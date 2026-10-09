import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:rnd_campaign_app/core/constants/supabase_constants.dart';

/// Accès en lecture aux tables de contenu éditables depuis le dashboard
/// Supabase (programme, évènements, candidat, chiffres, actualités).
///
/// RLS : SELECT public uniquement. Toute écriture passe par le dashboard
/// (service role) — jamais par l'app.
class ContentService {
  final _client = Supabase.instance.client;

  Future<List<Map<String, dynamic>>> fetchPrograms() async {
    final rows = await _client
        .from(SupabaseConstants.tablePrograms)
        .select()
        .eq('is_active', true)
        .order('sort_order');
    return rows;
  }

  Future<List<Map<String, dynamic>>> fetchProgramItems() async {
    final rows = await _client
        .from(SupabaseConstants.tableProgramItems)
        .select()
        .order('sort_order');
    return rows;
  }

  Future<List<Map<String, dynamic>>> fetchEvents() async {
    final rows = await _client
        .from(SupabaseConstants.tableEvents)
        .select()
        .eq('is_published', true)
        .order('event_date', ascending: false);
    return rows;
  }

  Future<List<Map<String, dynamic>>> fetchCandidates() async {
    final rows = await _client
        .from(SupabaseConstants.tableCandidates)
        .select()
        .eq('is_active', true)
        .order('sort_order');
    return rows;
  }

  Future<List<Map<String, dynamic>>> fetchHomeStats() async {
    final rows = await _client
        .from(SupabaseConstants.tableHomeStats)
        .select()
        .eq('is_active', true)
        .order('sort_order');
    return rows;
  }

  Future<List<Map<String, dynamic>>> fetchNews({int limit = 20}) async {
    final rows = await _client
        .from(SupabaseConstants.tableNews)
        .select()
        .eq('is_published', true)
        .order('created_at', ascending: false)
        .limit(limit);
    return rows;
  }
}
