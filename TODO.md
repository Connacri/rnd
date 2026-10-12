# TODO — RND-ORAN

État au 12/10/2026. Ce fichier est le suivi de référence des tâches restantes.

## Fait

- [x] **MCP** : `firebase`, `google-play`, `render`, `supabase` opérationnels
      (`opencode mcp list` → 4 serveurs ✓). Config projet déclarée dans
      `opencode.json` (Supabase + Firebase, `cwd` projet, timeout 180 s).
- [x] **Supabase** : migrations renommées sur les versions réellement appliquées
      à distance (`001`, `20260727165257`, `20261009115603`, `20261009120547`,
      `20261009120847`) → l'erreur CI « Remote migration versions not found in
      local migrations directory » est corrigée.
- [x] **Version distante `20261009120000_drop_orphan_tables`** conservée :
      aucune table concernée n'existe plus à distance → migration sans effet.
- [x] **SHA release** : empreintes vérifiées (`keytool`) et enregistrées dans
      Firebase `rnd-aet` (app Android `1:557594232565:android:467fb38aaada09090a27bc`).
      - SHA-1 `2bdd863ca63eacf24d326e83bd621b70768cca3d`
      - SHA-256 `0c484bd4d96d6eebc9d2054a3b249a0737e84b06c552012edc9fe8bf2497b484`
- [x] **Secrets/variables GitHub** : secret `PLAY_SERVICE_ACCOUNT_JSON` créé,
      variable `PLAY_UPLOAD_ENABLED=false` créée.
- [x] **CI** : job `publish-play` ajouté (envoi AAB → canal `production`,
      action `r0adkll/upload-google-play`), désactivé par défaut.
- [x] **CI** : build Windows retiré du pipeline.
- [x] **Renommage RND-ORAN** : icône, splash, nom d'application.
- [x] **README** : sections Signatures SHA, Google Play, Outils MCP, tables
      secrets/variables à jour.
- [x] `dart format` appliqué à `lib/firebase_options.dart` (le job Qualité
      échouait).

## En cours / bloqué

- [ ] **Google Play : inviter le compte de service**
      `play-console-mcp@cargolink-23dd3.iam.gserviceaccount.com`
      (Play Console → Utilisateurs et autorisations → Inviter un utilisateur).
      Pages nécessaires : « Mettre les applications à disposition… »,
      « Déployer les applications sur des canaux de test »,
      « Gérer les canaux de test et modifier les listes de testeurs ».
      *Blocage* : le formulaire ne se rend entièrement que si la fenêtre Chrome
      est au premier plan ; contournement trouvé
      (`Page.setWebLifecycleState: active`), reste la saisie + validation.
- [ ] **Play App Signing** : récupérer les empreintes SHA-1/SHA-256 de la clé
      de signature Play (Play Console → Intégrité de l'application) et les
      enregistrer dans Firebase — nécessaire pour Google Sign-In sur les
      versions distribuées par le Play Store.
- [ ] **Vérifier `list_tracks com.rnd.dz`** (actuellement `403`) une fois le
      compte de service invité.
- [ ] **Activer l'envoi Play** : passer `PLAY_UPLOAD_ENABLED` à `true` après
      un premier envoi réussi, puis vérifier la CI verte.

## À faire

- [ ] **Site GitHub Pages = le site statique de ce matin, à l'identique**
      (`index.html` + `assets/`), **pas** le build Flutter Web.
      - Remplacer le job `build-web` (Flutter Web) par un job `build-site`
        qui assemble `index.html` + `assets/` et publie cet artefact sur Pages.
      - `deploy-pages` et `release` : adapter les dépendances et les notes de
        version (`rnd-site-*.zip` au lieu de `rnd-web-*.zip`).
      - README : retirer les références `flutter build web --base-href=/rnd/`
        et la variable `PAGES_BASE_PATH` (le site utilise des chemins relatifs).
- [ ] **Vérifier la CI verte** sur le dernier commit poussé
      (`style: apply dart format to firebase_options`).
- [ ] **Vérifier le check « Supabase Preview »** (GitHub App) vert après le
      réalignement des migrations.
- [ ] **Thème** : reporter le thème du site (crème `#FAF7F2`, ambre `#FBBF24`)
      sur l'application Flutter `lib/app/theme.dart`.
      *À confirmer* : le message « pas de Flutter app » concerne-t-il uniquement
      le site publié (Pages) ou aussi l'application mobile ?
- [ ] **Nettoyage** : trancher sur `.config/opencode/opencode.json` (doublon
      partiel de `opencode.json`, seule l'entrée Supabase y figure).
- [ ] **README** : mettre à jour « Téléchargements » (site statique) et
      l'architecture (`web/` n'est plus publié).

## Contraintes à ne jamais enfreindre

- Aucun build de production en local : APK/AAB/Web signés **uniquement** en CI.
- Aucun secret committé (`.env`, keystore, `google-services.json`, JSON de
  compte de service) ; tout passe par les secrets/variables GitHub.
- Ne pas annoncer un succès (CI, release, déploiement, upload Play) sans
  l'avoir vérifié.
