import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/routes.dart';
import 'package:rnd_campaign_app/app/theme.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/widgets/language_switcher.dart';

const double kMaxContentWidth = 1152;
const double kBreakpointLg = 1024;

class AppShell extends StatelessWidget {
  const AppShell({
    super.key,
    required this.child,
    this.currentRoute = AppRoutes.home,
    this.showBottomNav = true,
  });

  final Widget child;
  final String currentRoute;
  final bool showBottomNav;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isDesktop = size.width >= kBreakpointLg;

    return Scaffold(
      backgroundColor: AppColors.cream,
      bottomNavigationBar: (!isDesktop && showBottomNav)
          ? _BottomNav(currentRoute: currentRoute)
          : null,
      body: Column(
        children: [
          _RibbonBanner(),
          _BrandHeader(isDesktop: isDesktop),
          if (isDesktop) _DesktopNav(currentRoute: currentRoute),
          Expanded(
            child: Align(
              alignment: Alignment.topCenter,
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: kMaxContentWidth),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                    vertical: isDesktop ? 20 : 8,
                  ),
                  child: child,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Ruban tricolore + bandeau noir officiel — identique au site web.
class _RibbonBanner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: double.infinity,
          height: 4,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [
                Color(0xFF00A651),
                Colors.white,
                Color(0xFFC8102E),
              ],
            ),
          ),
        ),
        Container(
          width: double.infinity,
          color: AppColors.ink,
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          child: Row(
            children: [
              const Flexible(
                child: Text(
                  '🇩🇿 الجمهورية الجزائرية الديمقراطية الشعبية',
                  style: TextStyle(
                    fontFamily: 'Noto Sans Arabic',
                    fontSize: 10,
                    fontWeight: FontWeight.w700,
                    color: Color(0xFF10B981),
                  ),
                  textDirection: TextDirection.rtl,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(width: 8),
              const Flexible(
                child: Text(
                  'Rassemblement National Démocratique',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: AppColors.amber300,
                    letterSpacing: 0.6,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _BrandHeader extends StatelessWidget {
  const _BrandHeader({required this.isDesktop});

  final bool isDesktop;

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;

    return Container(
      width: double.infinity,
      color: AppColors.cream,
      padding: EdgeInsets.symmetric(
          horizontal: isDesktop ? 32 : 16, vertical: isDesktop ? 16 : 12),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: kMaxContentWidth),
          child: Row(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  width: isDesktop ? 48 : 40,
                  height: isDesktop ? 48 : 40,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(
                        color: AppColors.amber200.withValues(alpha: 0.9)),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.all(6),
                  child: Image.asset('assets/images/1000011155.png',
                      fit: BoxFit.contain),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            l.appName,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              fontWeight: FontWeight.w900,
                              fontSize: isDesktop ? 18 : 15,
                              color: AppColors.ink,
                              letterSpacing: -0.3,
                            ),
                          ),
                        ),
                        const SizedBox(width: 6),
                        Flexible(
                          child: Text(
                            'التجمع الوطني الديمقراطي',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            textDirection: TextDirection.rtl,
                            style: TextStyle(
                              fontFamily: 'Noto Sans Arabic',
                              fontSize: isDesktop ? 12 : 10,
                              fontWeight: FontWeight.w800,
                              color: AppColors.rose600,
                            ),
                          ),
                        ),
                        if (isDesktop) ...[
                          const SizedBox(width: 6),
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 6, vertical: 1),
                            decoration: BoxDecoration(
                              color: AppColors.ink,
                              borderRadius: BorderRadius.circular(999),
                            ),
                            child: const Text(
                              '2026',
                              style: TextStyle(
                                fontSize: 9,
                                fontWeight: FontWeight.w800,
                                color: AppColors.amber300,
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'Aïn El Turck • Zenasni Nabil • Élections Communales',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: isDesktop ? 11 : 10,
                        fontWeight: FontWeight.w600,
                        color: AppColors.zinc500,
                        height: 1.2,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              if (isDesktop) const LanguageSwitcher(),
              if (!isDesktop) const _LanguageMenu(),
              const SizedBox(width: 8),
              _AuthButton(isDesktop: isDesktop),
            ],
          ),
        ),
      ),
    );
  }
}

class _AuthButton extends StatelessWidget {
  const _AuthButton({required this.isDesktop});

  final bool isDesktop;

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final compact = MediaQuery.of(context).size.width < 380;
    return FilledButton.tonal(
      onPressed: () => Navigator.of(context).pushNamed(AppRoutes.login),
      style: FilledButton.styleFrom(
        backgroundColor: AppColors.ink,
        foregroundColor: Colors.white,
        minimumSize: compact ? const Size(44, 44) : null,
        padding: EdgeInsets.symmetric(
            horizontal: isDesktop ? 16 : 12, vertical: isDesktop ? 10 : 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
      ),
      child: compact
          ? const Icon(Icons.person_outline, size: 18)
          : Text(l.login, style: const TextStyle(fontWeight: FontWeight.w700)),
    );
  }
}

/// Compact language selector for narrow screens: globe icon + current code.
/// Mirrors the website header's language button on mobile.
class _LanguageMenu extends StatelessWidget {
  const _LanguageMenu();

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<LanguageProvider>();
    return PopupMenuButton<String>(
      tooltip: 'Langue / اللغة / Language',
      onSelected: lang.setLang,
      itemBuilder: (context) => const [
        PopupMenuItem(value: 'fr', child: Text('Français')),
        PopupMenuItem(value: 'ar', child: Text('العربية')),
        PopupMenuItem(value: 'en', child: Text('English')),
      ],
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: AppColors.amber200.withValues(alpha: 0.9)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.language, size: 18, color: AppColors.ink),
            const SizedBox(width: 4),
            Text(
              lang.lang.toUpperCase(),
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppColors.ink,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DesktopNav extends StatelessWidget {
  const _DesktopNav({required this.currentRoute});

  final String currentRoute;

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final items = <_NavItemData>[
      _NavItemData('home', l.navHome, AppRoutes.home, Icons.home_outlined),
      _NavItemData(
          'program', l.navProgram, AppRoutes.program, Icons.menu_book_outlined),
      _NavItemData('candidate', l.navCandidate, AppRoutes.candidate,
          Icons.person_outline),
      _NavItemData('events', l.navEvents, AppRoutes.events,
          Icons.calendar_today_outlined),
      _NavItemData('membership', l.navMembership, AppRoutes.membership,
          Icons.group_add_outlined),
    ];

    return Container(
      width: double.infinity,
      color: AppColors.cream,
      padding: const EdgeInsets.only(bottom: 8, left: 16, right: 16),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: kMaxContentWidth),
          child: Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: AppColors.surfaceBeige.withValues(alpha: 0.8),
              borderRadius: BorderRadius.circular(999),
              border:
                  Border.all(color: AppColors.amber200.withValues(alpha: 0.5)),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: items.map((it) {
                final active = currentRoute == it.route ||
                    currentRoute == '/${it.id}' ||
                    currentRoute.startsWith(it.route);
                return _NavPill(
                  label: it.label,
                  active: active,
                  onTap: () => Navigator.of(context)
                      .pushNamedAndRemoveUntil(it.route, (r) => false),
                );
              }).toList(),
            ),
          ),
        ),
      ),
    );
  }
}

class _NavPill extends StatelessWidget {
  const _NavPill({
    required this.label,
    required this.active,
    required this.onTap,
  });

  final String label;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 2),
      child: TextButton(
        onPressed: onTap,
        style: TextButton.styleFrom(
          backgroundColor: active ? AppColors.ink : Colors.transparent,
          foregroundColor: active ? Colors.white : AppColors.zinc700,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          minimumSize: const Size(0, 36),
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
        ),
        child: Text(
          label,
          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
        ),
      ),
    );
  }
}

class _BottomNav extends StatelessWidget {
  const _BottomNav({required this.currentRoute});

  final String currentRoute;

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final items = <_NavItemData>[
      _NavItemData('home', l.navHome, AppRoutes.home, Icons.home_outlined),
      _NavItemData(
          'program', l.navProgram, AppRoutes.program, Icons.menu_book_outlined),
      _NavItemData('candidate', l.navCandidate, AppRoutes.candidate,
          Icons.person_outline),
      _NavItemData('events', l.navEvents, AppRoutes.events,
          Icons.calendar_today_outlined),
      _NavItemData('membership', l.navMembership, AppRoutes.membership,
          Icons.group_add_outlined),
    ];

    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.only(left: 12, right: 12, bottom: 8),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 390),
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: const Color(0xFF18181B).withValues(alpha: 0.96),
                borderRadius: BorderRadius.circular(999),
                border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.25),
                    blurRadius: 16,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Row(
                children: items.map((it) {
                  final active = currentRoute == it.route;
                  return _BottomNavItem(
                    label: it.label,
                    icon: it.icon,
                    active: active,
                    onTap: () => Navigator.of(context)
                        .pushNamedAndRemoveUntil(it.route, (r) => false),
                  );
                }).toList(),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BottomNavItem extends StatelessWidget {
  const _BottomNavItem(
      {required this.label,
      required this.icon,
      required this.active,
      required this.onTap});

  final String label;
  final IconData icon;
  final bool active;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        behavior: HitTestBehavior.opaque,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          margin: const EdgeInsets.symmetric(horizontal: 2),
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 4),
          decoration: BoxDecoration(
            gradient: active
                ? const LinearGradient(
                    colors: [AppColors.amber400, AppColors.rose400],
                  )
                : null,
            borderRadius: BorderRadius.circular(999),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                icon,
                size: 18,
                color: active ? AppColors.ink : const Color(0xFFA1A1AA),
              ),
              const SizedBox(height: 2),
              Text(
                label,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: active ? FontWeight.w700 : FontWeight.w600,
                  color: active ? AppColors.ink : const Color(0xFFA1A1AA),
                ),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavItemData {
  const _NavItemData(this.id, this.label, this.route, this.icon);

  final String id;
  final String label;
  final String route;
  final IconData icon;
}
