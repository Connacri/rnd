import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'package:rnd_campaign_app/app/theme.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/features/content/providers/content_provider.dart';
import 'package:rnd_campaign_app/features/events/models/event.dart';
import 'package:rnd_campaign_app/l10n/app_localizations.dart';

class EventsPage extends StatelessWidget {
  const EventsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final content = context.watch<ContentProvider>();
    return Scaffold(
      backgroundColor: AppTheme.bgDark,
      appBar: AppBar(
        title: Text(l.events),
        backgroundColor: AppTheme.bgDark,
        foregroundColor: Colors.white,
      ),
      body: SafeArea(child: _buildBody(context, l, content)),
    );
  }

  Widget _buildBody(
    BuildContext context,
    AppLocalizations l,
    ContentProvider content,
  ) {
    if (content.isLoading) {
      return const Center(
        child: CircularProgressIndicator(color: AppTheme.accentCyan),
      );
    }
    if (content.status == ContentStatus.error) {
      return _MessageState(
        icon: Icons.cloud_off_outlined,
        message: l.contentLoadFailed,
        onRetry: content.load,
        retryLabel: l.retry,
      );
    }
    final events = content.events;
    if (events.isEmpty) {
      return _MessageState(
        icon: Icons.event_available_outlined,
        message: l.upcomingEvents,
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.all(20),
      itemCount: events.length,
      itemBuilder: (context, index) =>
          _EventCard(event: events[index], fallback: l.upcomingEvents),
    );
  }
}

class _EventCard extends StatelessWidget {
  final AppEvent event;
  final String fallback;

  const _EventCard({required this.event, required this.fallback});

  @override
  Widget build(BuildContext context) {
    final lang = TranslationService.currentLang;
    final title = event.titleFor(lang);
    final description = event.descriptionFor(lang);
    final location = event.locationFor(lang);
    final date = event.eventDate;
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.white.withValues(alpha: 0.05),
            Colors.white.withValues(alpha: 0.02),
          ],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Text('📅', style: TextStyle(fontSize: 28)),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title.isNotEmpty ? title : fallback,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
          if (date != null) ...[
            const SizedBox(height: 10),
            Text(
              DateFormat('EEEE d MMMM y', lang).format(date.toLocal()),
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppTheme.accentCyan,
              ),
            ),
          ],
          if (description.isNotEmpty) ...[
            const SizedBox(height: 10),
            Text(
              description,
              style: TextStyle(
                fontSize: 14,
                color: Colors.white.withValues(alpha: 0.7),
                height: 1.5,
              ),
            ),
          ],
          if (location.isNotEmpty) ...[
            const SizedBox(height: 10),
            Row(
              children: [
                Icon(
                  Icons.place_outlined,
                  size: 16,
                  color: Colors.white.withValues(alpha: 0.5),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    location,
                    style: TextStyle(
                      fontSize: 13,
                      color: Colors.white.withValues(alpha: 0.5),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}

class _MessageState extends StatelessWidget {
  final IconData icon;
  final String message;
  final VoidCallback? onRetry;
  final String? retryLabel;

  const _MessageState({
    required this.icon,
    required this.message,
    this.onRetry,
    this.retryLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
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
                border: Border.all(
                    color: AppTheme.accentCyan.withValues(alpha: 0.3)),
              ),
              child: Icon(icon, color: AppTheme.accentCyan, size: 40),
            ),
            const SizedBox(height: 20),
            Text(
              message,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 15,
                height: 1.5,
              ),
            ),
            if (onRetry != null) ...[
              const SizedBox(height: 20),
              TextButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh, color: AppTheme.accentCyan),
                label: Text(
                  retryLabel ?? '',
                  style: const TextStyle(color: AppTheme.accentCyan),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
