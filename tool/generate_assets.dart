// Genere les icones, favicons et images du site (public/) et l'icone de la
// fiche Google Play (store/) a partir des sources graphiques du projet.
//
// Usage (depuis la racine du projet) :
//   dart run tool/generate_assets.dart
//
// Sources :
//   assets/icons/icon.png    -> icone / logo de l'application
//   assets/icons/splash.png  -> image de demarrage
//
// L'icone de la fiche Play (store/play/icon-512.png) est televersee par
// `dart run tool/play_listing.dart icon`.
//
// Les icones natives (Android, iOS, macOS, Windows) et l'ecran de demarrage
// sont generes separement par flutter_launcher_icons et flutter_native_splash,
// configures dans pubspec.yaml :
//   dart run flutter_launcher_icons
//   dart run flutter_native_splash:create
//
// Le fond des visuels composes reprend la couleur du coin du logo : les
// icones masquables restent ainsi sans raccord avec le logo, et les visuels
// restent lisibles sur iOS, qui ne gere pas la transparence des icones
// d'ecran d'accueil. Cette valeur est alignee sur `adaptive_icon_background`
// de pubspec.yaml.
import 'dart:io';

import 'package:image/image.dart' as img;

/// Source de l'icone / du logo.
const _iconSource = 'assets/icons/icon.png';

/// Source de l'image de demarrage.
const _splashSource = 'assets/icons/splash.png';

/// Fond de repli quand le logo est transparent sur ses bords.
final img.Color _fallbackBackground = img.ColorRgb8(0xFF, 0xFF, 0xFF);

/// Part de la toile occupee par le logo d'une icone masquable.
const _maskableInset = 0.8;

/// Icones du site React (affichees et referencees par index.html).
const _siteIcons = <String, int>{
  'public/assets/icons/icon.png': 512,
  'public/assets/icons/icon-192.png': 192,
  'public/assets/icons/icon-512.png': 512,
  'public/rnd-icon.png': 192,
};

/// Icones masquables du site (referencees par public/site.webmanifest) :
/// logo reduit dans la zone sure, sur le fond du logo.
const _siteMaskableIcons = <String, int>{
  'public/assets/icons/icon-maskable-512.png': 512,
};

/// Favicons du site.
const _faviconPng = 48;
const _appleTouchIcon = 180;

/// Icone de la fiche Google Play : visuel carre opaque de 512x512 pixels,
/// format impose par la Play Console. Televersee par tool/play_listing.dart.
const _playStoreIcon = 'store/play/icon-512.png';
const _playStoreIconSize = 512;

/// Tailles embarquees dans public/favicon.ico.
const _faviconIcoSizes = <int>[16, 32, 48];

Future<void> main() async {
  final icon = await _load(_iconSource);
  final splash = await _load(_splashSource);

  final background = _backgroundColor(icon);
  stdout.writeln('Sources : $_iconSource (${icon.width}px), '
      '$_splashSource (${splash.width}px)');
  stdout.writeln('  fond des icones : #${_hex(background)}');

  for (final MapEntry(key: path, value: size) in _siteIcons.entries) {
    await _writeSquare(icon, path, size, background);
  }

  for (final MapEntry(key: path, value: size) in _siteMaskableIcons.entries) {
    await _writeSquare(icon, path, size, background, maskable: true);
  }

  await _writeSquare(icon, _playStoreIcon, _playStoreIconSize, background);

  await _writePng(
      _flatten(icon, _faviconPng, background), 'public/favicon.png');
  await _writePng(_flatten(icon, _appleTouchIcon, background),
      'public/apple-touch-icon.png');

  final frames = [
    for (final size in _faviconIcoSizes) _flatten(icon, size, background),
  ];
  await _writeBytes(
      img.IcoEncoder().encodeImages(frames), 'public/favicon.ico');

  // Le site sert la meme image de demarrage que l'application.
  await _writeBytes(
      File(_splashSource).readAsBytesSync(), 'public/assets/icons/splash.png');

  stdout.writeln('Assets du site et de la fiche Play regeneres.');
}

/// Couleur de fond des visuels composes : le coin du logo, ou le fond de
/// repli si ce coin est transparent.
img.Color _backgroundColor(img.Image source) {
  final corner = source.getPixel(0, 0);
  return corner.a < 128 ? _fallbackBackground : corner;
}

/// Representation hexadecimale RVB d'une couleur (pour les journaux).
String _hex(img.Color color) =>
    '${color.r.toInt().toRadixString(16).padLeft(2, '0')}'
    '${color.g.toInt().toRadixString(16).padLeft(2, '0')}'
    '${color.b.toInt().toRadixString(16).padLeft(2, '0')}';

Future<img.Image> _load(String path) async {
  final file = File(path);
  if (!file.existsSync()) {
    stderr.writeln('ERREUR : source introuvable : $path');
    exit(1);
  }
  final decoded = img.decodeImage(file.readAsBytesSync());
  if (decoded == null) {
    stderr.writeln('ERREUR : image illisible : $path');
    exit(1);
  }
  return decoded;
}

/// Redimensionne [source] en carre de [size] pixels, fond [background] opaque.
img.Image _flatten(img.Image source, int size, img.Color background,
    {bool maskable = false}) {
  final canvas = img.Image(width: size, height: size, numChannels: 4)
    ..clear(background);

  if (!maskable) {
    final resized = img.copyResize(
      source,
      width: size,
      height: size,
      interpolation: img.Interpolation.cubic,
    );
    img.compositeImage(canvas, resized);
    return canvas;
  }

  // Icone masquable : le logo reste dans la zone sure (80 % de la toile).
  final inner = (size * _maskableInset).round();
  final scaled = img.copyResize(
    source,
    width: inner,
    height: inner,
    interpolation: img.Interpolation.cubic,
  );
  final offset = ((size - inner) / 2).round();
  img.compositeImage(canvas, scaled, dstX: offset, dstY: offset);
  return canvas;
}

Future<void> _writeSquare(
  img.Image source,
  String path,
  int size,
  img.Color background, {
  bool maskable = false,
}) =>
    _writePng(_flatten(source, size, background, maskable: maskable), path);

Future<void> _writePng(img.Image image, String path) =>
    _writeBytes(img.encodePng(image, level: 9), path);

Future<void> _writeBytes(List<int> bytes, String path) async {
  final file = File(path);
  await file.parent.create(recursive: true);
  await file.writeAsBytes(bytes, flush: true);
  stdout.writeln('  $path (${bytes.length} octets)');
}
