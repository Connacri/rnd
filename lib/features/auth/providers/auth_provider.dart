import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:rnd_campaign_app/features/auth/models/app_user.dart';
import 'package:rnd_campaign_app/features/auth/services/auth_service.dart';

class AuthProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();

  AppUser? _user;
  bool _isLoading = false;
  String? _error;
  StreamSubscription<AppUser?>? _authSubscription;

  AuthProvider() {
    // Restaure la session Firebase persistée localement et suit les
    // changements d'état (login/logout depuis un autre écran, expiration
    // de session, sign-in Google terminé en arrière-plan...).
    _user = _authService.currentUser;
    _authSubscription = _authService.authStateChanges.listen((user) {
      _user = user;
      notifyListeners();
    });
  }

  AppUser? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;

  Future<bool> login(String email, String password) async {
    return _run(() async {
      _user = await _authService.signInWithEmail(
        email: email,
        password: password,
      );
      return _user != null;
    });
  }

  Future<bool> register(String email, String password, String name) async {
    return _run(() async {
      _user = await _authService.signUpWithEmail(
        email: email,
        password: password,
        name: name,
      );
      return _user != null;
    });
  }

  Future<bool> loginWithGoogle() async {
    return _run(() async {
      _user = await _authService.signInWithGoogle();
      return _user != null;
    });
  }

  /// Envoie l'e-mail de réinitialisation. Retourne true si envoyé.
  Future<bool> resetPassword(String email) async {
    return _run(() async {
      await _authService.sendPasswordReset(email);
      return true;
    });
  }

  Future<void> logout() async {
    await _authService.signOut();
    _user = null;
    notifyListeners();
  }

  void clearError() {
    if (_error != null) {
      _error = null;
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _authSubscription?.cancel();
    super.dispose();
  }

  Future<bool> _run(Future<bool> Function() action) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await action();
      _isLoading = false;
      notifyListeners();
      return result;
    } on FirebaseAuthException catch (e) {
      _error = _localizedMessage(e);
      _isLoading = false;
      notifyListeners();
      return false;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  /// Messages d'erreur lisibles (en dur côté client : ces chaînes sont
  /// affichées dans un SnackBar technique, les libellés UI restent
  /// localisés via les clés l10n).
  String _localizedMessage(FirebaseAuthException e) {
    switch (e.code) {
      case 'invalid-credential':
      case 'wrong-password':
      case 'user-not-found':
        return 'Email ou mot de passe incorrect.';
      case 'email-already-in-use':
        return 'Un compte existe déjà avec cet email.';
      case 'weak-password':
        return 'Mot de passe trop faible (6 caractères minimum).';
      case 'invalid-email':
        return 'Adresse email invalide.';
      case 'too-many-requests':
        return 'Trop de tentatives. Réessayez plus tard.';
      case 'network-request-failed':
        return 'Connexion réseau impossible. Vérifiez Internet.';
      case 'operation-not-allowed':
        return 'Méthode de connexion désactivée dans Firebase.';
      case 'popup-closed-by-user':
        return 'Fenêtre Google fermée avant la fin.';
      default:
        return e.message ?? 'Erreur d\'authentification (${e.code}).';
    }
  }
}
