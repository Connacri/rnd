// Envoie une notification FCM pour chaque actualité Supabase non notifiée.
//
// Usage (depuis la racine du projet) :
//   SUPABASE_SERVICE_ROLE_KEY=... \
//   GOOGLE_APPLICATION_CREDENTIALS=/chemin/vers/compte-service.json \
//   dart run tool/notify_news.dart
//
// Le compte de service doit avoir le rôle "Firebase Cloud Messaging API
// Admin" sur le projet Firebase (rnd-aet). La clé se génère dans la
// console Firebase > Paramètres > Comptes de service.
//
// Le script marque `push_sent_at` sur chaque news envoyée pour ne pas
// renvoyer deux fois la même notification.
import 'dart:convert';
import 'dart:io';

import 'package:googleapis_auth/auth_io.dart';
import 'package:http/http.dart' as http;
import 'package:supabase_flutter/supabase_flutter.dart';

const _projectId =
    String.fromEnvironment('FIREBASE_PROJECT_ID', defaultValue: 'rnd-aet');

Future<void> main() async {
  final serviceKey = Platform.environment['SUPABASE_SERVICE_ROLE_KEY'];
  final supabaseUrl = Platform.environment['SUPABASE_URL'];
  if (serviceKey == null || serviceKey.isEmpty) {
    stderr.writeln('ERREUR : SUPABASE_SERVICE_ROLE_KEY manquante.');
    exit(1);
  }
  if (supabaseUrl == null || supabaseUrl.isEmpty) {
    stderr.writeln('ERREUR : SUPABASE_URL manquante.');
    exit(1);
  }

  await Supabase.initialize(url: supabaseUrl, publishableKey: serviceKey);
  final client = Supabase.instance.client;

  final pending = await client
      .from('news')
      .select()
      .eq('is_published', true)
      .isFilter('push_sent_at', null)
      .order('created_at');

  if (pending.isEmpty) {
    stdout.writeln('Aucune actualité en attente de notification.');
    return;
  }

  final token = await _accessToken();
  for (final row in pending) {
    final title = _localized(row['title']);
    final body = _localized(row['body']);
    await _send(token, title, body);
    await client
        .from('news')
        .update({'push_sent_at': DateTime.now().toUtc().toIso8601String()}).eq(
            'id', row['id']);
    stdout.writeln('✔ Notification envoyée : $title');
  }
}

String _localized(Object? value) {
  if (value is String) return value;
  if (value is Map) {
    return (value['fr'] ?? value['en'] ?? value.values.first)?.toString() ?? '';
  }
  return '';
}

Future<String> _accessToken() async {
  final credsPath = Platform.environment['GOOGLE_APPLICATION_CREDENTIALS'];
  if (credsPath == null || credsPath.isEmpty) {
    stderr.writeln('ERREUR : GOOGLE_APPLICATION_CREDENTIALS manquante. '
        'Pointez-la vers la clé JSON d\'un compte de service Firebase '
        'avec le rôle "Firebase Cloud Messaging API Admin".');
    exit(1);
  }
  final account = ServiceAccountCredentials.fromJson(
      jsonDecode(File(credsPath).readAsStringSync()));
  final client = await clientViaServiceAccount(
    account,
    const ['https://www.googleapis.com/auth/firebase.messaging'],
  );
  final token = client.credentials.accessToken.data;
  client.close();
  return token;
}

Future<void> _send(String token, String title, String body) async {
  final url = Uri.parse(
      'https://fcm.googleapis.com/v1/projects/$_projectId/messages:send');
  final payload = {
    'message': {
      'topic': 'news',
      'notification': {'title': title, 'body': body},
      'android': {
        'priority': 'high',
        'notification': {'channel_id': 'news'},
      },
    },
  };
  final res = await http.post(
    url,
    headers: {
      'Authorization': 'Bearer $token',
      'Content-Type': 'application/json',
    },
    body: jsonEncode(payload),
  );
  if (res.statusCode != 200) {
    stderr.writeln('ERREUR FCM (${res.statusCode}) : ${res.body}');
    exit(1);
  }
}
