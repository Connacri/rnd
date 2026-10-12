# TODO — RND-ORAN

Suivi du travail restant. Dernière mise à jour : 12/10/2026.

## Fait

- [x] **MCP** : 4 serveurs opérationnels (`firebase`, `google-play`, `render`,
      `supabase`) — config projet dans `opencode.json`.
- [x] **Supabase** : migrations alignées sur les versions réellement appliquées
      à distance → check CI « Supabase Preview » vert.
- [x] **SHA release** : empreintes du keystore release vérifiées (`keytool`) et
      enregistrées dans Firebase `rnd-aet`
      (app Android `1:557594232565:android:467fb38aaada09090a27bc`).
      - SHA-1 `2bdd863ca63eacf24d326e83bd621b70768cca3d`
      - SHA-256 `0c484bd4d96d6eebc9d2054a3b249a0737e84b06c552012edc9fe8bf2497b484`
- [x] **Secrets/variables GitHub** : `PLAY_SERVICE_ACCOUNT_JSON` (secret),
      `PLAY_UPLOAD_ENABLED=false` (variable), `ANDROID_PACKAGE_NAME=com.rnd.dz`,
      `FIREBASE_PROJECT_ID=rnd-aet`, `SUPABASE_PROJECT_REF=liveclvibiqcpekanfbp`.
- [x] **Google Play — compte de service invité** ✅
      `play-console-mcp@cargolink-23dd3.iam.gserviceaccount.com` est
      **utilisateur actif** du compte de développeur Inturk
      (ID `7216766428891438814`), autorisations :
      afficher les informations de l'application (lecture seule),
      mettre les applications à disposition, déployer sur les canaux de test,
      gérer les canaux de test.
- [x] **Google Play — API opérationnelle** ✅
      `list_tracks com.rnd.dz` répond (plus de 403).
      Application **RND-ORAN** (`com.rnd.dz`) présente en **production** :
      version **54 (1.0.15)**, statut `completed`, déploiement 100 %.
      Un seul artefact : bundle `versionCode 54`
      (`sha256 6049cee1e9328cdb47db978d20a2960784ec74b1a7e88d592ad0b7fbdf066832`).
- [x] **CI** : job `build-site` remplacé par un **build React + Vite**
      (`npm ci` → `npm run lint` → `npm run build` avec `BASE_PATH=/rnd/`),
      publication de `dist/` sur GitHub Pages, ZIP `rnd-site-vX.Y.Z.zip`.
      Application Android (Flutter) inchangée.
- [x] **Site web de nouveau en React** : sources restaurées depuis `fa9cf26`
      (React 19 + Vite 6 + Tailwind 4), dépendances Capacitor retirées
      (87 paquets), build local validé (`dist/` avec chemins `/rnd/...`).
- [x] **CI** : `concurrency` par branche ajoutée (évite deux runs concurrents
      calculant la même version) et détection du tag distant avant création.
- [x] **README / .gitignore** réalignés sur le site React.

## À faire

- [ ] **Vérifier la CI verte** sur le commit de restauration du site et que
      <https://connacri.github.io/rnd/> sert bien l'application React.
- [ ] **Empreintes Play App Signing** : récupérer SHA-1/SHA-256 du certificat de
      signature d'application (Play Console → RND-ORAN → Intégrité de
      l'application) et les ajouter à Firebase `rnd-aet`
      (nécessaire pour Google Sign-In sur les versions installées depuis Play).
- [ ] **Activer l'envoi Play** : passer `PLAY_UPLOAD_ENABLED` à `true`, pousser,
      vérifier que le job `Google Play (production)` publie un nouvel AAB
      (versionCode > 54) puis contrôler le canal via `get_track_info`.
- [ ] **Thème Flutter** : reporter le thème du site (crème `#FAF7F2`, ambre
      `#FBBF24`) sur `lib/app/theme.dart`.
- [ ] **Nettoyage** : trancher sur `.config/opencode/opencode.json` (doublon
      partiel de `opencode.json`, seule l'entrée Supabase y figure).
- [ ] **Ancien site statique** : `assets/` reste requis par Flutter
      (pubspec, icônes, splash) — ne pas le supprimer. Vérifier qu'aucun autre
      fichier de l'ancien site statique n'est devenu inutile.

## Contraintes à ne jamais enfreindre

- Aucun build de production en local : APK/AAB/Web signés **uniquement** en CI.
- Aucun secret committé (`.env`, keystore, `google-services.json`, JSON de
  compte de service) ; tout passe par les secrets/variables GitHub.
- Ne pas annoncer un succès (CI, release, déploiement, upload Play) sans
  l'avoir vérifié.