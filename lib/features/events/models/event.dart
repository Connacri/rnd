import 'package:rnd_campaign_app/core/utils/localized_text.dart';

/// Évènement publié (table `events` Supabase).
///
/// Les champs textuels sont du JSONB localisé `{"fr","en","ar"}` ;
/// la résolution se fait à la volée selon [TranslationService.currentLang].
class AppEvent {
  final String id;
  final Map<String, dynamic> title;
  final Map<String, dynamic> description;
  final Map<String, dynamic> location;
  final DateTime? eventDate;
  final String? imageUrl;

  const AppEvent({
    required this.id,
    required this.title,
    required this.description,
    required this.location,
    this.eventDate,
    this.imageUrl,
  });

  String titleFor(String lang) => localizedText(title, lang: lang);
  String descriptionFor(String lang) => localizedText(description, lang: lang);
  String locationFor(String lang) => localizedText(location, lang: lang);

  factory AppEvent.fromJson(Map<String, dynamic> json) {
    return AppEvent(
      id: json['id'] as String,
      title: (json['title'] as Map?)?.cast<String, dynamic>() ?? const {},
      description:
          (json['description'] as Map?)?.cast<String, dynamic>() ?? const {},
      location: (json['location'] as Map?)?.cast<String, dynamic>() ?? const {},
      eventDate: json['event_date'] != null
          ? DateTime.tryParse(json['event_date'] as String)
          : null,
      imageUrl: json['image_url'] as String?,
    );
  }
}
