import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:rnd_campaign_app/features/auth/models/app_user.dart';

class AuthService {
  final _client = Supabase.instance.client;

  Future<AppUser?> signInWithEmail({
    required String email,
    required String password,
  }) async {
    final response = await _client.auth.signInWithPassword(
      email: email,
      password: password,
    );
    if (response.user == null) return null;
    return _userFromSupabase(response.user!);
  }

  Future<AppUser?> signUpWithEmail({
    required String email,
    required String password,
    required String name,
  }) async {
    final response = await _client.auth.signUp(
      email: email,
      password: password,
      data: {'name': name},
    );
    if (response.user == null) return null;
    return _userFromSupabase(response.user!);
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }

  AppUser? get currentUser {
    final user = _client.auth.currentUser;
    if (user == null) return null;
    return _userFromSupabase(user);
  }

  AppUser _userFromSupabase(User user) {
    return AppUser(
      id: user.id,
      email: user.email ?? '',
      name: user.userMetadata?['name'] as String?,
    );
  }
}
