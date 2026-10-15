import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/app_shell.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/features/content/providers/content_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/app/theme.dart';

class CandidatePage extends StatelessWidget {
  const CandidatePage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    // Candidat : Supabase si présent, sinon libellés L10n statiques.
    final candidate = context.watch<ContentProvider>().candidate;
    final lang = TranslationService.currentLang;
    final name =
        candidate?.name.isNotEmpty == true ? candidate!.name : l.candidateName;
    final role = candidate != null && candidate.roleFor(lang).isNotEmpty
        ? candidate.roleFor(lang)
        : l.secretary;
    final party = candidate != null && candidate.partyFor(lang).isNotEmpty
        ? candidate.partyFor(lang)
        : l.party;
    final biography =
        candidate != null && candidate.biographyFor(lang).isNotEmpty
            ? candidate.biographyFor(lang)
            : l.visionText;
    final photoUrl = candidate?.photoUrl;
    return AppShell(
      currentRoute: AppRoutes.candidate,
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const SizedBox(height: 16),
          Center(
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.ink, width: 4),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.ink.withValues(alpha: 0.3),
                    blurRadius: 40,
                  ),
                ],
              ),
              child: ClipOval(
                child: photoUrl != null && photoUrl.isNotEmpty
                    ? Image.network(
                        photoUrl,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => Image.asset(
                          'assets/images/nabil-zenasni-profile2.jpg',
                          fit: BoxFit.cover,
                          errorBuilder: (_, __, ___) => const Icon(
                            Icons.person,
                            size: 60,
                            color: AppColors.ink,
                          ),
                        ),
                      )
                    : Image.asset(
                        'assets/images/nabil-zenasni-profile2.jpg',
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) => const Icon(
                          Icons.person,
                          size: 60,
                          color: AppColors.ink,
                        ),
                      ),
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text(
            name,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            role,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppColors.ink,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            l.algeria,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: AppColors.zinc700,
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.amber400,
                borderRadius: BorderRadius.circular(50),
              ),
              child: Text(
                party,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 2,
                  color: AppColors.ink,
                ),
              ),
            ),
          ),
          const SizedBox(height: 32),
          _SectionTitle(l.ourVision),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppColors.amber200.withValues(alpha: 0.2),
                  AppColors.amber400.withValues(alpha: 0.1)
                ],
              ),
              border:
                  Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '"',
                  style: TextStyle(
                    fontSize: 72,
                    color: AppColors.ink.withValues(alpha: 0.1),
                    height: 0.6,
                  ),
                ),
                Text(
                  biography,
                  style: TextStyle(
                    fontSize: 15,
                    color: AppColors.zinc700,
                    height: 1.8,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          _SectionTitle(l.commitment),
          const SizedBox(height: 12),
          Text(
            l.commitmentText,
            style: TextStyle(
              fontSize: 14,
              color: AppColors.zinc700,
              height: 1.8,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  AppColors.amber200.withValues(alpha: 0.2),
                  AppColors.amber400.withValues(alpha: 0.1)
                ],
              ),
              border:
                  Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                const Text('💡', style: TextStyle(fontSize: 28)),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    l.approach,
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.zinc700,
                      height: 1.6,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          _SectionTitle(l.ourValues),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 2.5,
            children: [
              _ValueCard(
                  icon: '🤝', title: l.proximity, subtitle: l.proximityDesc),
              _ValueCard(
                  icon: '💡', title: l.innovation, subtitle: l.innovationDesc),
              _ValueCard(
                  icon: '⚖️',
                  title: l.transparency,
                  subtitle: l.transparencyDesc),
              _ValueCard(
                  icon: '🌱',
                  title: l.development,
                  subtitle: l.developmentDesc),
            ],
          ),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String text;
  const _SectionTitle(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.roboto(
        fontSize: 22,
        fontWeight: FontWeight.w900,
        color: AppColors.ink,
      ),
    );
  }
}

class _ValueCard extends StatelessWidget {
  final String icon;
  final String title;
  final String subtitle;

  const _ValueCard({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.ink,
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 28)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(title,
                    style: const TextStyle(
                        fontWeight: FontWeight.w700,
                        fontSize: 16,
                        color: AppColors.ink)),
                const SizedBox(height: 2),
                Text(subtitle,
                    style: TextStyle(fontSize: 13, color: AppColors.zinc500)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
