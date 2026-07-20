# Migration vers Flutter Localization (ARB)

Ce plan vise à migrer le système de traduction actuel (basé sur un service statique avec des données en dur) vers le système officiel de Flutter utilisant les fichiers `.arb` (Application Resource Bundle).

## Recherche et Contexte

Le projet utilise actuellement une classe `TranslationService` dans `lib/core/services/translation_service.dart` qui contient une map statique de traductions pour le français, l'arabe et l'anglais.
L'utilisateur a demandé d'utiliser "localization et drb", ce qui est interprété comme "localization et arb", la méthode standard de Flutter.

## Changements Proposés

### Dépendances

#### [MODIFY] [pubspec.yaml](file:///C:/Users/gzers/AndroidStudioProjects/rnd/pubspec.yaml)
- Ajouter `flutter_localizations` sous `dependencies`.
- Ajouter `generate: true` sous la section `flutter`.

### Configuration

#### [NEW] [l10n.yaml](file:///C:/Users/gzers/AndroidStudioProjects/rnd/l10n.yaml)
- Créer le fichier de configuration pour le générateur de localisation.

### Fichiers de Ressources (ARB)

#### [NEW] [app_fr.arb](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/l10n/app_fr.arb)
- Contiendra les traductions françaises extraites de `TranslationService`.

#### [NEW] [app_ar.arb](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/l10n/app_ar.arb)
- Contiendra les traductions arabes extraites de `TranslationService`.

#### [NEW] [app_en.arb](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/l10n/app_en.arb)
- Contiendra les traductions anglaises extraites de `TranslationService`.

### Intégration de l'App

#### [MODIFY] [app.dart](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/app/app.dart)
- Configurer `localizationsDelegates` et `supportedLocales` dans `MaterialApp`.
- Mettre à jour l'utilisation des traductions (ex: `AppLocalizations.of(context)!.appName`).

### Nettoyage

#### [DELETE] [translation_service.dart](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/core/services/translation_service.dart)
- Supprimer une fois la migration terminée.

#### [MODIFY] [language_provider.dart](file:///C:/Users/gzers/AndroidStudioProjects/rnd/lib/core/providers/language_provider.dart)
- Mettre à jour pour gérer la `Locale` de l'application via le provider.

## Plan de Vérification

### Tests Automatisés
- Exécuter `flutter gen-l10n` pour vérifier la génération des fichiers.
- Vérifier que l'application compile sans erreurs.

### Vérification Manuelle
- Changer la langue dans l'application et vérifier que les textes se mettent à jour.
- Vérifier que la direction du texte (RTL pour l'arabe) est toujours correcte.

## Questions Ouvertes

> [!IMPORTANT]
> Confirmez-vous que "drb" faisait bien référence aux fichiers ".arb" de Flutter ?
