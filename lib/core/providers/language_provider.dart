import 'package:flutter/material.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';

class LanguageProvider extends ChangeNotifier {
  String _lang = 'fr';

  String get lang => _lang;
  bool get isRtl => _lang == 'ar';

  Future<void> setLang(String lang) async {
    _lang = lang;
    try {
      final loc = await AppLocalizations.delegate.load(Locale(lang));
      TranslationService.init(loc);
    } catch (e) {
      debugPrint('Error loading AppLocalizations for $lang: $e');
    }
    TranslationService.setLang(lang);
    notifyListeners();
    _savePreference();
  }

  Future<void> loadSavedLang() async {
    // Could load from SharedPreferences
    _lang = 'fr';
    try {
      final loc = await AppLocalizations.delegate.load(Locale(_lang));
      TranslationService.init(loc);
    } catch (e) {
      debugPrint('Error loading AppLocalizations for $_lang: $e');
    }
    TranslationService.setLang(_lang);
    notifyListeners();
  }

  void _savePreference() {
    // Could save to SharedPreferences
  }
}
