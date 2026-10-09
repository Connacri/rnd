import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';

import 'package:rnd_campaign_app/features/auth/models/app_user.dart';

/// Authentification centralisée sur Firebase Auth.
///
/// - E-mail / mot de passe (login, inscription, réinitialisation)
/// - Google Sign-In : `signInWithPopup` sur Web, plugin `google_sign_in`
///   sur Android/iOS (le client ID est lu dans google-services.json).
///
/// Aucune logique d'authentification Supabase ne subsiste : Supabase n'est
/// utilisé que comme stockage de données (memberships, storage).
class AuthService {
  AuthService({FirebaseAuth? auth}) : _auth = auth ?? FirebaseAuth.instance;

  final FirebaseAuth _auth;

  /// Flux d'état d'authentification (connecté / déconnecté).
  Stream<AppUser?> get authStateChanges =>
      _auth.authStateChanges().map(_mapUser);

  AppUser? get currentUser => _mapUser(_auth.currentUser);

  Future<AppUser?> signInWithEmail({
    required String email,
    required String password,
  }) async {
    final credential = await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );
    return _mapUser(credential.user);
  }

  Future<AppUser?> signUpWithEmail({
    required String email,
    required String password,
    required String name,
  }) async {
    final credential = await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );
    await credential.user?.updateDisplayName(name);
    await credential.user?.sendEmailVerification().catchError((_) => null);
    return _mapUser(credential.user);
  }

  /// Envoie un e-mail de réinitialisation du mot de passe.
  Future<void> sendPasswordReset(String email) async {
    await _auth.sendPasswordResetEmail(email: email);
  }

  Future<AppUser?> signInWithGoogle() async {
    if (kIsWeb) {
      final credential = await _auth.signInWithPopup(GoogleAuthProvider());
      return _mapUser(credential.user);
    }

    await GoogleSignIn.instance.initialize();
    final account = await GoogleSignIn.instance.authenticate();
    final idToken = account.authentication.idToken;
    if (idToken == null) {
      throw FirebaseAuthException(
        code: 'missing-id-token',
        message: 'Google Sign-In a échoué (aucun ID token).',
      );
    }

    final credential = await _auth.signInWithCredential(
      GoogleAuthProvider.credential(idToken: idToken),
    );
    return _mapUser(credential.user);
  }

  Future<void> signOut() async {
    if (!kIsWeb) {
      await GoogleSignIn.instance.signOut().catchError((_) => null);
    }
    await _auth.signOut();
  }

  AppUser? _mapUser(User? user) {
    if (user == null) return null;
    return AppUser(
      id: user.uid,
      email: user.email ?? '',
      name: user.displayName,
      avatarUrl: user.photoURL,
      createdAt: user.metadata.creationTime,
    );
  }
}
