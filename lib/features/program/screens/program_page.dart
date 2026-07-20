import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/core/services/program_data.dart';

class ProgramPage extends StatelessWidget {
  const ProgramPage({super.key});

  @override
  Widget build(BuildContext context) {
    final pillars = ProgramData.getPillars();
    return Scaffold(
      appBar: AppBar(
        title: Text(TranslationService.t('programTitle')),
        backgroundColor: const Color(0xFF0a1628),
        foregroundColor: Colors.white,
      ),
      backgroundColor: const Color(0xFF0a1628),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
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
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x330047AB), Color(0x3300A651)],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          const Text('💎', style: TextStyle(fontSize: 40)),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('slogan'),
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 16,
              fontStyle: FontStyle.italic,
              color: Colors.white.withValues(alpha: 0.9),
              height: 1.5,
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
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.white.withValues(alpha: 0.05),
            Colors.white.withValues(alpha: 0.02),
          ],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(icon, style: const TextStyle(fontSize: 36)),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: GoogleFonts.roboto(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: accentColor,
            ),
          ),
          const SizedBox(height: 12),
          ...items.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('• ', style: TextStyle(color: accentColor)),
                  Expanded(
                    child: Text(
                      item,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white.withValues(alpha: 0.6),
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: accentColor.withValues(alpha: 0.1),
              border: Border.all(color: accentColor.withValues(alpha: 0.3)),
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              tag,
              style: TextStyle(
                fontSize: 11,
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
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x330047AB), Color(0x3300A651), Color(0x19C8102E)],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            TranslationService.t('engagement'),
            style: GoogleFonts.roboto(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('engagementText1'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 15,
              height: 1.7,
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('engagementText2'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              height: 1.7,
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('engagementText3'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF00d4ff),
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFF0047AB), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFF00A651), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFFC8102E), borderRadius: BorderRadius.circular(2))),
            ],
          ),
        ],
      ),
    );
  }
}
