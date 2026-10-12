class SupabaseConstants {
  /// Injectées au build via --dart-define ou --dart-define-from-file=.env
  /// Ne JAMAIS committer de vraies valeurs ici : voir .env.example.
  static const String url = String.fromEnvironment('SUPABASE_URL');
  static const String anonKey = String.fromEnvironment('SUPABASE_ANON_KEY');

  /// Tables du projet. L'authentification est gérée par Firebase Auth,
  /// pas par Supabase : les tables de contenu sont en lecture publique
  /// (RLS SELECT), l'écriture se fait depuis le dashboard Supabase.
  static const String tableMemberships = 'memberships';
  static const String tablePrograms = 'programs';
  static const String tableProgramItems = 'program_items';
  static const String tableEvents = 'events';
  static const String tableCandidates = 'candidates';
  static const String tableNews = 'news';
  static const String tableHomeStats = 'home_stats';
}
