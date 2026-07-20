import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import 'app/app.dart';

import 'core/providers/language_provider.dart';
import 'features/auth/providers/auth_provider.dart';
import 'features/membership/providers/membership_provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: "https://liveclvibiqcpekafnbp.supabase.co",
    publishableKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpdmVjbHZpYmlxY3Bla2FuZmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1MzM1MzgsImV4cCI6MjEwMDEwOTUzOH0.5yPrhzp8nAa4Nibp9JNCC8hWWFxKes7lr75S7mZE2Fg",
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
