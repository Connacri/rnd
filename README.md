# RNDAET — Campagne Municipale 2026

Application officielle de campagne de **Nabil Zenasni**, secrétaire du bureau communal du RND (Rassemblement National Démocratique) à **Aïn El Turck, Oran**.

<p align="center">
  <img src="assets/icons/icon.png" width="120" alt="RND Logo"/>
  <img src="assets/images/nabil-zenasni-profile2.jpg" width="120" alt="Nabil Zenasni"/>
</p>

## Fonctionnalités

- **Accueil** — Présentation du candidat, message audio (FR/AR), statistiques du RND, actualités
- **Candidat** — Biographie, vision, valeurs (éditable via Supabase)
- **Programme** — 6 piliers thématiques (éditable via Supabase)
- **Adhésion** — Formulaire d'adhésion au mouvement
- **Événements** — Calendrier des événements de campagne (éditable via Supabase)
- **Auth** — Connexion / Inscription par email (Firebase Auth) + Google Sign-In
- **Notifications** — Actualités poussées via FCM (topic `news`)
- **i18n** — 3 langues : Français, Arabe, Anglais (support RTL)

## Captures d'écran

<p align="center">
  <img src="assets/images/1000011155.png" width="200" alt="Accueil"/>
  <img src="assets/images/1000011156.png" width="200" alt="Programme"/>
  <img src="assets/images/1000011157.png" width="200" alt="Adhésion"/>
</p>

## Audio

Message de campagne disponible en **Français** et **Arabe** :

| Langue | Fichier |
|--------|---------|
| Français | `assets/audio/fr.mp3` |
| Arabe | `assets/audio/ar.mp3` |

## Prérequis

- Flutter >= 3.6.0
- Projet Firebase (Auth, FCM)
- Projet Supabase (base de contenu)

## Installation

```bash
# Copier le fichier d'environnement
cp .env.example .env
# Éditer .env avec vos clés Supabase et Firebase

# Lancer l'application
flutter run --dart-define-from-file=.env
```

## Architecture des données

### Firebase Auth
- Authentification email/mot de passe + Google Sign-In
- SHA debug et release configurés dans la console Firebase
- `google-services.json` présent dans `android/app/`

### Supabase (contenu éditable)
Les tables suivantes sont en **lecture publique** (RLS SELECT) et éditables
depuis le dashboard Supabase :

| Table | Description |
|-------|-------------|
| `programs` | Piliers du programme (titre, sous-titre, tag en JSONB localisé) |
| `program_items` | Points sous chaque pilier |
| `events` | Événements de campagne |
| `candidates` | Candidat / équipe |
| `news` | Actualités (source des notifications FCM) |
| `home_stats` | Chiffres de la page d'accueil |

Les champs textuels utilisent le format JSONB localisé : `{"fr": "...", "en": "...", "ar": "..."}`.
L'application applique un repli sur `fr` si la langue demandée est absente.

Si les tables sont vides ou injoignables, l'app utilise les données statiques
embarquées (`lib/core/services/program_data.dart`).

### Notifications FCM

- L'app s'abonne au topic `news` au démarrage
- Les actualités publiées dans Supabase peuvent être poussées via :
  - La console Firebase > Cloud Messaging > Envoyer un message > Topic `news`
  - Le script : `dart run tool/notify_news.dart` (voir comments dans le fichier)
- Le champ `push_sent_at` de la table `news` marque les notifications envoyées

## Build release

```bash
flutter build apk --release --dart-define-from-file=.env
flutter build appbundle --release --dart-define-from-file=.env
```

Les builds release sont produits par **GitHub Actions** (voir `.github/workflows/`).
Ne jamais builder de release en local.

## Stack technique

- **Flutter** — UI framework
- **Firebase Auth** — Authentification (email + Google)
- **Firebase Cloud Messaging** — Notifications push
- **Supabase** — Base de données (contenu éditable)
- **Provider** — State management
- **audioplayers** — Audio
- **google_fonts** — Typographie
- **flutter_local_notifications** — Notifications foreground
- **l10n** — Internationalisation (FR/AR/EN)

## Licence

Projet privé — RND

---

© Developed by **FORSLOG LTD** — Codded by **Ramzy Guedouar** — Contact: **0696 41 09 53**
