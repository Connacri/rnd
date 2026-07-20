import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0a1628),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const _LanguageSwitcher(),
            const _HeroSection(),
            _StatsSection(),
            _AboutSection(),
            _QuickLinksSection(),
            _FooterSection(),
          ],
        ),
      ),
    );
  }
}

class _LanguageSwitcher extends StatelessWidget {
  const _LanguageSwitcher();

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<LanguageProvider>();
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 12, 24, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          _LangButton(label: 'FR', langCode: 'fr', currentLang: lang.lang, onTap: () => lang.setLang('fr')),
          const SizedBox(width: 8),
          _LangButton(label: 'AR', langCode: 'ar', currentLang: lang.lang, onTap: () => lang.setLang('ar')),
          const SizedBox(width: 8),
          _LangButton(label: 'EN', langCode: 'en', currentLang: lang.lang, onTap: () => lang.setLang('en')),
        ],
      ),
    );
  }
}

class _LangButton extends StatelessWidget {
  final String label;
  final String langCode;
  final String currentLang;
  final VoidCallback onTap;

  const _LangButton({
    required this.label,
    required this.langCode,
    required this.currentLang,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isActive = currentLang == langCode;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFF00d4ff) : Colors.transparent,
          border: Border.all(color: isActive ? const Color(0xFF00d4ff) : Colors.white.withValues(alpha: 0.3)),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isActive ? Colors.white : Colors.white70,
            fontWeight: FontWeight.w700,
            fontSize: 13,
          ),
        ),
      ),
    );
  }
}

class _HeroSection extends StatelessWidget {
  const _HeroSection();

  @override
  Widget build(BuildContext context) {
    final togetherParts = TranslationService.t('together').split(TranslationService.t('togetherHighlight'));

    return Container(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 40),
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFF0a1628), Color(0xFF0d1b2a)],
        ),
      ),
      child: Column(
        children: [
          const SizedBox(height: 20),
          Container(
            width: 120,
            height: 120,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFF00d4ff), width: 3),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF00d4ff).withValues(alpha: 0.3),
                  blurRadius: 30,
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
          const SizedBox(height: 16),
          Text(
            TranslationService.t('elections2026'),
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF00d4ff),
              letterSpacing: 3,
            ),
          ),
          const SizedBox(height: 12),
          Text.rich(
            TextSpan(
              children: [
                TextSpan(text: togetherParts.isNotEmpty ? togetherParts[0] : ''),
                TextSpan(
                  text: TranslationService.t('togetherHighlight'),
                  style: TextStyle(
                    color: const Color(0xFF00d4ff),
                    fontFamily: GoogleFonts.roboto().fontFamily,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                TextSpan(text: togetherParts.length > 1 ? togetherParts[1] : ''),
              ],
            ),
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: Colors.white,
              height: 1.1,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('description'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withValues(alpha: 0.65),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          _AudioPlayerWidget(),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _HeroButton(
                label: TranslationService.t('ourProgram'),
                onTap: () => Navigator.pushNamed(context, AppRoutes.program),
                primary: true,
              ),
              const SizedBox(width: 12),
              _HeroButton(
                label: TranslationService.t('joinUs'),
                onTap: () => Navigator.pushNamed(context, AppRoutes.membership),
                primary: false,
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _AudioPlayerWidget extends StatefulWidget {
  @override
  State<_AudioPlayerWidget> createState() => _AudioPlayerWidgetState();
}

class _AudioPlayerWidgetState extends State<_AudioPlayerWidget> {
  bool _isPlaying = false;

  void _togglePlay() {
    setState(() {
      _isPlaying = !_isPlaying;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x330047AB), Color(0x2A00A651)],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(50),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          GestureDetector(
            onTap: _togglePlay,
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: const Color(0xFF00d4ff)),
                color: _isPlaying
                    ? const Color(0xFF00d4ff)
                    : const Color(0xFF00d4ff).withValues(alpha: 0.15),
              ),
              child: Center(
                child: Text(
                  _isPlaying ? '⏸' : '▶',
                  style: const TextStyle(color: Colors.white, fontSize: 14),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          ...List.generate(6, (i) => Container(
            width: 3,
            height: _isPlaying ? [12, 18, 8, 16, 10, 14][i].toDouble() : 4,
            margin: const EdgeInsets.symmetric(horizontal: 1.5),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter,
                colors: [Color(0xFF00d4ff), Color(0xFFd4af37)],
              ),
              borderRadius: BorderRadius.circular(2),
            ),
          )),
          const SizedBox(width: 12),
          Text(
            TranslationService.t('audioMessage'),
            style: TextStyle(
              fontSize: 12,
              color: Colors.white.withValues(alpha: 0.7),
            ),
          ),
        ],
      ),
    );
  }
}

class _HeroButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  final bool primary;

  const _HeroButton({
    required this.label,
    required this.onTap,
    required this.primary,
  });

  @override
  Widget build(BuildContext context) {
    if (primary) {
      return ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xFF00d4ff),
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
        ),
        child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
      );
    }
    return OutlinedButton(
      onPressed: onTap,
      style: OutlinedButton.styleFrom(
        foregroundColor: Colors.white,
        side: BorderSide(color: Colors.white.withValues(alpha: 0.3)),
        padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
      ),
      child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
    );
  }
}

class _StatsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x4D0047AB), Color(0x3300A651)],
        ),
        border: Border(
          top: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
          bottom: BorderSide(color: Colors.white.withValues(alpha: 0.15)),
        ),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final itemWidth = (constraints.maxWidth - 16) / 2;
          return Wrap(
            spacing: 16,
            runSpacing: 16,
            children: [
              SizedBox(width: itemWidth, child: _StatItem(icon: '🏛️', number: '451', label: TranslationService.t('mairiesRnd'))),
              SizedBox(width: itemWidth, child: _StatItem(icon: '👥', number: '6 521', label: TranslationService.t('elusCommunaux'))),
              SizedBox(width: itemWidth, child: _StatItem(icon: '🏛️', number: '58', label: TranslationService.t('deputesApn'))),
              SizedBox(width: itemWidth, child: _StatItem(icon: '📅', number: '28', label: TranslationService.t('yearsEngagement'))),
            ],
          );
        },
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String icon;
  final String number;
  final String label;

  const _StatItem({
    required this.icon,
    required this.number,
    required this.label,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(icon, style: const TextStyle(fontSize: 22)),
          const SizedBox(height: 4),
          ShaderMask(
            shaderCallback: (bounds) => const LinearGradient(
              colors: [Color(0xFF00d4ff), Color(0xFFd4af37)],
            ).createShader(bounds),
            child: Text(
              number,
              style: GoogleFonts.roboto(
                fontSize: 18,
                fontWeight: FontWeight.w900,
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: TextStyle(
              fontSize: 10,
              color: Colors.white.withValues(alpha: 0.5),
              letterSpacing: 1,
            ),
          ),
        ],
      ),
    );
  }
}

class _AboutSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
            decoration: BoxDecoration(
              border: Border.all(color: const Color(0xFF00d4ff).withValues(alpha: 0.3)),
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              TranslationService.t('whoWeAre'),
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: const Color(0xFF00d4ff),
                letterSpacing: 3,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('rndDescription'),
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('rndDescText'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withValues(alpha: 0.6),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 24),
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
                    fontSize: 64,
                    color: const Color(0xFF00d4ff).withValues(alpha: 0.1),
                    height: 0.8,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  TranslationService.t('ourVision'),
                  style: GoogleFonts.roboto(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  TranslationService.t('visionText'),
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.white.withValues(alpha: 0.7),
                    height: 1.7,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Text(
            TranslationService.t('commitment'),
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF00d4ff),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('commitmentText'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withValues(alpha: 0.7),
              height: 1.7,
            ),
          ),
          const SizedBox(height: 20),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 2.5,
            children: [
              _FeatureItem(icon: '🤝', title: TranslationService.t('proximity'), subtitle: TranslationService.t('proximityDesc')),
              _FeatureItem(icon: '💡', title: TranslationService.t('innovation'), subtitle: TranslationService.t('innovationDesc')),
              _FeatureItem(icon: '⚖️', title: TranslationService.t('transparency'), subtitle: TranslationService.t('transparencyDesc')),
              _FeatureItem(icon: '🌱', title: TranslationService.t('development'), subtitle: TranslationService.t('developmentDesc')),
            ],
          ),
        ],
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  final String icon;
  final String title;
  final String subtitle;

  const _FeatureItem({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 20)),
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

class _QuickLinksSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 16),
          _LinkCard(
            icon: '👤',
            title: TranslationService.t('candidate'),
            subtitle: TranslationService.t('learnMore'),
            onTap: () => Navigator.pushNamed(context, AppRoutes.candidate),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '📋',
            title: TranslationService.t('program'),
            subtitle: TranslationService.t('discoverProgram'),
            onTap: () => Navigator.pushNamed(context, AppRoutes.program),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '✋',
            title: TranslationService.t('membership'),
            subtitle: TranslationService.t('joinMovement'),
            onTap: () => Navigator.pushNamed(context, AppRoutes.membership),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '📅',
            title: TranslationService.t('events'),
            subtitle: TranslationService.t('seeEvents'),
            onTap: () => Navigator.pushNamed(context, AppRoutes.events),
          ),
        ],
      ),
    );
  }
}

class _LinkCard extends StatelessWidget {
  final String icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _LinkCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white.withValues(alpha: 0.05),
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Ink(
          decoration: BoxDecoration(
            border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
            borderRadius: BorderRadius.circular(16),
          ),
          child: ListTile(
            leading: Text(icon, style: const TextStyle(fontSize: 32)),
            title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, color: Colors.white)),
            subtitle: Text(subtitle, style: TextStyle(color: Colors.white.withValues(alpha: 0.5))),
            trailing: Icon(Icons.chevron_right, color: Colors.white.withValues(alpha: 0.3)),
            onTap: () {},
          ),
        ),
      ),
    );
  }
}

class _FooterSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 24),
      color: const Color(0xFF070f1a),
      child: Column(
        children: [
          Text(
            '${TranslationService.t('candidateName')} - ${TranslationService.t('party')}',
            style: GoogleFonts.roboto(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            TranslationService.t('footerDesc'),
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 13, color: Colors.white.withValues(alpha: 0.5)),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _SocialBadge(label: 'FB'),
              const SizedBox(width: 8),
              _SocialBadge(label: 'TW'),
              const SizedBox(width: 8),
              _SocialBadge(label: 'IG'),
              const SizedBox(width: 8),
              _SocialBadge(label: 'LI'),
            ],
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 24, height: 3, decoration: BoxDecoration(color: const Color(0xFF0047AB), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 4),
              Container(width: 24, height: 3, decoration: BoxDecoration(color: const Color(0xFF00A651), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 4),
              Container(width: 24, height: 3, decoration: BoxDecoration(color: const Color(0xFFC8102E), borderRadius: BorderRadius.circular(2))),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            '2026 ${TranslationService.t('candidateName')} - ${TranslationService.t('party')} ${TranslationService.t('city')}. ${TranslationService.t('rights')}',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: Colors.white.withValues(alpha: 0.3)),
          ),
        ],
      ),
    );
  }
}

class _SocialBadge extends StatelessWidget {
  final String label;
  const _SocialBadge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.08),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(50),
      ),
      child: Center(
        child: Text(label, style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.7))),
      ),
    );
  }
}
