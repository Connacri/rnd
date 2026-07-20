import 'package:flutter/foundation.dart';
import 'package:rnd_campaign_app/features/membership/models/membership.dart';
import 'package:rnd_campaign_app/features/membership/services/membership_service.dart';

class MembershipProvider extends ChangeNotifier {
  final MembershipService _service = MembershipService();

  bool _isLoading = false;
  String? _error;
  bool _success = false;

  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get success => _success;

  Future<bool> submitMembership({
    required String userId,
    required String fullName,
    required String email,
    required String phone,
    String? address,
    String? city,
    String? wilaya,
  }) async {
    _isLoading = true;
    _error = null;
    _success = false;
    notifyListeners();

    try {
      final membership = Membership(
        id: '',
        userId: userId,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        wilaya: wilaya,
        createdAt: DateTime.now(),
      );

      await _service.submitMembership(membership);
      _success = true;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
