import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

/// Notifications push FCM centralisées ici (jamais ailleurs dans l'app).
///
/// Flux :
///  * init() : demande de permission (Android 13+), canal Android,
///    handlers foreground / background / terminated, abonnement au topic
///    « news » (actualités ajoutées par l'administrateur dans Supabase).
///  * L'envoi serveur est fait hors app (console Firebase ou
///    `dart run tool/notify_news.dart`) — pas de backend custom.
///
/// Le canal « news » reçoit les messages FCM dont le payload porte
/// `notification` ; les messages data-only sont affichés en local via
/// [FlutterLocalNotificationsPlugin].
class NotificationService {
  NotificationService._();
  static final NotificationService instance = NotificationService._();

  static const _channelId = 'news';
  static const _channelName = 'Actualités';
  static const newsTopic = 'news';

  final _messaging = FirebaseMessaging.instance;
  final _local = FlutterLocalNotificationsPlugin();

  bool _initialized = false;

  Future<void> init() async {
    if (_initialized) return;

    // Permission (no-op sur iOS < 10 / Android < 13 géré par le plugin).
    await _messaging.requestPermission(alert: true, badge: true, sound: true);

    const channel = AndroidNotificationChannel(
      _channelId,
      _channelName,
      description: 'Actualités et annonces de la campagne RND',
      importance: Importance.high,
    );
    final android = _local.resolvePlatformSpecificImplementation<
        AndroidFlutterLocalNotificationsPlugin>();
    await android?.createNotificationChannel(channel);

    await _local.initialize(
      settings: const InitializationSettings(
        android: AndroidInitializationSettings('@mipmap/launcher_icon'),
      ),
    );

    // App au premier plan : on affiche nous-mêmes la notif locale
    // (FCM n'affiche pas les notifications en foreground sur Android).
    FirebaseMessaging.onMessage.listen(_onForegroundMessage);

    // App en arrière-plan ou terminée, tap sur la notif : FCM ouvre
    // MainActivity (launchMode=singleTop) ; pas de deep-link pour l'instant.
    FirebaseMessaging.onMessageOpenedApp.listen((_) {});

    await _messaging.subscribeToTopic(newsTopic);

    if (kDebugMode) {
      final token = await _messaging.getToken();
      debugPrint('FCM token: $token (topic "$newsTopic" abonné)');
    }

    _initialized = true;
  }

  Future<void> _onForegroundMessage(RemoteMessage message) async {
    final notification = message.notification;
    final title = notification?.title ?? message.data['title'] as String?;
    final body = notification?.body ?? message.data['body'] as String?;
    if (title == null && body == null) return;
    await _local.show(
      id: message.hashCode,
      title: title,
      body: body,
      notificationDetails: const NotificationDetails(
        android: AndroidNotificationDetails(
          _channelId,
          _channelName,
          channelDescription: 'Actualités et annonces de la campagne RND',
          importance: Importance.high,
          priority: Priority.high,
        ),
        iOS: DarwinNotificationDetails(),
      ),
    );
  }
}
