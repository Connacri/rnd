# TODO — Nos Candidats

Suivi du travail restant. Dernière mise à jour : 15/10/2026.

## Fait

- [x] **MCP** : 4 serveurs opérationnels (`firebase`, `google-play`, `render`,
      `supabase`) — config projet dans `opencode.json`.
- [x] **MCP reconnectés après passage V2** ✅ — config migrée vers
      `mcp.servers` + `mcp.timeout` (`startup`/`catalog`/`execution`). Le
      serveur `firebase` (`npx firebase-tools mcp`, handshake ~20 s) échouait
      au timeout par défaut de 30 s car le `timeout` était placé au mauvais
      endroit (niveau serveur au lieu de `mcp.timeout` / objet `timeout`).
      Désormais tous les serveurs se connectent (vérifié via `opencode mcp
      list` et `/api/experimental/mcp/*/connect`).
- [x] **Plugin `render` migré vers l'API V2** ✅ —
      `~/.config/opencode/plugins/render.ts` : `export default Plugin.define`
      avec `ctx.tool.transform` (outil `render_validate_blueprint`) et
      `ctx.tool.hook("execute.after", …)`. Le plugin recharge à chaud et
      s'affiche `status: active` (outil `tools.render_validate_blueprint`
      disponible).
- [x] **Supabase** : migrations alignées sur les versions réellement appliquées
      à distance → check CI « Supabase Preview » vert.
- [x] **Secret / variable GitHub** : `PLAY_SERVICE_ACCOUNT_JSON` (secret),
      `ANDROID_PACKAGE_NAME=com.rnd.dz`, `FIREBASE_PROJECT_ID=rnd-aet`,
      `SUPABASE_PROJECT_REF=liveclvibiqcpekanfbp`,
      `PLAY_UPLOAD_ENABLED=false`.
- [x] **Google Play — compte de service invité et actif** ✅
      `play-console-mcp@cargolink-23dd3.iam.gserviceaccount.com` (compte
      développeur Inturk, ID `7216766428891438814`) : `list_tracks`,
      `list_artifacts` et l'API `androidpublisher` répondent.
- [x] **Site web de nouveau en React** ✅ (sources restaurées depuis `fa9cf26`,
      React 19 + Vite 6 + Tailwind 4, dépendances Capacitor retirées).
      Le job `build-site` compile le site (`npm ci` → `npm run lint` →
      `npm run build` avec `BASE_PATH=/rnd/`) et publie `dist/` sur GitHub
      Pages. L'application Android reste **Flutter** (`android/`, `lib/`,
      `web/` intacts).
- [x] **CI verte vérifiée** : run `38274371787` (commit `5d9eaf4`) → tous les
      jobs `success`, tag `v1.0.30` et release GitHub publiée avec
      `rnd-android.apk`, `rnd-android.aab`, `rnd-site-v1.0.30.zip`,
      `SHA256SUMS.txt`.
- [x] **Site live vérifié** : <https://connacri.github.io/rnd/> sert bien
      l'application React (bundle `/rnd/assets/index-*.js`, `#root`), et les
      assets (`site.webmanifest`, `security-policy/`, images, audio, favicon)
      répondent en `200`.
- [x] **Empreintes Play App Signing ajoutées à Firebase** ✅
      Récupérées via l'API Play (`generatedApks/54` →
      `certificateSha256Hash`) puis extraites de l'APK universel généré par
      Play (`apksigner --print-certs`, JBR Java 25 pour la signature PQC v3.2).
      Enregistrées dans Firebase `rnd-aet`
      (app `1:557594232565:android:467fb38aaada09090a27bc`) :

      | Certificat | SHA-1 |
      | --- | --- |
      | Clé de signature d'application (v3.0) | `4cba7a52aa0d2b77c8531de15237a5a35c745a69` |
      | v3.2 hybride — classique | `f0f60ca64d8c1f6f78f646417a3f976808bce8c5` |
      | v3.2 hybride — PQC (identité courante Android 17+) | `75193fb808826914a307019b875f7bd6bf52e5a0` |

- [x] **versionCode corrigé** ✅ — la CI utilisait `github.run_number` (= **15**
      sur ce dépôt) comme `--build-number`, donc un versionCode **inférieur au
      54 déjà publié sur Play** : tout envoi aurait été rejeté. Le versionCode
      est maintenant dérivé de la version (`MAJEUR*1e6 + MINEUR*1e3 + PATCH`,
      ex. `v1.0.31` → `1000031`), vérifié par `aapt2` dans le job Android.
- [x] **CI fiabilisée** : `concurrency` par branche (plus de collision de tag
      entre deux pushs rapprochés) + vérification du tag distant avant
      création.
- [x] **README / TODO / .gitignore** réalignés sur le site React et sur les
      empreintes Play App Signing.
- [x] **Renommage « Nos Candidats »** ✅ — nom affiché remplacé partout
      (`lib/`, `src/`, `android/`, `ios/`, `macos/`, `windows/`, `linux/`,
      `web/`, `public/`, `index.html`, CI) ; identifiants techniques conservés
      (`com.rnd.dz`, `rnd_campaign_app`, `rnd-android.*`). Icônes, splash et
      favicons régénérés (`tool/generate_assets.dart`, `flutter_launcher_icons`,
      `flutter_native_splash`) avec fond vert `#026342` sans raccord.
- [x] **Fiche Google Play appliquée en direct** ✅ — nom « Nos Candidats » et
      descriptions fr/en/ar enregistrés via `tool/play_listing.dart` (API
      Android Publisher, compte de service CI), source de vérité
      `store/play/listings.json`. Google refuse l'envoi automatique en revue
      pour cette application : les changements sont enregistrés en
      **modifications en attente** (`changesNotSentForReview=true`), à envoyer
      en revue depuis la Play Console. `dart run tool/play_listing.dart check`
      confirme l'alignement.
- [x] **Icône de la fiche Play corrigée** ✅ — l'icône publiée était celle de
      l'ancienne identité (`1e4484dc…`) alors que le logo courant est
      `047044ee…`. `tool/generate_assets.dart` produit désormais
      `store/play/icon-512.png` (512x512, fond vert `#026342`) et
      `tool/play_listing.dart icon` la téléverse sur les 3 langues (idempotent :
      comparaison d'empreinte SHA-1 avec la fiche). `images` liste les visuels
      publiés ; `check` compare désormais **titre + descriptions + icône**
      (sortie 0 = « Fiche Play alignée »). Le job CI `play-listing` applique la
      fiche puis l'icône.
- [x] **Config MCP alignée** ✅ — `opencode.json` (dépôt) déclare les 4 serveurs
      (`firebase`, `google-play`, `render`, `supabase`) ; aucun secret ni chemin
      absolu committé. `GOOGLE_APPLICATION_CREDENTIALS` (compte de service Play,
      variable utilisateur créée le 15/10/2026) est lu depuis l'environnement et
      `RENDER_API_KEY` par substitution `{env:RENDER_API_KEY}`. Le serveur
      `google-play` ne répond aux appels qu'après **redémarrage d'OpenCode**
      (la variable n'existe pas dans le processus en cours) ; `firebase`,
      `render` et `supabase` sont vérifiés connectés.
- [x] **Renommage publié** — run `38730842663` : `Qualité`, `Version`,
      `Site web`, `Google Play (fiche)` (nouveau job), `Deploy GitHub Pages`,
      `Android signé` et `Tag + GitHub Release` verts ; release
      **Nos Candidats v1.0.35** publiée (`rnd-android.apk`, `rnd-android.aab`,
      `rnd-site-v1.0.35.zip`, `SHA256SUMS.txt`).
- [x] **`publish-play` réparé (publication gérée)** — sur le même run, seul
      `Google Play (production)` échouait :
      `Changes cannot be sent for review automatically`. Le commit Play est
      désormais envoyé avec `changesNotSentForReview: true` (release déposée en
      modification en attente, à valider dans la Play Console).

## À faire

- [ ] **Envoi Play réel** : `PLAY_UPLOAD_ENABLED` vaut déjà `true` ; le job
      `Google Play (production)` dépose l'AAB (versionCode `1000035`+) sur le
      canal `production`. L'application étant en **publication gérée**, l'AAB
      est enregistré en **modification en attente** (Google refuse l'envoi
      automatique en revue) : il reste à valider la release depuis la Play
      Console. **Décision utilisateur requise** : la garder en `production` ou
      passer préalablement par un canal de test.
- [ ] **Play Console — validation des modifications en attente** : envoyer en
      revue / publier depuis la Play Console (a) la fiche (nom « Nos Candidats »
      + descriptions fr/en/ar), (b) la nouvelle icône de la fiche et (c) la
      release `production` déposée par la CI.
- [ ] **Visuels de fiche incomplets** : seules les listes `fr-FR` ont une
      bannière (`featureGraphic`) et des captures d'écran ; `en-US` et `ar`
      n'ont que l'icône. Prévoir une bannière 1024x500 et au moins 2 captures
      par langue avant publication (les captures `fr-FR` montrent encore
      l'ancienne interface sombre : les refaire après la refonte du thème).
- [ ] **Brouillon fantôme sur le canal production** : une release **draft sans
      versionCode** existe sur `production` (créée le 12/10/2026) et bloque
      l'état « Pas encore envoyé pour examen ». À supprimer ou compléter
      depuis la Play Console avant/après le premier envoi CI.
- [ ] **Thème Flutter** : reporter le thème du site (crème `#FAF7F2`, ambre
      `#FBBF24`) sur `lib/app/theme.dart`.
- [x] **Nettoyage** : `.config/opencode/opencode.json` supprimé — doublon
      partiel de `opencode.json` (racine du dépôt). Toute la config de projet
      reste dans `opencode.json`.
- [ ] **Ancien site statique** : `assets/` reste requis par Flutter
      (`assets/images/`, `assets/icons/`, `assets/audio/` déclarés dans
      `pubspec.yaml`) — ne pas le supprimer. `assets/logo.png` (duplicata
      inutilisé de `assets/icons/icon.png`) a été supprimé. `public/rnd-icon.png`
      n'est référencé par aucune page mais reste généré comme chemin public
      stable (au même titre que `com.rnd.dz`).

## Contraintes à ne jamais enfreindre

- Aucun build de production en local : APK/AAB/Web signés **uniquement** en CI.
- Aucun secret committé (`.env`, keystore, `google-services.json`, JSON de
  compte de service) ; tout passe par les secrets/variables GitHub.
- Ne pas annoncer un succès (CI, release, déploiement, upload Play) sans
  l'avoir vérifié.
