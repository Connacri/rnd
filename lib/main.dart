import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'app/app.dart';

import 'core/constants/supabase_constants.dart';
import 'core/providers/language_provider.dart';
import 'features/auth/providers/auth_provider.dart';
import 'features/membership/providers/membership_provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Les clés sont injectées via --dart-define (voir .env.example et le
  // workflow CI). Un build sans ces valeurs est mal configuré : on préfère
  // échouer immédiatement et lisiblement plutôt que de laisser
  // Supabase.initialize() échouer plus loin avec une erreur réseau opaque.
  if (SupabaseConstants.url.isEmpty || SupabaseConstants.anonKey.isEmpty) {
    const message =
        'SUPABASE_URL / SUPABASE_ANON_KEY manquants.\n'
        'En local : flutter run --dart-define-from-file=.env (voir .env.example)\n'
        'En CI : vérifiez les secrets SUPABASE_URL / SUPABASE_ANON_KEY.';
    if (kDebugMode) {
      debugPrint('⚠️  $message');
    }
    throw StateError(message);
  }

  await Supabase.initialize(
    url: SupabaseConstants.url,
    publishableKey: SupabaseConstants.anonKey,
  );

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => LanguageProvider()..loadSavedLang()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MembershipProvider()),
      ],
      child: const CampaignApp(),
    ),
  );
}
