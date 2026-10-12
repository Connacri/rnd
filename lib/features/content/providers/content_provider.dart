import 'package:flutter/material.dart';
import 'package:rnd_campaign_app/core/services/program_data.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';
import 'package:rnd_campaign_app/core/utils/localized_text.dart';
import 'package:rnd_campaign_app/features/content/models/content_models.dart';
import 'package:rnd_campaign_app/features/content/services/content_service.dart';
import 'package:rnd_campaign_app/features/events/models/event.dart';
import 'package:rnd_campaign_app/features/candidate/models/candidate.dart';

enum ContentStatus { initial, loading, ready, error }

/// Contenu éditable depuis le dashboard Supabase, avec repli sur les
/// données statiques embarquées si les tables sont vides ou injoignables.
///
/// Les lignes brutes (JSONB localisés) sont conservées telles quelles et
/// résolues à la volée via [TranslationService.currentLang] : un changement
/// de langue suffit à re-traduire sans re-fetch.
class ContentProvider extends ChangeNotifier {
  ContentProvider({ContentService? service})
      : _service = service ?? ContentService();

  final ContentService _service;

  ContentStatus _status = ContentStatus.initial;
  String? _error;
  bool _hasRemoteData = false;

  List<Map<String, dynamic>> _programs = const [];
  List<Map<String, dynamic>> _programItems = const [];
  List<Map<String, dynamic>> _events = const [];
  List<Map<String, dynamic>> _candidates = const [];
  List<Map<String, dynamic>> _homeStats = const [];
  List<Map<String, dynamic>> _news = const [];

  ContentStatus get status => _status;
  String? get error => _error;
  bool get isLoading => _status == ContentStatus.loading;

  /// Vrai quand au moins une table a répondu (même partiellement).
  bool get hasRemoteData => _hasRemoteData;

  /// Piliers du programme : base Supabase si disponible, sinon les données
  /// statiques embarquées ([ProgramData.getPillars()]).
  List<PillarItem> get pillars {
    if (_programs.isEmpty) return ProgramData.getPillars();
    final itemsByProgram = <String, List<String>>{};
    for (final row in _programItems) {
      final pid = row['program_id'] as String?;
      if (pid == null) continue;
      itemsByProgram.putIfAbsent(pid, () => []).add(localizedText(row['text']));
    }
    return _programs.map((p) {
      final id = p['id'] as String;
      return PillarItem(
        number: (p['number'] as String?) ?? '',
        icon: (p['icon'] as String?) ?? '📌',
        title: localizedText(p['title']),
        subtitle: localizedText(p['subtitle']),
        tag: localizedText(p['tag']),
        items: (itemsByProgram[id] ?? const [])
            .where((s) => s.isNotEmpty)
            .toList(),
        accentColor: colorFromHex(p['accent_color'] as String?),
      );
    }).toList();
  }

  /// Chiffres de la page d'accueil : base ou valeurs statiques historiques.
  List<HomeStat> get homeStats {
    if (_homeStats.isEmpty) {
      return [
        HomeStat(
            icon: '🏛️',
            number: '451',
            label: {'fr': TranslationService.t('mairiesRnd')}),
        HomeStat(
            icon: '👥',
            number: '6 521',
            label: {'fr': TranslationService.t('elusCommunaux')}),
        HomeStat(
            icon: '🏛️',
            number: '58',
            label: {'fr': TranslationService.t('deputesApn')}),
        HomeStat(
            icon: '📅',
            number: '28',
            label: {'fr': TranslationService.t('yearsEngagement')}),
      ];
    }
    return _homeStats.map(HomeStat.fromJson).toList();
  }

  /// Évènements publiés, du plus récent au plus ancien.
  List<AppEvent> get events => _events.map(AppEvent.fromJson).toList();

  /// Candidat actif (premier de la liste), ou null si absent.
  Candidate? get candidate {
    if (_candidates.isEmpty) return null;
    return Candidate.fromJson(_candidates.first);
  }

  /// Actualités publiées, du plus récent au plus ancien.
  List<NewsItem> get news => _news.map(NewsItem.fromJson).toList();

  /// Charge tout en parallèle ; une table en erreur ne bloque pas les autres.
  Future<void> load() async {
    if (_status == ContentStatus.loading) return;
    _status = ContentStatus.loading;
    _error = null;
    notifyListeners();

    final results = await Future.wait([
      _guard(_service.fetchPrograms),
      _guard(_service.fetchProgramItems),
      _guard(_service.fetchEvents),
      _guard(_service.fetchCandidates),
      _guard(_service.fetchHomeStats),
      _guard(() => _service.fetchNews()),
    ]);

    _programs = results[0] ?? const [];
    _programItems = results[1] ?? const [];
    _events = results[2] ?? const [];
    _candidates = results[3] ?? const [];
    _homeStats = results[4] ?? const [];
    _news = results[5] ?? const [];

    final failures = results.where((r) => r == null).length;
    _hasRemoteData = results.any((r) => r != null);
    if (failures == results.length) {
      _status = ContentStatus.error;
      _error = 'contentLoadFailed';
    } else {
      _status = ContentStatus.ready;
    }
    notifyListeners();
  }

  Future<List<Map<String, dynamic>>?> _guard(
    Future<List<Map<String, dynamic>>> Function() fetch,
  ) async {
    try {
      return await fetch();
    } catch (_) {
      return null;
    }
  }
}
