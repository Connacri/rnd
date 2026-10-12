class Membership {
  final String id;
  final String userId;
  final String fullName;
  final String email;
  final String phone;
  final String? address;
  final String? city;
  final String? wilaya;
  final bool isActive;
  final DateTime createdAt;

  Membership({
    required this.id,
    required this.userId,
    required this.fullName,
    required this.email,
    required this.phone,
    this.address,
    this.city,
    this.wilaya,
    this.isActive = false,
    required this.createdAt,
  });

  factory Membership.fromJson(Map<String, dynamic> json) {
    return Membership(
      id: json['id'] as String,
      userId: json['user_id'] as String,
      fullName: json['full_name'] as String,
      email: json['email'] as String,
      phone: json['phone'] as String,
      address: json['address'] as String?,
      city: json['city'] as String?,
      wilaya: json['wilaya'] as String?,
      isActive: json['is_active'] as bool? ?? false,
      createdAt: DateTime.parse(json['created_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'full_name': fullName,
      'email': email,
      'phone': phone,
      'address': address,
      'city': city,
      'wilaya': wilaya,
      'is_active': isActive,
    };
  }
}
