import 'package:flutter/material.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';

class EventsPage extends StatelessWidget {
  const EventsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0a1628),
      appBar: AppBar(
        title: Text(TranslationService.t('events')),
        backgroundColor: const Color(0xFF0a1628),
        foregroundColor: Colors.white,
      ),
      body: Center(
        child: Text(
          TranslationService.t('upcomingEvents'),
          style: const TextStyle(color: Colors.white70),
        ),
      ),
    );
  }
}
