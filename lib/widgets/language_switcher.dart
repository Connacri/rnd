import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'package:rnd_campaign_app/app/theme.dart';
import 'package:rnd_campaign_app/core/providers/language_provider.dart';

/// Sélecteur de langue FR/AR/EN réutilisable, utilisé sur les écrans
/// d'accueil, de connexion et d'inscription.
class LanguageSwitcher extends StatelessWidget {
  const LanguageSwitcher({super.key, this.mainAxisAlignment = MainAxisAlignment.center});

  final MainAxisAlignment mainAxisAlignment;

  @override
  Widget build(BuildContext context) {
    final lang = context.watch<LanguageProvider>();
    return Row(
      mainAxisAlignment: mainAxisAlignment,
      mainAxisSize: MainAxisSize.min,
      children: [
        _LangChip(label: 'FR', langCode: 'fr', currentLang: lang.lang, onTap: () => lang.setLang('fr')),
        const SizedBox(width: 8),
        _LangChip(label: 'AR', langCode: 'ar', currentLang: lang.lang, onTap: () => lang.setLang('ar')),
        const SizedBox(width: 8),
        _LangChip(label: 'EN', langCode: 'en', currentLang: lang.lang, onTap: () => lang.setLang('en')),
      ],
    );
  }
}

class _LangChip extends StatelessWidget {
  const _LangChip({
    required this.label,
    required this.langCode,
    required this.currentLang,
    required this.onTap,
  });

  final String label;
  final String langCode;
  final String currentLang;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final isActive = currentLang == langCode;
    return Semantics(
      button: true,
      selected: isActive,
      label: 'Langue $label',
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
          decoration: BoxDecoration(
            color: isActive ? AppTheme.accentCyan : Colors.transparent,
            border: Border.all(
              color: isActive ? AppTheme.accentCyan : Colors.white.withValues(alpha: 0.3),
            ),
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
      ),
    );
  }
}
