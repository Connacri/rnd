import 'package:flutter/material.dart';
import 'package:rnd_campaign_app/app/theme.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';

class EventsPage extends StatelessWidget {
  const EventsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        title: Text(l.events),
        backgroundColor: AppTheme.bgDark,
        foregroundColor: Colors.white,
      ),
      body: SafeArea(
        child: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 88,
                height: 88,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppTheme.accentCyan.withValues(alpha: 0.1),
                  border: Border.all(color: AppTheme.accentCyan.withValues(alpha: 0.3)),
                ),
                child: const Icon(
                  Icons.event_available_outlined,
                  color: AppTheme.accentCyan,
                  size: 40,
                ),
              ),
              const SizedBox(height: 20),
              Text(
                l.upcomingEvents,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: Colors.white70,
                  fontSize: 15,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
        ),
      ),
    );
  }
}
