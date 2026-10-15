import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/app_shell.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/features/content/providers/content_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/app/theme.dart';

class ProgramPage extends StatelessWidget {
  const ProgramPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    // Pillars : Supabase si présent, repli automatique sur ProgramData.
    final pillars = context.watch<ContentProvider>().pillars;
    return AppShell(
      currentRoute: AppRoutes.program,
      child: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Text(
            l.programTitle,
            style: const TextStyle(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 16),
          _SloganCard(),
          const SizedBox(height: 16),
          ...pillars.map((p) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: _PillarCard(
                  number: p.number,
                  icon: p.icon,
                  title: p.title,
                  subtitle: p.subtitle,
                  accentColor: p.accentColor,
                  items: p.items,
                  tag: p.tag,
                ),
              )),
          _EngagementSection(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _SloganCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.amber200.withValues(alpha: 0.30), Colors.white],
        ),
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          const Text('💎', style: TextStyle(fontSize: 48)),
          const SizedBox(height: 16),
          Text(
            l.slogan,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 18,
              fontStyle: FontStyle.italic,
              color: AppColors.zinc700,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }
}

class _PillarCard extends StatelessWidget {
  final String number;
  final String icon;
  final String title;
  final String subtitle;
  final Color accentColor;
  final List<String> items;
  final String tag;

  const _PillarCard({
    required this.number,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.accentColor,
    required this.items,
    required this.tag,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(icon, style: const TextStyle(fontSize: 40)),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  title,
                  style: GoogleFonts.roboto(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: AppColors.ink,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: accentColor,
            ),
          ),
          const SizedBox(height: 16),
          ...items.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('• ',
                      style: TextStyle(color: accentColor, fontSize: 16)),
                  Expanded(
                    child: Text(
                      item,
                      style: TextStyle(
                        fontSize: 15,
                        color: AppColors.zinc700,
                        height: 1.5,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: accentColor.withValues(alpha: 0.1),
              border: Border.all(color: accentColor.withValues(alpha: 0.3)),
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              tag,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: accentColor,
                letterSpacing: 1,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _EngagementSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Container(
      padding: const EdgeInsets.all(40),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.amber200.withValues(alpha: 0.30),
            Colors.white,
            AppColors.amber200.withValues(alpha: 0.15),
          ],
        ),
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            l.engagement,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 20),
          Text(
            l.engagementText1,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 17,
              height: 1.7,
              color: AppColors.ink.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            l.engagementText2,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              height: 1.7,
              color: AppColors.ink.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 20),
          Text(
            l.engagementText3,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: AppColors.ink,
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                  width: 32,
                  height: 4,
                  decoration: BoxDecoration(
                      color: const Color(0xFF0047AB),
                      borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(
                  width: 32,
                  height: 4,
                  decoration: BoxDecoration(
                      color: const Color(0xFF00A651),
                      borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(
                  width: 32,
                  height: 4,
                  decoration: BoxDecoration(
                      color: const Color(0xFFC8102E),
                      borderRadius: BorderRadius.circular(2))),
            ],
          ),
        ],
      ),
    );
  }
}
