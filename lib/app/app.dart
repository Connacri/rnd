import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/app/theme.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/features/auth/screens/login_page.dart';
import 'package:rnd_campaign_app/features/auth/screens/register_page.dart';
import 'package:rnd_campaign_app/features/home/screens/home_page.dart';
import 'package:rnd_campaign_app/features/candidate/screens/candidate_page.dart';
import 'package:rnd_campaign_app/features/program/screens/program_page.dart';
import 'package:rnd_campaign_app/features/membership/screens/membership_form_page.dart';
import 'package:rnd_campaign_app/features/events/screens/events_page.dart';

class CampaignApp extends StatelessWidget {
  const CampaignApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<LanguageProvider>(
      builder: (context, langProvider, _) {
        return MaterialApp(
          title: TranslationService.t('appName'),
          debugShowCheckedModeBanner: false,
          theme: AppTheme.lightTheme,
          localizationsDelegates: [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: const [
            Locale('fr'),
            Locale('ar'),
            Locale('en'),
          ],
          locale: Locale(langProvider.lang),
          builder: (context, child) {
            return Directionality(
              textDirection: langProvider.isRtl ? TextDirection.rtl : TextDirection.ltr,
              child: child!,
            );
          },
          initialRoute: AppRoutes.home,
          routes: {
            AppRoutes.login: (_) => const LoginPage(),
            AppRoutes.register: (_) => const RegisterPage(),
            AppRoutes.home: (_) => const HomePage(),
            AppRoutes.candidate: (_) => const CandidatePage(),
            AppRoutes.program: (_) => const ProgramPage(),
            AppRoutes.membership: (_) => const MembershipFormPage(),
            AppRoutes.events: (_) => const EventsPage(),
          },
        );
      },
    );
  }
}
