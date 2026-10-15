// Gere la fiche Google Play (nom de l'application et descriptions) via
// l'API Android Publisher, avec le meme compte de service que la CI.
//
// Usage (depuis la racine du projet) :
//   dart run tool/play_listing.dart list      # etat actuel de la fiche
//   dart run tool/play_listing.dart check     # compare avec store/play/listings.json
//   dart run tool/play_listing.dart apply     # applique store/play/listings.json
//   dart run tool/play_listing.dart signing   # empreintes du certificat Play
//
// Identifiants : PLAY_SERVICE_ACCOUNT_JSON (JSON en ligne, utilise par la CI)
// ou GOOGLE_APPLICATION_CREDENTIALS (chemin du fichier JSON, en local).
//
// Le nom de l'application sur le Play Store est le champ `title` de la fiche
// dans la langue par defaut. Google limite le nombre de changements de nom :
// verifier le nombre de modifications restantes dans la Play Console avant
// d'appliquer un nouveau titre.
import 'dart:convert';
import 'dart:io';

import 'package:googleapis_auth/auth_io.dart';
import 'package:http/http.dart' as http;

/// Chemin du fichier decrivant la fiche attendue sur le Play Store.
const _listingsPath = 'store/play/listings.json';

/// Nom de paquet par defaut (application publiee).
const _defaultPackageName = 'com.rnd.dz';

const _scopes = <String>['https://www.googleapis.com/auth/androidpublisher'];

Future<void> main(List<String> args) async {
  final command = args.isEmpty ? 'list' : args.first;
  final packageName =
      Platform.environment['PLAY_PACKAGE_NAME'] ?? _defaultPackageName;
  final dryRun = args.contains('--dry-run');

  final client = await _authorizedClient(args);
  final api = _PublisherApi(client, packageName);

  try {
    switch (command) {
      case 'list':
        await _list(api);
      case 'check':
        await _check(api);
      case 'apply':
        await _apply(api, dryRun: dryRun);
      case 'signing':
        await _signing(api);
      default:
        stderr.writeln('Commande inconnue : $command');
        stderr.writeln('Commandes : list, check, apply, signing');
        exit(1);
    }
  } on PlayApiException {
    // Le detail de l'erreur a deja ete ecrit sur stderr par _decode.
    exit(1);
  } finally {
    client.close();
  }
}

/// Affiche la fiche publiee pour chaque langue.
Future<void> _list(_PublisherApi api) async {
  final remote = await api.listings();
  stdout.writeln('Fiche actuelle de ${api.packageName} '
      '(${remote.length} langue(s)) :');
  for (final MapEntry(key: language, value: listing) in remote.entries) {
    stdout.writeln('\n[$language]');
    stdout.writeln('  titre            : ${listing.title}');
    stdout.writeln('  description courte: ${listing.shortDescription}');
    stdout.writeln('  description      : ${listing.fullDescription}');
  }
}

/// Compare la fiche publiee au fichier local (sans rien modifier).
Future<void> _check(_PublisherApi api) async {
  final expected = _readListings();
  final remote = await api.listings();
  final drift = <String>[];

  for (final MapEntry(key: language, value: listing) in expected.entries) {
    final current = remote[language];
    if (current == null) {
      drift.add('$language : fiche absente sur le Play Store');
      continue;
    }
    if (current.title != listing.title) {
      drift.add('$language : titre "${current.title}" != "${listing.title}"');
    }
    if (current.shortDescription != listing.shortDescription) {
      drift.add('$language : description courte differente');
    }
    if (current.fullDescription != listing.fullDescription) {
      drift.add('$language : description complete differente');
    }
  }

  if (drift.isEmpty) {
    stdout.writeln('Fiche Play alignee sur $_listingsPath.');
    return;
  }
  stdout.writeln('Fiche Play differente de $_listingsPath :');
  for (final item in drift) {
    stdout.writeln('  - $item');
  }
  exit(1);
}

/// Applique la fiche decrite dans [_listingsPath].
Future<void> _apply(_PublisherApi api, {required bool dryRun}) async {
  final expected = _readListings();
  if (dryRun) {
    stdout.writeln('--dry-run : rien ne sera publie. Fiche visee :');
    for (final MapEntry(key: language, value: listing) in expected.entries) {
      stdout.writeln('  [$language] "${listing.title}" '
          '(${listing.shortDescription.length}/80, '
          '${listing.fullDescription.length}/4000 caracteres)');
    }
    return;
  }

  final editId = await api.openEdit();
  try {
    for (final MapEntry(key: language, value: listing) in expected.entries) {
      await api.updateListing(editId, language, listing);
      stdout.writeln('  $language : "${listing.title}" mis a jour');
    }
    final pendingReview = await api.commitEdit(editId);
    if (pendingReview) {
      stdout.writeln('Fiche Play enregistree et en attente : '
          'envoyez les changements en revue depuis la Play Console.');
    } else {
      stdout.writeln('Fiche Play mise a jour (en revue chez Google).');
    }
  } catch (_) {
    try {
      await api.discardEdit(editId);
    } catch (_) {
      // Abandon impossible : la modification reste ouverte et sera reprise.
    }
    rethrow;
  }
}

/// Affiche les empreintes du certificat de signature Play de la derniere
/// version publiee (verification de la lignee Play App Signing).
Future<void> _signing(_PublisherApi api) async {
  final versionCode = await api.latestProductionVersionCode();
  if (versionCode == null) {
    stdout.writeln('Aucune version publiee sur le canal production.');
    return;
  }
  stdout.writeln('Version production : $versionCode');
  final hashes = await api.signingCertificates(versionCode);
  if (hashes.isEmpty) {
    stdout.writeln('Aucune empreinte retournee par l\'API Play.');
    return;
  }
  for (final hash in hashes) {
    stdout.writeln('  SHA-256 : $hash');
  }
}

/// Fiche attendue sur le Play Store, lue depuis [_listingsPath].
Map<String, PlayListing> _readListings() {
  final file = File(_listingsPath);
  if (!file.existsSync()) {
    stderr.writeln('ERREUR : $file introuvable.');
    exit(1);
  }
  final json = jsonDecode(file.readAsStringSync());
  if (json is! Map<String, dynamic>) {
    stderr.writeln('ERREUR : $file doit contenir un objet JSON.');
    exit(1);
  }
  final listings = json['listings'];
  if (listings is! Map<String, dynamic> || listings.isEmpty) {
    stderr.writeln('ERREUR : $file doit contenir une entree "listings".');
    exit(1);
  }
  return listings.map(
    (language, value) =>
        MapEntry(language, PlayListing.fromJson(language, value)),
  );
}

/// Client HTTP authentifie par le compte de service Google Play.
Future<http.Client> _authorizedClient(List<String> args) async {
  final account = ServiceAccountCredentials.fromJson(_credentialsJson(args));
  return clientViaServiceAccount(account, _scopes);
}

/// Localise le compte de service : variable CI, fichier local ou argument.
Map<String, dynamic> _credentialsJson(List<String> args) {
  final inline = Platform.environment['PLAY_SERVICE_ACCOUNT_JSON'];
  if (inline != null && inline.trim().isNotEmpty) {
    return jsonDecode(inline) as Map<String, dynamic>;
  }
  final path = Platform.environment['GOOGLE_APPLICATION_CREDENTIALS'];
  if (path != null && path.trim().isNotEmpty) {
    return jsonDecode(File(path).readAsStringSync()) as Map<String, dynamic>;
  }
  final index = args.indexOf('--credentials');
  if (index >= 0 && index + 1 < args.length) {
    return jsonDecode(File(args[index + 1]).readAsStringSync())
        as Map<String, dynamic>;
  }
  stderr.writeln('ERREUR : compte de service Google Play introuvable. '
      'Definir PLAY_SERVICE_ACCOUNT_JSON ou GOOGLE_APPLICATION_CREDENTIALS.');
  exit(1);
}

/// Fiche d'une langue sur le Play Store.
class PlayListing {
  const PlayListing({
    required this.language,
    required this.title,
    required this.shortDescription,
    required this.fullDescription,
  });

  factory PlayListing.fromJson(String language, Object? value) {
    if (value is! Map<String, dynamic>) {
      stderr.writeln('ERREUR : fiche $language invalide dans $_listingsPath.');
      exit(1);
    }
    String field(String name) => (value[name] ?? '').toString();
    return PlayListing(
      language: language,
      title: field('title'),
      shortDescription: field('shortDescription'),
      fullDescription: field('fullDescription'),
    );
  }

  final String language;
  final String title;
  final String shortDescription;
  final String fullDescription;

  Map<String, String> toJson() => {
        'title': title,
        'shortDescription': shortDescription,
        'fullDescription': fullDescription,
      };

  /// Verifie les limites imposees par Google Play.
  void validate() {
    if (title.isEmpty || title.length > 30) {
      _invalid('title', title, 30);
    }
    if (shortDescription.isEmpty || shortDescription.length > 80) {
      _invalid('shortDescription', shortDescription, 80);
    }
    if (fullDescription.isEmpty || fullDescription.length > 4000) {
      _invalid('fullDescription', fullDescription, 4000);
    }
  }

  Never _invalid(String field, String value, int max) {
    stderr.writeln('ERREUR : $language.$field doit contenir de 1 a $max '
        'caracteres (recu : ${value.length}).');
    exit(1);
  }
}

/// Appels REST a l'API Android Publisher.
class _PublisherApi {
  _PublisherApi(this._client, this.packageName);

  final http.Client _client;
  final String packageName;

  static const _base = 'https://androidpublisher.googleapis.com'
      '/androidpublisher/v3/applications';

  Uri _uri(String path) => Uri.parse('$_base/$packageName/$path');

  Map<String, String> get _headers => const {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      };

  /// Ouvre une modification ("edit") de la fiche.
  Future<String> openEdit() async {
    final res =
        await _client.post(_uri('edits'), headers: _headers, body: '{}');
    final json = _decode(res, 'ouverture de la modification');
    return json['id'] as String;
  }

  /// Valide la modification.
  ///
  /// Certaines applications (publication geree ou validation obligatoire)
  /// refusent l'envoi automatique en revue : Google exige alors
  /// `changesNotSentForReview=true`. Les changements restent en attente et
  /// sont a envoyer en revue depuis la Play Console.
  Future<bool> commitEdit(String editId) async {
    final plain = await _client.post(
      _uri('edits/$editId:commit'),
      headers: _headers,
      body: '{}',
    );
    if (plain.statusCode >= 200 && plain.statusCode < 300) return false;

    final manual = await _client.post(
      _uri('edits/$editId:commit?changesNotSentForReview=true'),
      headers: _headers,
      body: '{}',
    );
    if (manual.statusCode >= 200 && manual.statusCode < 300) return true;

    _decode(manual, 'validation de la modification');
    return false;
  }

  /// Abandonne la modification en cours.
  Future<void> discardEdit(String editId) async {
    await _client.delete(_uri('edits/$editId'), headers: _headers);
  }

  /// Fiches publiees, indexees par langue.
  Future<Map<String, PlayListing>> listings() async {
    final editId = await openEdit();
    try {
      final res = await _client.get(
        _uri('edits/$editId/listings'),
        headers: _headers,
      );
      final json = _decode(res, 'lecture des fiches');
      final items = (json['listings'] as List<dynamic>? ?? const []);
      return {
        for (final Object? item in items)
          if (item is Map<String, dynamic>)
            item['language'] as String:
                PlayListing.fromJson(item['language'] as String, item),
      };
    } finally {
      await discardEdit(editId);
    }
  }

  /// Met a jour la fiche d'une langue.
  Future<void> updateListing(
    String editId,
    String language,
    PlayListing listing,
  ) async {
    listing.validate();
    final res = await _client.put(
      _uri('edits/$editId/listings/$language'),
      headers: _headers,
      body: jsonEncode(listing.toJson()),
    );
    _decode(res, 'mise a jour de la fiche $language');
  }

  /// Code de version le plus recent du canal production.
  Future<String?> latestProductionVersionCode() async {
    final editId = await openEdit();
    try {
      final res = await _client.get(
        _uri('edits/$editId/tracks/production'),
        headers: _headers,
      );
      final json = _decode(res, 'lecture du canal production');
      final releases = (json['releases'] as List<dynamic>? ?? const []);
      String? latest;
      for (final Object? release in releases) {
        if (release is! Map<String, dynamic>) continue;
        final codes = (release['versionCodes'] as List<dynamic>? ?? const []);
        for (final Object? code in codes) {
          final value = code.toString();
          if (latest == null ||
              (int.tryParse(value) ?? 0) > (int.tryParse(latest) ?? 0)) {
            latest = value;
          }
        }
      }
      return latest;
    } finally {
      await discardEdit(editId);
    }
  }

  /// Empreintes SHA-256 des certificats de signature d'une version.
  Future<Set<String>> signingCertificates(String versionCode) async {
    final res = await _client.get(
      _uri('generatedApks/$versionCode'),
      headers: _headers,
    );
    if (res.statusCode == 404) {
      stderr
          .writeln('Aucun APK genere disponible pour la version $versionCode.');
      return const {};
    }
    final json = _decode(res, 'lecture des APK generes');
    final hashes = <String>{};
    for (final Object? apk
        in (json['generatedApks'] as List<dynamic>? ?? const [])) {
      if (apk is! Map<String, dynamic>) continue;
      _collectHashes(apk, hashes);
      for (final String key in const [
        'generatedSplitApks',
        'generatedStandaloneApks'
      ]) {
        for (final Object? entry in (apk[key] as List<dynamic>? ?? const [])) {
          if (entry is Map<String, dynamic>) _collectHashes(entry, hashes);
        }
      }
      final universal = apk['generatedUniversalApk'];
      if (universal is Map<String, dynamic>) _collectHashes(universal, hashes);
    }
    return hashes;
  }

  void _collectHashes(Map<String, dynamic> node, Set<String> hashes) {
    final hash = node['certificateSha256Hash']?.toString();
    if (hash != null && hash.isNotEmpty) hashes.add(hash);
  }

  Map<String, dynamic> _decode(http.Response res, String action) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty) return const {};
      return jsonDecode(res.body) as Map<String, dynamic>;
    }
    stderr.writeln('ERREUR API Play ($action, HTTP ${res.statusCode}) : '
        '${res.body}');
    throw PlayApiException(action);
  }
}

/// Erreur HTTP renvoyee par l'API Play (le detail est deja ecrit sur stderr).
class PlayApiException implements Exception {
  PlayApiException(this.action);

  /// Nom de l'operation en echec.
  final String action;

  @override
  String toString() => 'API Play : $action a echoue';
}
