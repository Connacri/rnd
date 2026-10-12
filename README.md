<div align="center">

<img src="assets/icons/icon.png" width="140" alt="RND-ORAN"/>

# RND-ORAN

**Application de campagne municipale 2026 — Aïn El Turck, Oran**

Application officielle de campagne de **Nabil Zenasni**, secrétaire du bureau
communal du **RND** (Rassemblement National Démocratique) à Aïn El Turck.

[![CI](https://github.com/Connacri/rnd/actions/workflows/ci.yml/badge.svg)](https://github.com/Connacri/rnd/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/Connacri/rnd?sort=semver&label=version)](https://github.com/Connacri/rnd/releases)
[![Flutter](https://img.shields.io/badge/Flutter-3.44.0-02569B?logo=flutter&logoColor=white)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-%3E%3D3.0-0175C2?logo=dart&logoColor=white)](https://dart.dev)
[![Android](https://img.shields.io/badge/Android-23%2B-3DDC84?logo=android&logoColor=white)](https://developer.android.com)
[![Licence](https://img.shields.io/badge/licence-propri%C3%A9taire-red)](#licence)

[🌐 Application web](https://connacri.github.io/rnd/) ·
[⬇️ Télécharger l'APK](https://github.com/Connacri/rnd/releases/latest/download/rnd-android.apk) ·
[📦 Toutes les releases](https://github.com/Connacri/rnd/releases) ·
[⚙️ CI/CD](https://github.com/Connacri/rnd/actions)

</div>

---

## Table des matières

- [Présentation](#présentation)
- [Captures d'écran](#captures-décran)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture du projet](#architecture-du-projet)
- [Prérequis](#prérequis)
- [Démarrage rapide](#démarrage-rapide)
- [Internationalisation](#internationalisation)
- [Contenu éditable (Supabase)](#contenu-éditable-supabase)
- [Notifications (FCM)](#notifications-fcm)
- [Android](#android)
- [Builds](#builds)
- [CI/CD](#cicd)
- [Téléchargements](#téléchargements)
- [Licence et crédits](#licence-et-crédits)

---

## Présentation

**RND-ORAN** est l'application de campagne mobile et web du candidat
**Nabil Zenasni** pour les élections communales de 2026 à Aïn El Turck (Oran,
Algérie).

L'application est écrite en **Flutter** et fonctionne sur **Android** (APK/AAB),
**Web** (build déployée sur GitHub Pages) et **Windows** (archive portable).

Le contenu (programme, actualités, événements, chiffres clés) est éditable sans
redéploiement depuis une base **Supabase** ; l'authentification et les
notifications push s'appuient sur **Firebase**.

## Captures d'écran

<div align="center">

<img src="assets/images/1000011155.png" width="200" alt="Accueil"/>
<img src="assets/images/1000011156.png" width="200" alt="Programme"/>
<img src="assets/images/1000011157.png" width="200" alt="Adhésion"/>
<img src="assets/images/1000011158.png" width="200" alt="Événements"/>

</div>

## Fonctionnalités

| Module | Description |
| --- | --- |
| **Accueil** | Présentation du candidat, message audio, chiffres clés du RND, dernières actualités |
| **Candidat** | Biographie, vision et valeurs (éditables depuis Supabase) |
| **Programme** | Piliers thématiques et points détaillés (éditables depuis Supabase) |
| **Adhésion** | Formulaire d'adhésion au mouvement, validation des champs |
| **Événements** | Calendrier des événements de campagne (éditable depuis Supabase) |
| **Authentification** | Email / mot de passe + Google Sign-In (Firebase Auth), mot de passe oublié |
| **Notifications** | Actualités poussées via FCM (topic `news`) + notifications locales |
| **Langues** | Français, Arabe (RTL) et Anglais |
| **Hors ligne** | Repli automatique sur les données statiques si Supabase est injoignable |

## Stack technique

| Domaine | Technologie |
| --- | --- |
| Framework | **Flutter 3.44** / Dart |
| Gestion d'état | `provider` |
| Authentification | **Firebase Auth** (email, Google) |
| Notifications | **Firebase Cloud Messaging** + `flutter_local_notifications` |
| Contenu | **Supabase** (PostgreSQL + RLS) |
| Traductions | `flutter_localizations` + ARB (`fr`, `en`, `ar`) |
| Audio | `audioplayers` |
| Typographie | `google_fonts` |
| Icônes / splash | `flutter_launcher_icons`, `flutter_native_splash` |
| CI/CD | **GitHub Actions** (APK + AAB signés, Web, Windows, Releases) |

## Architecture du projet

```text
rnd/
├── android/                        # Projet Android natif (Gradle / Kotlin)
├── ios/                            # Projet iOS (Runner Xcode)
├── assets/
│   ├── audio/                      # Messages audio (fr.mp3, ar.mp3)
│   ├── icons/                      # Icône et splash sources + générés
│   └── images/                     # Visuels et captures d'écran
├── lib/
│   ├── app/                        # MaterialApp, routes, thème
│   │   ├── app.dart
│   │   ├── routes.dart
│   │   └── theme.dart
│   ├── core/
│   │   ├── constants/              # Constantes applicatives et Supabase
│   │   ├── providers/              # Providers transverses (langue)
│   │   ├── services/               # Notifications, contenus, traductions
│   │   └── utils/                  # Helpers (textes localisés, validateurs)
│   ├── features/                   # Modules fonctionnels autonomes
│   │   ├── auth/                   # Connexion, inscription, modèle utilisateur
│   │   ├── candidate/             # Page candidat
│   │   ├── content/                # Chargement des contenus Supabase
│   │   ├── events/                 # Événements
│   │   ├── home/                   # Page d'accueil
│   │   ├── membership/             # Adhésion
│   │   └── program/                # Programme
│   ├── l10n/                       # Traductions générées + sources ARB
│   ├── widgets/                    # Composants partagés
│   └── main.dart                   # Point d'entrée (Firebase, FCM, providers)
├── test/                           # Tests
├── tool/                           # Scripts utilitaires (notifications)
├── web/                            # Coquille web (index.html, manifest PWA)
└── .github/workflows/ci.yml        # Intégration continue
```

Chaque module de `lib/features/` est autonome (`models/`, `providers/`,
`screens/`, `services/`) afin de rester testable et isolé.

## Prérequis

- [Flutter](https://flutter.dev) **3.44.0** (version utilisée en CI)
- Android SDK / JDK 17+ (pour les builds Android)
- Un projet **Firebase** (Auth, FCM) — `google-services.json` non committé
- Un projet **Supabase** (contenu éditable)

## Démarrage rapide

```bash
# 1. Récupérer le projet
git clone https://github.com/Connacri/rnd.git
cd rnd

# 2. Installer les dépendances
flutter pub get

# 3. Créer le fichier de secrets local (jamais committé)
cp .env.example .env
#    renseigner SUPABASE_URL et SUPABASE_ANON_KEY

# 4. Lancer l'application (mode debug)
flutter run --dart-define-from-file=.env
```

Le fichier `.env` n'est **jamais** committé (ni les clés de signature). Toutes
les valeurs sensibles de la CI vivent dans les *GitHub Secrets*.

### Vérifications locales

```bash
dart format --output=none --set-exit-if-changed lib tool
flutter analyze --no-fatal-infos
flutter test
```

## Internationalisation

Les traductions sont dans `lib/l10n/` (`app_fr.arb`, `app_en.arb`,
`app_ar.arb`) et sont générées par `flutter gen-l10n` :

```bash
flutter gen-l10n
```

Le français est la langue de référence et sert de repli
(`fr` → `en` → `ar`). L'arabe active automatiquement le sens de lecture RTL.

## Contenu éditable (Supabase)

Les tables suivantes sont en **lecture publique** (RLS `SELECT`) et sont
éditables directement depuis le dashboard Supabase :

| Table | Description |
| --- | --- |
| `programs` | Piliers du programme (titre, sous-titre, tag) |
| `program_items` | Points détaillés sous chaque pilier |
| `events` | Événements de campagne |
| `candidates` | Candidat / équipe |
| `news` | Actualités (source des notifications FCM) |
| `home_stats` | Chiffres de la page d'accueil |

Les champs textuels localisés utilisent le format JSONB
`{"fr": "...", "en": "...", "ar": "..."}`. Si la langue demandée est absente,
l'application applique un repli sur `fr`.

Si les tables sont vides ou injoignables, l'application utilise les données
statiques embarquées (`lib/core/services/program_data.dart`) et affiche un état
d'erreur avec possibilité de réessayer.

## Notifications (FCM)

- L'application s'abonne au topic `news` au démarrage.
- Les actualités publiées dans Supabase peuvent être poussées :
  - depuis la console Firebase → *Cloud Messaging* → topic `news` ;
  - via le script `dart run tool/notify_news.dart`.
- Le champ `push_sent_at` de la table `news` marque les notifications envoyées.

## Android

| Élément | Valeur |
| --- | --- |
| `applicationId` | `com.rnd.dz` |
| `namespace` | `com.rnd.dz` |
| `minSdk` / `targetSdk` | valeurs Flutter (`flutter.minSdkVersion` / `flutter.targetSdkVersion`) |
| Icône | icône adaptative (`mipmap-anydpi-v26/launcher_icon.xml`) + léguée |
| Splash | `flutter_native_splash` (clair + Android 12+, fond blanc) |
| Signature release | `android/app/build.gradle.kts` → `key.properties` (non committé) |

L'`applicationId` **ne doit pas changer** : il est lié à la fiche Google Play
Console et aux certificats SHA enregistrés dans Firebase.

### Signature release

La signature de production est réalisée **exclusivement en CI**, à partir de :

```text
ANDROID_KEYSTORE_BASE64     # keystore .jks encodé en base64
ANDROID_KEYSTORE_PASSWORD   # mot de passe du keystore
ANDROID_KEY_ALIAS           # alias de la clé
ANDROID_KEY_PASSWORD        # mot de passe de la clé
```

Le keystore n'est jamais committé (`.gitignore`) :

```bash
# régénérer la valeur du secret à partir du keystore local
base64 -w0 android/app/upload-keystore.jks > upload-keystore-base64.txt
```

En l'absence de ces secrets, le build échoue : l'application ne doit **jamais**
être publiée avec la clé de debug.

#### Vérifier la signature d'un APK

```bash
$ANDROID_HOME/build-tools/<version>/apksigner verify --print-certs app-release.apk
$ANDROID_HOME/build-tools/<version>/apksigner verify --print-certs app-release.apk \
  | grep -i "certificate SHA-256"
```

Vérifier également le `package name` et la `versionName` :

```bash
$ANDROID_HOME/build-tools/<version>/aapt2 dump badging app-release.apk | head -5
```

## Builds

**Aucune build de production n'est produite localement.** Les APK/AAB release
signés, la build web et l'archive Windows sont générés par GitHub Actions.

En local, uniquement le développement et la validation :

```bash
flutter run                 # debug
flutter build apk --debug   # APK de debug
flutter analyze             # analyse statique
flutter test                # tests
```

En CI :

```bash
flutter build apk         --release --build-name=$V --build-number=$N ...
flutter build appbundle   --release --build-name=$V --build-number=$N ...
flutter build web         --release --base-href=/rnd/ ...
flutter build windows     --release --build-name=$V --build-number=$N ...
```

## CI/CD

L'intégralité du pipeline est décrite dans
[`.github/workflows/ci.yml`](.github/workflows/ci.yml).

```text
git push
   │
   ├─ version         → calcule la prochaine vX.Y.Z (tags git)
   │
   ├─ quality         → flutter pub get · dart format · flutter analyze · flutter test
   │
   ├─ build-android   → APK + AAB signés (keystore depuis les secrets)
   │                    vérification signature + package + version
   ├─ build-web       → flutter build web --release --base-href=/rnd/
   │                    validation du build + artefact GitHub Pages
   ├─ build-windows   → archive portable Windows
   │
   ├─ deploy-pages    → mise en ligne du build web (GitHub Pages)
   │
   └─ release         → tag git + GitHub Release
                        (APK, AAB, Web ZIP, Windows ZIP, SHA256SUMS.txt)
```

Chaque artefact de release est accompagné de son empreinte SHA-256 dans
`SHA256SUMS.txt`.

### Secrets GitHub

| Secret | Rôle |
| --- | --- |
| `ANDROID_KEYSTORE_BASE64` | Keystore Android (base64) |
| `ANDROID_KEYSTORE_PASSWORD` | Mot de passe du keystore |
| `ANDROID_KEY_ALIAS` | Alias de la clé de signature |
| `ANDROID_KEY_PASSWORD` | Mot de passe de la clé |
| `GOOGLE_SERVICES_JSON_BASE64` | `google-services.json` (base64) |
| `SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_ANON_KEY` | Clé publique (anon) Supabase |

### Variables GitHub

| Variable | Valeur | Rôle |
| --- | --- | --- |
| `ANDROID_PACKAGE_NAME` | `com.rnd.dz` | Contrôle de l'`applicationId` en CI |
| `PAGES_BASE_PATH` | `/rnd/` | Base des URLs GitHub Pages |

### Régénérer les secrets base64

```bash
# Keystore de signature
base64 -w0 android/app/upload-keystore.jks

# Configuration Firebase Android
base64 -w0 android/app/google-services.json
```

Sur macOS : `base64 -i <fichier>`.
`GOOGLE_SERVICES_JSON_BASE64` doit correspondre au projet `rnd-aet` et au
package `com.rnd.dz` (le job Android échoue sinon).

> Les secrets ne sont jamais écrits dans le dépôt ni affichés dans les logs :
> ils sont injectés via des fichiers temporaires supprimés après le build.

## Téléchargements

| Plateforme | Fichier |
| --- | --- |
| **Android (APK signé)** | [⬇️ rnd-android.apk](https://github.com/Connacri/rnd/releases/latest/download/rnd-android.apk) |
| **Android App Bundle** | [rnd-android.aab](https://github.com/Connacri/rnd/releases/latest/download/rnd-android.aab) |
| **Web** | [🌐 connacri.github.io/rnd](https://connacri.github.io/rnd/) |
| **Windows** | disponibles dans les [releases](https://github.com/Connacri/rnd/releases) |

Toutes les versions sont listées sur la page
**[Releases](https://github.com/Connacri/rnd/releases)** ; le CI est visible sur
**[Actions](https://github.com/Connacri/rnd/actions)**.

## Licence et crédits

Projet privé — RND (Rassemblement National Démocratique) — Aïn El Turck, Oran.

Développé par **FORSLOG LTD** · Réalisé par **Ramzy Guedouar** · Contact :
**0696 41 09 53**
