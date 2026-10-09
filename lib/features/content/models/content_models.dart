import 'package:flutter/material.dart';
import 'package:rnd_campaign_app/core/utils/localized_text.dart';

/// Chiffre de la page d'accueil (table `home_stats`).
class HomeStat {
  final String icon;
  final String number;
  final Map<String, dynamic> label;

  const HomeStat({
    required this.icon,
    required this.number,
    required this.label,
  });

  String labelFor(String lang) => localizedText(label, lang: lang);

  factory HomeStat.fromJson(Map<String, dynamic> json) {
    return HomeStat(
      icon: (json['icon'] as String?) ?? '🏛️',
      number: (json['number'] as String?) ?? '',
      label: (json['label'] as Map?)?.cast<String, dynamic>() ?? const {},
    );
  }
}

/// Actualité / info publiée par l'administrateur (table `news`).
class NewsItem {
  final String id;
  final Map<String, dynamic> title;
  final Map<String, dynamic> body;
  final String? imageUrl;
  final DateTime? createdAt;

  const NewsItem({
    required this.id,
    required this.title,
    required this.body,
    this.imageUrl,
    this.createdAt,
  });

  String titleFor(String lang) => localizedText(title, lang: lang);
  String bodyFor(String lang) => localizedText(body, lang: lang);

  factory NewsItem.fromJson(Map<String, dynamic> json) {
    return NewsItem(
      id: json['id'] as String,
      title: (json['title'] as Map?)?.cast<String, dynamic>() ?? const {},
      body: (json['body'] as Map?)?.cast<String, dynamic>() ?? const {},
      imageUrl: json['image_url'] as String?,
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'] as String)
          : null,
    );
  }
}

/// Utilitaire hex → Color pour les accents du programme.
Color colorFromHex(String? hex, {Color fallback = const Color(0xFF00d4ff)}) {
  if (hex == null || hex.isEmpty) return fallback;
  final value = hex.replaceFirst('#', '');
  if (value.length != 6) return fallback;
  final parsed = int.tryParse(value, radix: 16);
  if (parsed == null) return fallback;
  return Color(0xFF000000 | parsed);
}
