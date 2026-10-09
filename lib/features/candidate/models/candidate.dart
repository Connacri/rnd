import 'package:rnd_campaign_app/core/utils/localized_text.dart';

/// Candidat / équipe (table `candidates` Supabase).
///
/// `name` est un text ; `role`, `party`, `biography` sont du JSONB
/// localisé `{"fr","en","ar"}` résolu à la volée.
class Candidate {
  final String id;
  final String name;
  final Map<String, dynamic> role;
  final Map<String, dynamic> party;
  final Map<String, dynamic> biography;
  final String? photoUrl;

  const Candidate({
    required this.id,
    required this.name,
    required this.role,
    required this.party,
    required this.biography,
    this.photoUrl,
  });

  String roleFor(String lang) => localizedText(role, lang: lang);
  String partyFor(String lang) => localizedText(party, lang: lang);
  String biographyFor(String lang) => localizedText(biography, lang: lang);

  factory Candidate.fromJson(Map<String, dynamic> json) {
    return Candidate(
      id: json['id'] as String,
      name: (json['name'] as String?) ?? '',
      role: (json['role'] as Map?)?.cast<String, dynamic>() ?? const {},
      party: (json['party'] as Map?)?.cast<String, dynamic>() ?? const {},
      biography:
          (json['biography'] as Map?)?.cast<String, dynamic>() ?? const {},
      photoUrl: json['photo_url'] as String?,
    );
  }
}
