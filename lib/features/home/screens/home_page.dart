import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:rnd_campaign_app/app/app_shell.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/features/content/models/content_models.dart';
import 'package:rnd_campaign_app/features/content/providers/content_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/app/theme.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return AppShell(
      currentRoute: AppRoutes.home,
      child: SingleChildScrollView(
        child: Column(
          children: const [
            _HeroSection(),
            _StatsSection(),
            _NewsSection(),
            _AboutSection(),
            _QuickLinksSection(),
            _ScreenshotsSection(),
            _FooterSection(),
          ],
        ),
      ),
    );
  }
}

class _HeroSection extends StatelessWidget {
  const _HeroSection();

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
            : l.description;

    return Container(
      padding: const EdgeInsets.fromLTRB(24, 24, 24, 32),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            AppColors.amber200.withValues(alpha: 0.35),
            AppColors.cream,
          ],
        ),
      ),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 5),
            decoration: BoxDecoration(
              color: AppColors.ink,
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              '✨ ${l.elections2026}',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppColors.amber300,
              ),
            ),
          ),
          const SizedBox(height: 20),
          Container(
            width: 130,
            height: 130,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.amber400, width: 3),
              boxShadow: [
                BoxShadow(
                  color: AppColors.amber.withValues(alpha: 0.25),
                  blurRadius: 30,
                ),
              ],
            ),
            child: ClipOval(
              child: Image.asset(
                'assets/icons/icon.png',
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) => const Icon(
                  Icons.person,
                  size: 60,
                  color: AppColors.ink,
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            name,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
              letterSpacing: -0.5,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            role,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: AppColors.rose600,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            party,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 12, color: AppColors.zinc500),
          ),
          const SizedBox(height: 20),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white.withValues(alpha: 0.8),
              border:
                  Border.all(color: AppColors.amber200.withValues(alpha: 0.6)),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              children: [
                Text(
                  l.slogan,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    fontStyle: FontStyle.italic,
                    color: AppColors.zinc700,
                    height: 1.5,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  biography,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.zinc500,
                    height: 1.6,
                  ),
                ),
              ],
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
                  onTap: () =>
                      Navigator.pushNamed(context, AppRoutes.membership),
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
        gradient: LinearGradient(
          colors: [
            AppColors.amber200.withValues(alpha: 0.35),
            AppColors.surfaceBeige.withValues(alpha: 0.6),
          ],
        ),
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
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
                border: Border.all(color: AppColors.ink),
                color: _isPlaying
                    ? AppColors.ink
                    : AppColors.ink.withValues(alpha: 0.12),
              ),
              child: Center(
                child: Text(
                  _isPlaying ? '⏸' : '▶',
                  style: const TextStyle(color: AppColors.ink, fontSize: 14),
                ),
              ),
            ),
          ),
          const SizedBox(width: 12),
          ...List.generate(
              6,
              (i) => Container(
                    width: 3,
                    height:
                        _isPlaying ? [12, 18, 8, 16, 10, 14][i].toDouble() : 4,
                    margin: const EdgeInsets.symmetric(horizontal: 1.5),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [AppColors.ink, AppColors.amber400],
                      ),
                      borderRadius: BorderRadius.circular(2),
                    ),
                  )),
          const SizedBox(width: 12),
          Text(
            l.audioMessage,
            style: TextStyle(
              fontSize: 12,
              color: AppColors.zinc700,
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
          backgroundColor: AppColors.ink,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
        ),
        child: Text(label,
            style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
      );
    }
    return OutlinedButton(
      onPressed: onTap,
      style: OutlinedButton.styleFrom(
        foregroundColor: AppColors.ink,
        side: BorderSide(color: AppColors.amber200.withValues(alpha: 0.6)),
        padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(50)),
      ),
      child: Text(label,
          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
    );
  }
}

class _StatsSection extends StatelessWidget {
  const _StatsSection();

  @override
  Widget build(BuildContext context) {
    // Chiffres : Supabase si présent, repli sur les valeurs statiques.
    final stats = context.watch<ContentProvider>().homeStats;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppColors.amber200.withValues(alpha: 0.5),
            AppColors.amber400.withValues(alpha: 0.3)
          ],
        ),
        border: Border(
          top: BorderSide(color: AppColors.amber200.withValues(alpha: 0.9)),
          bottom: BorderSide(color: AppColors.amber200.withValues(alpha: 0.9)),
        ),
      ),
      child: LayoutBuilder(
        builder: (context, constraints) {
          final itemWidth = (constraints.maxWidth - 16) / 2;
          final lang = TranslationService.currentLang;
          return Wrap(
            spacing: 16,
            runSpacing: 16,
            children: stats
                .map(
                  (s) => SizedBox(
                    width: itemWidth,
                    child: _StatItem(
                      icon: s.icon,
                      number: s.number,
                      label: s.labelFor(lang),
                    ),
                  ),
                )
                .toList(),
          );
        },
      ),
    );
  }
}

/// Actualités publiées par l'administrateur (table Supabase `news`).
/// Masquée si aucune actu — pas de placeholder vide.
class _NewsSection extends StatelessWidget {
  const _NewsSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final news = context.watch<ContentProvider>().news;
    if (news.isEmpty) return const SizedBox.shrink();
    final lang = TranslationService.currentLang;
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            l.latestNews,
            style: GoogleFonts.roboto(
              fontSize: 26,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 16),
          ...news.map((item) => _NewsTile(item: item, lang: lang)),
        ],
      ),
    );
  }
}

class _NewsTile extends StatelessWidget {
  final NewsItem item;
  final String lang;

  const _NewsTile({required this.item, required this.lang});

  @override
  Widget build(BuildContext context) {
    final date = item.createdAt;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.surfaceBeige.withValues(alpha: 0.5),
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.campaign_outlined,
                  color: AppColors.ink, size: 20),
              const SizedBox(width: 8),
              Expanded(
                child: Text(
                  item.titleFor(lang),
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 15,
                    color: AppColors.ink,
                  ),
                ),
              ),
            ],
          ),
          if (item.bodyFor(lang).isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(
              item.bodyFor(lang),
              style: TextStyle(
                fontSize: 14,
                color: AppColors.zinc700,
                height: 1.5,
              ),
            ),
          ],
          if (date != null) ...[
            const SizedBox(height: 8),
            Text(
              '${date.day}/${date.month}/${date.year}',
              style: TextStyle(
                fontSize: 12,
                color: AppColors.zinc500,
              ),
            ),
          ],
        ],
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
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 14),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(icon, style: const TextStyle(fontSize: 28)),
          const SizedBox(height: 6),
          Text(
            number,
            style: GoogleFonts.roboto(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              color: AppColors.zinc500,
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
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
            decoration: BoxDecoration(
              border: Border.all(color: AppColors.ink.withValues(alpha: 0.3)),
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              l.whoWeAre,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w700,
                color: AppColors.ink,
                letterSpacing: 3,
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text(
            l.rndDescription,
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 28,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            l.rndDescText,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.zinc700,
              height: 1.7,
            ),
          ),
          const SizedBox(height: 32),
          Container(
            padding: const EdgeInsets.all(28),
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
                    fontSize: 64,
                    color: AppColors.ink.withValues(alpha: 0.1),
                    height: 0.8,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  l.ourVision,
                  style: GoogleFonts.roboto(
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    color: AppColors.ink,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  l.visionText,
                  style: TextStyle(
                    fontSize: 14,
                    color: AppColors.zinc700,
                    height: 1.7,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            l.commitment,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w700,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            l.commitmentText,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: AppColors.zinc700,
              height: 1.7,
            ),
          ),
          const SizedBox(height: 24),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 2.8,
            children: [
              _FeatureItem(
                  icon: '🤝', title: l.proximity, subtitle: l.proximityDesc),
              _FeatureItem(
                  icon: '💡', title: l.innovation, subtitle: l.innovationDesc),
              _FeatureItem(
                  icon: '⚖️',
                  title: l.transparency,
                  subtitle: l.transparencyDesc),
              _FeatureItem(
                  icon: '🌱',
                  title: l.development,
                  subtitle: l.developmentDesc),
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
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 26)),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 14,
                    color: AppColors.ink,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.zinc500,
                  ),
                  maxLines: 2,
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
          const SizedBox(height: 24),
          _LinkCard(
            icon: '👤',
            title: l.candidate,
            subtitle: l.learnMore,
            onTap: () => Navigator.pushNamed(context, AppRoutes.candidate),
          ),
          const SizedBox(height: 16),
          _LinkCard(
            icon: '📋',
            title: l.program,
            subtitle: l.discoverProgram,
            onTap: () => Navigator.pushNamed(context, AppRoutes.program),
          ),
          const SizedBox(height: 16),
          _LinkCard(
            icon: '✋',
            title: l.membership,
            subtitle: l.joinMovement,
            onTap: () => Navigator.pushNamed(context, AppRoutes.membership),
          ),
          const SizedBox(height: 16),
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
      color: Colors.white,
      borderRadius: BorderRadius.circular(16),
      child: InkWell(
        borderRadius: BorderRadius.circular(16),
        onTap: onTap,
        child: Ink(
          decoration: BoxDecoration(
            border:
                Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
            borderRadius: BorderRadius.circular(16),
          ),
          child: ListTile(
            leading: Text(icon, style: const TextStyle(fontSize: 36)),
            title: Text(title,
                style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                    color: AppColors.ink)),
            subtitle: Text(subtitle,
                style: const TextStyle(fontSize: 13, color: AppColors.zinc500)),
            trailing: const Icon(Icons.chevron_right, color: AppColors.amber),
            contentPadding:
                const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          ),
        ),
      ),
    );
  }
}

class _ScreenshotsSection extends StatelessWidget {
  const _ScreenshotsSection();

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final screenshots = [
      ('assets/images/1000011155.png', l.navHome),
      ('assets/images/1000011156.png', l.program),
      ('assets/images/1000011157.png', l.membership),
      ('assets/images/1000011158.png', l.events),
    ];
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        children: [
          const SizedBox(height: 24),
          Text(
            l.appPreviewTitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            l.appPreviewSubtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 12,
              color: AppColors.zinc500,
            ),
          ),
          const SizedBox(height: 24),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12,
            crossAxisSpacing: 12,
            childAspectRatio: 0.62,
            children: screenshots
                .map(
                  (s) => Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(
                          color: AppColors.amber200.withValues(alpha: 0.9)),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Column(
                      children: [
                        Expanded(
                          child: ClipRRect(
                            borderRadius: BorderRadius.circular(14),
                            child: SizedBox(
                              width: double.infinity,
                              child: Image.asset(
                                s.$1,
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) =>
                                    const SizedBox.shrink(),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          s.$2,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w700,
                            color: AppColors.ink,
                          ),
                        ),
                      ],
                    ),
                  ),
                )
                .toList(),
          ),
        ],
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
      padding: const EdgeInsets.fromLTRB(24, 32, 24, 28),
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(color: AppColors.amber200.withValues(alpha: 0.5)),
        ),
      ),
      child: Column(
        children: [
          Container(
            width: 48,
            height: 48,
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              border:
                  Border.all(color: AppColors.amber200.withValues(alpha: 0.8)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 6,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Image.asset(
              'assets/icons/icon.png',
              fit: BoxFit.contain,
              errorBuilder: (_, __, ___) => const SizedBox.shrink(),
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _FlagBar(color: AppColors.partyBlue),
              const SizedBox(width: 6),
              _FlagBar(color: AppColors.partyGreen),
              const SizedBox(width: 6),
              _FlagBar(color: AppColors.partyRed),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            '${l.candidateName} — ${l.partyShort}',
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 15,
              fontWeight: FontWeight.w900,
              color: AppColors.ink,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            l.footerDesc,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 12, color: AppColors.zinc500),
          ),
          const SizedBox(height: 16),
          const Wrap(
            alignment: WrapAlignment.center,
            spacing: 8,
            runSpacing: 8,
            children: [
              _SocialBadge(label: 'Facebook'),
              _SocialBadge(label: 'Twitter'),
              _SocialBadge(label: 'Instagram'),
              _SocialBadge(label: 'Telegram'),
            ],
          ),
          const SizedBox(height: 20),
          Text(
            l.rights,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 11, color: AppColors.zinc500),
          ),
          const SizedBox(height: 4),
          Text(
            l.developerCredit,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 10,
              color: AppColors.zinc500.withValues(alpha: 0.8),
            ),
          ),
        ],
      ),
    );
  }
}

class _FlagBar extends StatelessWidget {
  const _FlagBar({required this.color});

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 32,
      height: 6,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(3),
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
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
      decoration: BoxDecoration(
        color: const Color(0xFFE4E4E7).withValues(alpha: 0.7),
        borderRadius: BorderRadius.circular(50),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: AppColors.zinc700,
        ),
      ),
    );
  }
}
