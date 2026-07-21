import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';

class CandidatePage extends StatelessWidget {
  const CandidatePage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(l.candidate),
        backgroundColor: const Color(0xFF0a1628),
        foregroundColor: Colors.white,
      ),
      backgroundColor: const Color(0xFF0a1628),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const SizedBox(height: 16),
          Center(
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: const Color(0xFF00d4ff), width: 4),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFF00d4ff).withValues(alpha: 0.3),
                    blurRadius: 40,
                  ),
                ],
              ),
              child: ClipOval(
                child: Image.asset(
                  'assets/images/nabil-zenasni-profile2.jpg',
                  fit: BoxFit.cover,
                  errorBuilder: (_, __, ___) => const Icon(
                    Icons.person,
                    size: 60,
                    color: Colors.white,
                  ),
                ),
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text(
            l.candidateName,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            l.secretary,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: Color(0xFF00d4ff),
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            l.algeria,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 13,
              color: Colors.white.withValues(alpha: 0.6),
            ),
          ),
          const SizedBox(height: 16),
          Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0047AB), Color(0xFF00A651)],
                ),
                borderRadius: BorderRadius.circular(50),
              ),
              child: Text(
                l.party,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  letterSpacing: 2,
                  color: Colors.white,
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
              gradient: const LinearGradient(
                colors: [Color(0x260047AB), Color(0x1A00A651)],
              ),
              border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '"',
                  style: TextStyle(
                    fontSize: 72,
                    color: const Color(0xFF00d4ff).withValues(alpha: 0.1),
                    height: 0.6,
                  ),
                ),
                Text(
                  l.visionText,
                  style: TextStyle(
                    fontSize: 15,
                    color: Colors.white.withValues(alpha: 0.7),
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
              color: Colors.white.withValues(alpha: 0.7),
              height: 1.8,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0x260047AB), Color(0x1A00A651)],
              ),
              border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              children: [
                const Text('💡', style: TextStyle(fontSize: 24)),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    l.approach,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white.withValues(alpha: 0.7),
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
              _ValueCard(icon: '🤝', title: l.proximity, subtitle: l.proximityDesc),
              _ValueCard(icon: '💡', title: l.innovation, subtitle: l.innovationDesc),
              _ValueCard(icon: '⚖️', title: l.transparency, subtitle: l.transparencyDesc),
              _ValueCard(icon: '🌱', title: l.development, subtitle: l.developmentDesc),
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
        color: Colors.white,
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
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.05),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 22)),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Colors.white)),
                Text(subtitle, style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.5))),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
