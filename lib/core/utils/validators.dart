import 'package:rnd_campaign_app/core/services/translation_service.dart';

class Validators {
  static String? email(String? value) {
    if (value == null || value.isEmpty) return TranslationService.t('emailRequired');
    final regex = RegExp(r'^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!regex.hasMatch(value)) return TranslationService.t('emailInvalid');
    return null;
  }

  static String? password(String? value) {
    if (value == null || value.isEmpty) return TranslationService.t('passwordRequired');
    if (value.length < 6) return TranslationService.t('passwordMin');
    return null;
  }

  static String? phone(String? value) {
    if (value == null || value.isEmpty) return TranslationService.t('phoneRequired');
    if (value.length < 10) return TranslationService.t('phoneInvalid');
    return null;
  }
}

