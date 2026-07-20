import 'dart:io';

import 'package:supabase_flutter/supabase_flutter.dart';

class StorageService {
  final _storage = Supabase.instance.client.storage;

  Future<String> uploadImage({
    required String bucket,
    required String path,
    required File file,
  }) async {
    await _storage.from(bucket).upload(path, file);
    return _storage.from(bucket).getPublicUrl(path);
  }

  Future<void> deleteImage({
    required String bucket,
    required String path,
  }) async {
    await _storage.from(bucket).remove([path]);
  }
}
