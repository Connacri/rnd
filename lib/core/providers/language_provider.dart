import 'package:flutter/foundation.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';

class LanguageProvider extends ChangeNotifier {
  String _lang = 'fr';

  String get lang => _lang;
  bool get isRtl => _lang == 'ar';

  void setLang(String lang) {
    _lang = lang;
    TranslationService.setLang(lang);
    notifyListeners();
    _savePreference();
  }

  Future<void> loadSavedLang() async {
    // Could load from SharedPreferences
    _lang = 'fr';
    TranslationService.setLang(_lang);
  }

  void _savePreference() {
    // Could save to SharedPreferences
  }
}
