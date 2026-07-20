class Event {
  final String id;
  final String title;
  final String? description;
  final DateTime date;
  final String? location;
  final String? imageUrl;

  Event({
    required this.id,
    required this.title,
    this.description,
    required this.date,
    this.location,
    this.imageUrl,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String?,
      date: DateTime.parse(json['date'] as String),
      location: json['location'] as String?,
      imageUrl: json['image_url'] as String?,
    );
  }
}
