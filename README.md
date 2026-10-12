<div align="center">

<img src="public/assets/icons/icon.png" alt="RND-ORAN" width="112" />

# RND-ORAN

**Application officielle de campagne — Élections Communales 2026**

Bureau Communal du RND · Aïn El Turck, Oran · Candidat **Zenasni Nabil**

[![Live Web](https://img.shields.io/badge/Live_Web-connacri.github.io%2Frnd-167447?style=for-the-badge&logo=googlechrome&logoColor=white)](https://connacri.github.io/rnd/)
[![Download APK](https://img.shields.io/badge/Download-APK-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Connacri/rnd/releases/latest)
[![Releases](https://img.shields.io/badge/Releases-latest-18181b?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Connacri/rnd/releases/latest)

[![rnd-ci](https://github.com/Connacri/rnd/actions/workflows/ci.yml/badge.svg)](https://github.com/Connacri/rnd/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/Connacri/rnd/actions/workflows/pages.yml/badge.svg)](https://github.com/Connacri/rnd/actions/workflows/pages.yml)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor&logoColor=white)
![Android](https://img.shields.io/badge/Android-minSdk_24-3DDC84?logo=android&logoColor=white)

</div>

---

Application de campagne **mobile-first** pour le bureau communal du RND à Aïn El Turck (Oran). Interface moderne inspirée des créations Purrweb (formes organiques, pastels doux, cartes superposées), entièrement réécrite en **React 19 + TypeScript + Vite + Tailwind CSS**.

## 📱 Aperçu de l'application

| Accueil | Programme | Adhésion | Événements |
|:---:|:---:|:---:|:---:|
| <img src="assets/images/1000011155.png" width="190" alt="Accueil" /> | <img src="assets/images/1000011156.png" width="190" alt="Programme" /> | <img src="assets/images/1000011157.png" width="190" alt="Adhésion" /> | <img src="assets/images/1000011158.png" width="190" alt="Événements" /> |

## ✨ Fonctionnalités

- **Accueil** — Présentation du candidat, allocution audio interactive (FR/AR), statistiques clés du RND (451 mairies, 6 521 élus, 58 députés, 28 années), aperçu des piliers et actualités.
- **Le Candidat** — Biographie, vision d'avenir, engagement solennel pour Aïn El Turck et discours audio officiel.
- **Programme Électoral** — 6 piliers majeurs, 50+ actions concrètes, filtres par domaine (Économie, Mobilité, Tourisme, Écologie, Numérique, Gouvernance).
- **Conseil Communal** — Présentation des candidats de la liste avec fiches et coordonnées.
- **Adhésion Citoyenne** — Formulaire officiel avec validation réactive (nom, email, téléphone, quartier, suggestions), sauvegarde locale et confirmation modale.
- **Agenda & Événements** — Rencontres citoyennes et meetings populaires, dates formatées selon la langue.
- **Authentification** — Connexion, inscription citoyenne, récupération de mot de passe et connexion rapide Google (démo côté client).
- **Panneau d'administration** — Édition du contenu (candidat, piliers, actualités, candidats, paramètres, adresses de contact).
- **Internationalisation (i18n)** — Français (`fr`), Arabe (`ar`, RTL complet + polices Noto Sans / Cairo) et Anglais (`en`).
- **Lecteur audio intégré** — Message vocal du candidat (`fr.mp3` / `ar.mp3`) avec égaliseur animé.
- **Installation App (PWA)** — Manifeste web (`site.webmanifest`) avec icônes adaptatives (dont *maskable*) et splash : le site s'installe comme une application sur Android/iOS.
- **Application Android native** — Conteneur **Capacitor 8** (`android/`) embarquant le build web : icônes adaptatives, splash natif, barre de statut aux couleurs de la marque. **APK + AAB signés** générés par GitHub Actions à chaque release.

## 🛠️ Stack technique

| Domaine | Technologie |
|---|---|
| Framework | React 19 · TypeScript 5 |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (palette warm sand, pastels, composants « pill ») |
| Icônes | Lucide React |
| Audio | Lecteur HTML5, source dynamique selon la langue |
| État & i18n | Context API (`LanguageContext`, `AuthContext`, `CampaignContext`) |
| PWA | Manifeste web + icônes/splash installables (`public/site.webmanifest`) |
| Android | Capacitor 8 · AGP 8.13 · Java 21 · minSdk 24 / targetSdk 36 |

## 🚀 Démarrage rapide

Prérequis : **Node.js 22+** (et **JDK 21** uniquement pour le build Android natif).

```bash
# Installation des dépendances
npm install

# Serveur de développement (port 3000)
npm run dev

# Vérification des types (TypeScript)
npm run lint

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Build pour GitHub Pages (sous-chemin /rnd/)
BASE_PATH=/rnd/ npm run build   # PowerShell : $env:BASE_PATH='/rnd/'; npm run build
```

> ℹ️ Les **builds de production et la publication** sont produits par **GitHub Actions**, jamais en local. En local, on se limite au développement, à l'analyse statique et aux tests.

## 🔑 Variables d'environnement

Copier `.env.example` vers `.env` et renseigner les valeurs :

| Variable | Description |
|---|---|
| `SUPABASE_URL` | URL du projet Supabase |
| `SUPABASE_ANON_KEY` | Clé publique (anon) Supabase |

Les secrets ne doivent **jamais** être committés. En CI, ils vivent dans **GitHub Secrets / Variables**.

## 🗂️ Architecture

```text
rnd/
├── index.html                 # Point d'entrée HTML + métadonnées, favicons, manifest PWA
├── capacitor.config.ts        # Config Capacitor (appId com.rnd.dz, webDir dist)
├── src/
│   ├── App.tsx                # Routage (hash) + providers
│   ├── main.tsx               # Bootstrap React
│   ├── index.css              # Styles Tailwind
│   ├── components/            # Navbar, BottomNav, AudioPlayer, GoogleSignInModal
│   ├── context/               # AuthContext, CampaignContext
│   ├── data/                  # Contenu de campagne (campaignData)
│   ├── i18n/                  # LanguageContext + translations (FR/AR/EN)
│   ├── pages/                 # Home, Candidate, Program, Council, Membership, Events, Admin, Auth
│   └── types/                 # Types TypeScript partagés
├── android/                   # Projet Android natif (Capacitor) : icônes, splash, Gradle, signature
├── public/                    # Assets statiques servis tels quels (icônes, favicons, manifest, security-policy)
├── assets/                    # Sources graphiques (logo natif, images de campagne)
├── supabase/migrations/       # Schéma SQL (Postgres)
├── security-policy/           # Politique de sécurité (source)
└── .github/workflows/         # CI/CD (rnd-ci, Deploy to GitHub Pages)
```

## 🔄 CI/CD (GitHub Actions)

- **`rnd-ci`** — à chaque push sur `master` :
  1. **Web** : `npm ci` → typecheck TypeScript → build de production ;
  2. **Android** : `npx cap sync android` → compilation Gradle → **APK + AAB signés** (keystore reconstruit depuis les GitHub Secrets, utilisé le temps du build puis supprimé) ;
  3. **Vérifications** : signatures APK/AAB (`apksigner`, `jarsigner`), `applicationId` et `versionName` contrôlés ;
  4. **Release GitHub** versionnée (`vX.Y.Z`) contenant `rnd-android-vX.Y.Z.apk`, `rnd-android-vX.Y.Z.aab`, `rnd-web-vX.Y.Z.zip` et `SHA256SUMS.txt`.
- **`Deploy to GitHub Pages`** — build avec le base path (variable `PAGES_BASE_PATH`, défaut `/rnd/`) puis déploiement de `dist/` sur GitHub Pages.

### 🔐 Secrets et variables requis (Android)

| Type | Nom | Rôle |
|---|---|---|
| Secret | `ANDROID_KEYSTORE_BASE64` | Keystore de release encodé en base64 |
| Secret | `ANDROID_KEYSTORE_PASSWORD` | Mot de passe du keystore |
| Secret | `ANDROID_KEY_ALIAS` | Alias de la clé de signature |
| Secret | `ANDROID_KEY_PASSWORD` | Mot de passe de la clé |
| Variable | `ANDROID_PACKAGE_NAME` | Garde-fou : vérifie que l'`applicationId` publié est bien `com.rnd.dz` |

> ⚠️ L'`applicationId` (`com.rnd.dz`) est défini dans `android/app/build.gradle` et **ne doit jamais changer** : il identifie l'application dans Google Play Console. La variable `ANDROID_PACKAGE_NAME` sert uniquement de contrôle de non-régression.

### 🤖 Build Android en local (développement uniquement)

```bash
npm run build
npx cap sync android      # copie dist/ dans android/app/src/main/assets/public

# APK de debug (jamais de release signé en local)
cd android && ./gradlew assembleDebug      # Windows : .\gradlew.bat assembleDebug
```

> ⚠️ Le build Android exige **JDK 21** (Capacitor 8 / AGP 8.13). Vérifiez que `JAVA_HOME` pointe bien vers un JDK 21, sinon Gradle échoue avec `invalid source release: 21`.

Pour un build release local (facultatif), créer `android/key.properties` (non versionné) :

```properties
storeFile=upload-keystore.jks
storePassword=...
keyPassword=...
keyAlias=...
```

Les icônes et le splash natifs sont générés depuis `assets/logo.png` :

```bash
npx @capacitor/assets generate --android \
  --iconBackgroundColor '#ffffff' --iconBackgroundColorDark '#ffffff' \
  --splashBackgroundColor '#ffffff' --splashBackgroundColorDark '#ffffff' \
  --logoSplashScale 0.25
```

## 📦 Téléchargements

| Plateforme | Fichier |
|---|---|
| 🤖 Android (APK signé) | `rnd-android-vX.Y.Z.apk` — via [Releases](https://github.com/Connacri/rnd/releases) |
| 🤖 Android (AAB signé — Play Store) | `rnd-android-vX.Y.Z.aab` — via [Releases](https://github.com/Connacri/rnd/releases) |
| 🌐 Web (build de production) | `rnd-web-vX.Y.Z.zip` — via [Releases](https://github.com/Connacri/rnd/releases) |
| 🌐 Web (en ligne) | [connacri.github.io/rnd](https://connacri.github.io/rnd/) |

Chaque release publie également `SHA256SUMS.txt` (empreintes des artefacts).

## 📄 Pages annexes

- Politique de sécurité : https://connacri.github.io/rnd/security-policy/

## 👤 Le candidat

<p>
  <img src="assets/images/nabil-zenasni-profile2.jpg" width="120" alt="Zenasni Nabil" />
</p>

**Zenasni Nabil**, secrétaire du bureau communal du RND à Aïn El Turck, Oran. Un engagement fort pour le développement local, la transparence et la proximité avec les citoyens.

---

© 2026 Zenasni Nabil — RND-ORAN. Tous droits réservés.

Développé par **FORSLOG LTD** · Codé par **Ramzy Guedouar** · Contact : **0696 41 09 53**
