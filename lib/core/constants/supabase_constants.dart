class SupabaseConstants {
  /// Injectées au build via --dart-define ou --dart-define-from-file=.env
  /// Ne JAMAIS committer de vraies valeurs ici : voir .env.example.
  static const String url = String.fromEnvironment('SUPABASE_URL');
  static const String anonKey = String.fromEnvironment('SUPABASE_ANON_KEY');

  static const String tableUsers = 'users';
  static const String tableMemberships = 'memberships';
  static const String tableEvents = 'events';
  static const String tableCandidates = 'candidates';
  static const String tablePrograms = 'programs';
}
