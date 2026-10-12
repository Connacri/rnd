import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:rnd_campaign_app/core/constants/supabase_constants.dart';
import 'package:rnd_campaign_app/features/membership/models/membership.dart';

class MembershipService {
  final _client = Supabase.instance.client;

  Future<void> submitMembership(Membership membership) async {
    await _client.from(SupabaseConstants.tableMemberships).insert(
          membership.toJson(),
        );
  }
}
