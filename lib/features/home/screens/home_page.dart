import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';
import 'package:rnd_campaign_app/features/auth/providers/auth_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/widgets/language_switcher.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0a1628),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const _HomeTopBar(),
            const _HeroSection(),
            const _StatsSection(),
            const _AboutSection(),
            const _QuickLinksSection(),
            const _FooterSection(),
          ],
        ),
      ),
    );
  }
}

class _HomeTopBar extends StatelessWidget {
  const _HomeTopBar();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Image.asset(
                'assets/icons/icon.jfif',
                height: 36,
                errorBuilder: (_, __, ___) => const SizedBox(),
              ),
              const SizedBox(width: 8),
              const Text(
                'RND',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                  letterSpacing: 1.5,
                ),
              ),
            ],
          ),
          const Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              LanguageSwitcher(),
              SizedBox(width: 8),
              _AuthAction(),
            ],
          ),
        ],
      ),
    );
  }
}

class _AuthAction extends StatelessWidget {
  const _AuthAction();

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final l = AppLocalizations.of(context)!;
    return IconButton(
      tooltip: auth.isAuthenticated ? l.logout : l.login,
      icon: Icon(
        auth.isAuthenticated ? Icons.logout : Icons.login,
        color: Colors.white70,
        size: 20,
      ),
      onPressed: () {
        if (auth.isAuthenticated) {
          auth.logout();
        } else {
          Navigator.pushNamed(context, AppRoutes.login);
        }
      },
    );
  }
}

class _HeroSection extends StatelessWidget {
  const _HeroSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final togetherParts = l.together.split(l.togetherHighlight);

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
                'assets/icons/icon.jfif',
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
            l.elections2026,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w700,
              color: Color(0xFF00d4ff),
              letterSpacing: 3,
            ),
          ),
          const SizedBox(height: 12),
          Text.rich(
            TextSpan(
              children: [
                TextSpan(text: togetherParts.isNotEmpty ? togetherParts[0] : ''),
                TextSpan(
                  text: l.togetherHighlight,
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
            l.description,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Colors.white.withValues(alpha: 0.65),
              height: 1.6,
            ),
          ),
          const SizedBox(height: 20),
          const _AudioPlayerWidget(),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: _HeroButton(
                  label: l.ourProgram,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.program),
                  primary: true,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _HeroButton(
                  label: l.joinUs,
                  onTap: () => Navigator.pushNamed(context, AppRoutes.membership),
                  primary: false,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _AudioPlayerWidget extends StatefulWidget {
  const _AudioPlayerWidget();

  @override
  State<_AudioPlayerWidget> createState() => _AudioPlayerWidgetState();
}

class _AudioPlayerWidgetState extends State<_AudioPlayerWidget> {
  final AudioPlayer _audioPlayer = AudioPlayer();
  bool _isPlaying = false;
  String? _lastLang;

  @override
  void initState() {
    super.initState();
    _audioPlayer.onPlayerStateChanged.listen((state) {
      if (mounted) {
        setState(() {
          _isPlaying = state == PlayerState.playing;
        });
      }
    });
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  void _togglePlay() async {
    if (_isPlaying) {
      await _audioPlayer.pause();
    } else {
      final lang = Provider.of<LanguageProvider>(context, listen: false).lang;
      final audioFile = (lang == 'ar') ? 'audio/ar.mp3' : 'audio/fr.mp3';
      try {
        await _audioPlayer.play(AssetSource(audioFile));
      } catch (e) {
        debugPrint('Error playing audio: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<LanguageProvider>().lang;
    final l = AppLocalizations.of(context)!;
    if (_lastLang != null && _lastLang != lang) {
      _audioPlayer.stop();
    }
    _lastLang = lang;

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
            l.audioMessage,
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
  const _StatsSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
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
              SizedBox(width: itemWidth, child: _StatItem(icon: '🏛️', number: '451', label: l.mairiesRnd)),
              SizedBox(width: itemWidth, child: _StatItem(icon: '👥', number: '6 521', label: l.elusCommunaux)),
              SizedBox(width: itemWidth, child: _StatItem(icon: '🏛️', number: '58', label: l.deputesApn)),
              SizedBox(width: itemWidth, child: _StatItem(icon: '📅', number: '28', label: l.yearsEngagement)),
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
  const _AboutSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
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
              l.whoWeAre,
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: Color(0xFF00d4ff),
                letterSpacing: 3,
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            l.rndDescription,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            l.rndDescText,
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
                  l.ourVision,
                  style: GoogleFonts.roboto(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  l.visionText,
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
            l.commitment,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: Color(0xFF00d4ff),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            l.commitmentText,
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
            childAspectRatio: 2.8,
            children: [
              _FeatureItem(icon: '🤝', title: l.proximity, subtitle: l.proximityDesc),
              _FeatureItem(icon: '💡', title: l.innovation, subtitle: l.innovationDesc),
              _FeatureItem(icon: '⚖️', title: l.transparency, subtitle: l.transparencyDesc),
              _FeatureItem(icon: '🌱', title: l.development, subtitle: l.developmentDesc),
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
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
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
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 10,
                    color: Colors.white,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 9,
                    color: Colors.white.withValues(alpha: 0.5),
                    overflow: TextOverflow.ellipsis,
                  ),
                  maxLines: 1,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _QuickLinksSection extends StatelessWidget {
  const _QuickLinksSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 16),
          _LinkCard(
            icon: '👤',
            title: l.candidate,
            subtitle: l.learnMore,
            onTap: () => Navigator.pushNamed(context, AppRoutes.candidate),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '📋',
            title: l.program,
            subtitle: l.discoverProgram,
            onTap: () => Navigator.pushNamed(context, AppRoutes.program),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '✋',
            title: l.membership,
            subtitle: l.joinMovement,
            onTap: () => Navigator.pushNamed(context, AppRoutes.membership),
          ),
          const SizedBox(height: 12),
          _LinkCard(
            icon: '📅',
            title: l.events,
            subtitle: l.seeEvents,
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
          ),
        ),
      ),
    );
  }
}

class _FooterSection extends StatelessWidget {
  const _FooterSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Container(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 24),
      color: const Color(0xFF070f1a),
      child: Column(
        children: [
          Text(
            '${l.candidateName} - ${l.party}',
            style: GoogleFonts.roboto(
              fontSize: 18,
              fontWeight: FontWeight.w800,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            l.footerDesc,
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
            l.rights,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 12, color: Colors.white.withValues(alpha: 0.3)),
          ),
          const SizedBox(height: 8),
          Text(
            '© Developed by FORSLOG LTD — Codded by Ramzy Guedouar — Contact: 0696 41 09 53',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 11, color: Colors.white.withValues(alpha: 0.2)),
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
