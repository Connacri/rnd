class Candidate {
  final String id;
  final String name;
  final String? photoUrl;
  final String? biography;
  final String? party;
  final String? city;

  Candidate({
    required this.id,
    required this.name,
    this.photoUrl,
    this.biography,
    this.party,
    this.city,
  });

  factory Candidate.fromJson(Map<String, dynamic> json) {
    return Candidate(
      id: json['id'] as String,
      name: json['name'] as String,
      photoUrl: json['photo_url'] as String?,
      biography: json['biography'] as String?,
      party: json['party'] as String?,
      city: json['city'] as String?,
    );
  }
}
