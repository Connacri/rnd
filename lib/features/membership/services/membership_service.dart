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

  Future<List<Membership>> getUserMemberships(String userId) async {
    final response = await _client
        .from(SupabaseConstants.tableMemberships)
        .select()
        .eq('user_id', userId)
        .order('created_at', ascending: false);

    return (response as List)
        .map((json) => Membership.fromJson(json as Map<String, dynamic>))
        .toList();
  }
}
