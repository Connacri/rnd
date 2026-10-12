import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'app/app.dart';

import 'core/constants/supabase_constants.dart';
import 'core/providers/language_provider.dart';
import 'core/services/notification_service.dart';
import 'features/auth/providers/auth_provider.dart';
import 'features/content/providers/content_provider.dart';
import 'features/membership/providers/membership_provider.dart';
import 'firebase_options.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase (auth e-mail + Google Sign-In). Les options sont générées par
  // FlutterFire CLI dans firebase_options.dart, donc toujours présentes.
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
  } catch (e) {
    if (kDebugMode) {
      debugPrint('⚠️  Firebase.initializeApp a échoué : $e');
    }
    rethrow;
  }

  // Les clés sont injectées via --dart-define (voir .env.example et le
  // workflow CI). Un build sans ces valeurs est mal configuré : on préfère
  // échouer immédiatement et lisiblement plutôt que de laisser
  // Supabase.initialize() échouer plus loin avec une erreur réseau opaque.
  if (SupabaseConstants.url.isEmpty || SupabaseConstants.anonKey.isEmpty) {
    const message = 'SUPABASE_URL / SUPABASE_ANON_KEY manquants.\n'
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

  // FCM : permission, token, abonnement au topic "news". Best-effort —
  // un échec (ex. simulateur sans Play Services) ne doit pas bloquer l'app.
  try {
    await NotificationService.instance.init();
  } catch (e) {
    if (kDebugMode) {
      debugPrint('⚠️  NotificationService.init a échoué : $e');
    }
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
            create: (_) => LanguageProvider()..loadSavedLang()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => MembershipProvider()),
        ChangeNotifierProvider(create: (_) => ContentProvider()..load()),
      ],
      child: const CampaignApp(),
    ),
  );
}
