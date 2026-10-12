import 'package:rnd_campaign_app/core/services/translation_service.dart';

/// Résout un champ texte localisé stocké en JSONB Supabase :
/// `{"fr": "...", "en": "...", "ar": "..."}`.
///
/// Repli : langue courante → `fr` → première valeur non vide → ''.
String localizedText(Object? value, {String? lang}) {
  if (value == null) return '';
  if (value is String) return value;
  if (value is! Map) return value.toString();

  final map =
      value.map((key, v) => MapEntry(key.toString(), v?.toString() ?? ''));
  final wanted = lang ?? TranslationService.currentLang;

  String pick(String code) => map[code] ?? '';
  final candidates = <String>[wanted, 'fr', ...map.keys];
  for (final code in candidates) {
    final text = pick(code);
    if (text.isNotEmpty) return text;
  }
  return '';
}

/// Liste de chaînes localisées (ex. points du programme).
List<String> localizedList(Object? value, {String? lang}) {
  if (value is! List) return const [];
  final wanted = lang ?? TranslationService.currentLang;
  return value
      .map((e) {
        if (e is Map) {
          final map =
              e.map((key, v) => MapEntry(key.toString(), v?.toString() ?? ''));
          return map[wanted] ??
              map['fr'] ??
              map.values.where((v) => v.isNotEmpty).firstOrNull ??
              '';
        }
        return e?.toString() ?? '';
      })
      .where((s) => s.isNotEmpty)
      .toList();
}
