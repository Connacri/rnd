import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';
import 'app_localizations_fr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('en'),
    Locale('fr')
  ];

  /// No description provided for @address.
  ///
  /// In fr, this message translates to:
  /// **'Adresse'**
  String get address;

  /// No description provided for @addressOptional.
  ///
  /// In fr, this message translates to:
  /// **'Adresse (optionnel)'**
  String get addressOptional;

  /// No description provided for @age.
  ///
  /// In fr, this message translates to:
  /// **'Âge'**
  String get age;

  /// No description provided for @ageOptional.
  ///
  /// In fr, this message translates to:
  /// **'Âge (optionnel)'**
  String get ageOptional;

  /// No description provided for @algeria.
  ///
  /// In fr, this message translates to:
  /// **'Aïn El Turck, Oran, Algérie'**
  String get algeria;

  /// No description provided for @appName.
  ///
  /// In fr, this message translates to:
  /// **'Nos Candidats'**
  String get appName;

  /// No description provided for @approach.
  ///
  /// In fr, this message translates to:
  /// **'Notre approche repose sur l\'écoute, la proximité et la transparence. Chaque projet, chaque décision sera prise avec et pour vous.'**
  String get approach;

  /// No description provided for @audioMessage.
  ///
  /// In fr, this message translates to:
  /// **'Message audio'**
  String get audioMessage;

  /// No description provided for @candidate.
  ///
  /// In fr, this message translates to:
  /// **'Candidat'**
  String get candidate;

  /// No description provided for @candidateName.
  ///
  /// In fr, this message translates to:
  /// **'Zenasni Nabil'**
  String get candidateName;

  /// No description provided for @city.
  ///
  /// In fr, this message translates to:
  /// **'Aïn El Turck'**
  String get city;

  /// No description provided for @commitment.
  ///
  /// In fr, this message translates to:
  /// **'Engagement pour Aïn El Turck'**
  String get commitment;

  /// No description provided for @commitmentText.
  ///
  /// In fr, this message translates to:
  /// **'En tant que Secrétaire du Bureau Communal du RND à Aïn El Turck, je m\'engage personnellement à porter les voix de nos concitoyens et à transformer nos aspirations en actions concrètes sur le terrain.'**
  String get commitmentText;

  /// No description provided for @deputesApn.
  ///
  /// In fr, this message translates to:
  /// **'Députés APN'**
  String get deputesApn;

  /// No description provided for @description.
  ///
  /// In fr, this message translates to:
  /// **'Zenasni Nabil, Secrétaire du Bureau Communal du RND à Aïn El Turck, Oran. Un engagement fort pour le développement local, la transparence et la proximité avec les citoyens.'**
  String get description;

  /// No description provided for @development.
  ///
  /// In fr, this message translates to:
  /// **'Développement'**
  String get development;

  /// No description provided for @developmentDesc.
  ///
  /// In fr, this message translates to:
  /// **'Croissance durable'**
  String get developmentDesc;

  /// No description provided for @discoverProgram.
  ///
  /// In fr, this message translates to:
  /// **'Découvrir'**
  String get discoverProgram;

  /// No description provided for @elections2026.
  ///
  /// In fr, this message translates to:
  /// **'Élections Communales 2026'**
  String get elections2026;

  /// No description provided for @elusCommunaux.
  ///
  /// In fr, this message translates to:
  /// **'Élus Communaux'**
  String get elusCommunaux;

  /// No description provided for @email.
  ///
  /// In fr, this message translates to:
  /// **'Adresse Email'**
  String get email;

  /// No description provided for @emailField.
  ///
  /// In fr, this message translates to:
  /// **'Email'**
  String get emailField;

  /// No description provided for @emailInvalid.
  ///
  /// In fr, this message translates to:
  /// **'Adresse email invalide'**
  String get emailInvalid;

  /// No description provided for @emailRequired.
  ///
  /// In fr, this message translates to:
  /// **'L\'adresse email est requise'**
  String get emailRequired;

  /// No description provided for @engagement.
  ///
  /// In fr, this message translates to:
  /// **'Notre Engagement Solennel'**
  String get engagement;

  /// No description provided for @engagementText1.
  ///
  /// In fr, this message translates to:
  /// **'Notre programme est fondé sur des projets concrets, réalisables et financièrement responsables.'**
  String get engagementText1;

  /// No description provided for @engagementText2.
  ///
  /// In fr, this message translates to:
  /// **'Nous ne promettons pas des projets irréalisables ou dépendants de financements incertains.'**
  String get engagementText2;

  /// No description provided for @engagementText3.
  ///
  /// In fr, this message translates to:
  /// **'Ensemble, faisons d\'Aïn El Turck une commune où il fait bon vivre, investir, travailler et accueillir les visiteurs.'**
  String get engagementText3;

  /// No description provided for @events.
  ///
  /// In fr, this message translates to:
  /// **'Événements'**
  String get events;

  /// No description provided for @footerDesc.
  ///
  /// In fr, this message translates to:
  /// **'Secrétaire du Bureau Communal du RND à Aïn El Turck, Oran. Engagé pour le développement local et le bien-être de tous les citoyens.'**
  String get footerDesc;

  /// No description provided for @fullName.
  ///
  /// In fr, this message translates to:
  /// **'Nom complet'**
  String get fullName;

  /// No description provided for @haveAccount.
  ///
  /// In fr, this message translates to:
  /// **'Déjà un compte ? Se connecter'**
  String get haveAccount;

  /// No description provided for @innovation.
  ///
  /// In fr, this message translates to:
  /// **'Innovation'**
  String get innovation;

  /// No description provided for @innovationDesc.
  ///
  /// In fr, this message translates to:
  /// **'Solutions modernes et durables'**
  String get innovationDesc;

  /// No description provided for @joinMovement.
  ///
  /// In fr, this message translates to:
  /// **'Rejoignez le mouvement'**
  String get joinMovement;

  /// No description provided for @joinUs.
  ///
  /// In fr, this message translates to:
  /// **'Devenir Adhérent'**
  String get joinUs;

  /// No description provided for @learnMore.
  ///
  /// In fr, this message translates to:
  /// **'En savoir plus'**
  String get learnMore;

  /// No description provided for @login.
  ///
  /// In fr, this message translates to:
  /// **'Se connecter'**
  String get login;

  /// No description provided for @loginError.
  ///
  /// In fr, this message translates to:
  /// **'Erreur de connexion'**
  String get loginError;

  /// No description provided for @loginRequired.
  ///
  /// In fr, this message translates to:
  /// **'Vous devez être connecté pour envoyer'**
  String get loginRequired;

  /// No description provided for @logout.
  ///
  /// In fr, this message translates to:
  /// **'Déconnexion'**
  String get logout;

  /// No description provided for @mairiesRnd.
  ///
  /// In fr, this message translates to:
  /// **'Mairies RND'**
  String get mairiesRnd;

  /// No description provided for @membership.
  ///
  /// In fr, this message translates to:
  /// **'Adhérer'**
  String get membership;

  /// No description provided for @membershipDesc.
  ///
  /// In fr, this message translates to:
  /// **'Rejoignez-nous et participez activement à la construction de l\'avenir de notre commune. Ensemble, nous sommes plus forts.'**
  String get membershipDesc;

  /// No description provided for @membershipTitle.
  ///
  /// In fr, this message translates to:
  /// **'Devenez Adhérent au RND'**
  String get membershipTitle;

  /// No description provided for @message.
  ///
  /// In fr, this message translates to:
  /// **'Message'**
  String get message;

  /// No description provided for @messageOptional.
  ///
  /// In fr, this message translates to:
  /// **'Message (optionnel)'**
  String get messageOptional;

  /// No description provided for @name.
  ///
  /// In fr, this message translates to:
  /// **'Nom'**
  String get name;

  /// No description provided for @noAccount.
  ///
  /// In fr, this message translates to:
  /// **'Pas encore de compte ? S\'inscrire'**
  String get noAccount;

  /// No description provided for @nom.
  ///
  /// In fr, this message translates to:
  /// **'Nom & Prénom'**
  String get nom;

  /// No description provided for @nomRequired.
  ///
  /// In fr, this message translates to:
  /// **'Le nom est obligatoire'**
  String get nomRequired;

  /// No description provided for @ourProgram.
  ///
  /// In fr, this message translates to:
  /// **'Notre Programme'**
  String get ourProgram;

  /// No description provided for @ourValues.
  ///
  /// In fr, this message translates to:
  /// **'Nos Valeurs'**
  String get ourValues;

  /// No description provided for @ourVision.
  ///
  /// In fr, this message translates to:
  /// **'Notre Vision'**
  String get ourVision;

  /// No description provided for @party.
  ///
  /// In fr, this message translates to:
  /// **'RND - Rassemblement National Démocratique'**
  String get party;

  /// No description provided for @password.
  ///
  /// In fr, this message translates to:
  /// **'Mot de passe'**
  String get password;

  /// No description provided for @passwordMin.
  ///
  /// In fr, this message translates to:
  /// **'Au moins 6 caractères'**
  String get passwordMin;

  /// No description provided for @passwordRequired.
  ///
  /// In fr, this message translates to:
  /// **'Le mot de passe est obligatoire'**
  String get passwordRequired;

  /// No description provided for @phone.
  ///
  /// In fr, this message translates to:
  /// **'Téléphone'**
  String get phone;

  /// No description provided for @phoneInvalid.
  ///
  /// In fr, this message translates to:
  /// **'Numéro de téléphone invalide'**
  String get phoneInvalid;

  /// No description provided for @phoneRequired.
  ///
  /// In fr, this message translates to:
  /// **'Le numéro de téléphone est requis'**
  String get phoneRequired;

  /// No description provided for @profession.
  ///
  /// In fr, this message translates to:
  /// **'Profession'**
  String get profession;

  /// No description provided for @professionOptional.
  ///
  /// In fr, this message translates to:
  /// **'Profession (optionnel)'**
  String get professionOptional;

  /// No description provided for @program.
  ///
  /// In fr, this message translates to:
  /// **'Programme'**
  String get program;

  /// No description provided for @programTitle.
  ///
  /// In fr, this message translates to:
  /// **'PROGRAMME ÉLECTORAL'**
  String get programTitle;

  /// No description provided for @proximity.
  ///
  /// In fr, this message translates to:
  /// **'Proximité'**
  String get proximity;

  /// No description provided for @proximityDesc.
  ///
  /// In fr, this message translates to:
  /// **'À l\'écoute directe des citoyens'**
  String get proximityDesc;

  /// No description provided for @register.
  ///
  /// In fr, this message translates to:
  /// **'S\'inscrire'**
  String get register;

  /// No description provided for @registerError.
  ///
  /// In fr, this message translates to:
  /// **'Erreur d\'inscription'**
  String get registerError;

  /// No description provided for @rights.
  ///
  /// In fr, this message translates to:
  /// **'2026 Zenasni Nabil - Nos Candidats. Tous droits réservés.'**
  String get rights;

  /// No description provided for @rndDescText.
  ///
  /// In fr, this message translates to:
  /// **'Le Rassemblement National Démocratique, fondé en 1997, est un parti libéral et progressiste engagé pour le développement national et local.'**
  String get rndDescText;

  /// No description provided for @rndDescription.
  ///
  /// In fr, this message translates to:
  /// **'Le RND, une force de progrès pour l\'Algérie'**
  String get rndDescription;

  /// No description provided for @secretary.
  ///
  /// In fr, this message translates to:
  /// **'Secrétaire'**
  String get secretary;

  /// No description provided for @seeEvents.
  ///
  /// In fr, this message translates to:
  /// **'Consulter l\'agenda citoyen'**
  String get seeEvents;

  /// No description provided for @send.
  ///
  /// In fr, this message translates to:
  /// **'Envoyer ma Candidature'**
  String get send;

  /// No description provided for @slogan.
  ///
  /// In fr, this message translates to:
  /// **'« Ensemble pour une nouvelle dynamique à Aïn El Turck »'**
  String get slogan;

  /// No description provided for @successMessage.
  ///
  /// In fr, this message translates to:
  /// **'Votre demande d\'adhésion a été enregistrée avec succès. Notre permanence vous contactera rapidement.'**
  String get successMessage;

  /// No description provided for @suggestion.
  ///
  /// In fr, this message translates to:
  /// **'Suggestion / Proposition'**
  String get suggestion;

  /// No description provided for @suggestionOptional.
  ///
  /// In fr, this message translates to:
  /// **'Suggestion / Proposition pour la commune (optionnel)'**
  String get suggestionOptional;

  /// No description provided for @thankYou.
  ///
  /// In fr, this message translates to:
  /// **'Merci pour votre engagement !'**
  String get thankYou;

  /// No description provided for @together.
  ///
  /// In fr, this message translates to:
  /// **'Ensemble, construisons\nl\'avenir d\'Aïn El Turck'**
  String get together;

  /// No description provided for @togetherHighlight.
  ///
  /// In fr, this message translates to:
  /// **'construisons'**
  String get togetherHighlight;

  /// No description provided for @transparency.
  ///
  /// In fr, this message translates to:
  /// **'Transparence'**
  String get transparency;

  /// No description provided for @transparencyDesc.
  ///
  /// In fr, this message translates to:
  /// **'Gestion claire, éthique et juste'**
  String get transparencyDesc;

  /// No description provided for @upcomingEvents.
  ///
  /// In fr, this message translates to:
  /// **'Prochains événements & Rencontres'**
  String get upcomingEvents;

  /// No description provided for @visionText.
  ///
  /// In fr, this message translates to:
  /// **'Une Algérie forte, prospère et unie. Le RND œuvre pour une gouvernance transparente, une économie dynamique et une transformation numérique au service de tous les citoyens, dans chaque commune du pays.'**
  String get visionText;

  /// No description provided for @welcome.
  ///
  /// In fr, this message translates to:
  /// **'Bienvenue'**
  String get welcome;

  /// No description provided for @whoWeAre.
  ///
  /// In fr, this message translates to:
  /// **'Qui sommes-nous'**
  String get whoWeAre;

  /// No description provided for @yearsEngagement.
  ///
  /// In fr, this message translates to:
  /// **'Années d\'Engagement'**
  String get yearsEngagement;

  /// No description provided for @namePlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre nom'**
  String get namePlaceholder;

  /// No description provided for @emailPlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'votre@email.com'**
  String get emailPlaceholder;

  /// No description provided for @phonePlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'0X XX XX XX XX'**
  String get phonePlaceholder;

  /// No description provided for @agePlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre âge'**
  String get agePlaceholder;

  /// No description provided for @professionPlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre profession'**
  String get professionPlaceholder;

  /// No description provided for @addressPlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre adresse'**
  String get addressPlaceholder;

  /// No description provided for @messagePlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre message...'**
  String get messagePlaceholder;

  /// No description provided for @suggestionPlaceholder.
  ///
  /// In fr, this message translates to:
  /// **'Votre suggestion ou proposition...'**
  String get suggestionPlaceholder;

  /// No description provided for @forgotPasswordTitle.
  ///
  /// In fr, this message translates to:
  /// **'Mot de passe oublié'**
  String get forgotPasswordTitle;

  /// No description provided for @forgotPasswordHint.
  ///
  /// In fr, this message translates to:
  /// **'Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.'**
  String get forgotPasswordHint;

  /// No description provided for @sendResetEmail.
  ///
  /// In fr, this message translates to:
  /// **'Envoyer le lien'**
  String get sendResetEmail;

  /// No description provided for @resetEmailSent.
  ///
  /// In fr, this message translates to:
  /// **'Email envoyé ! Vérifiez votre boîte de réception.'**
  String get resetEmailSent;

  /// No description provided for @forgotPassword.
  ///
  /// In fr, this message translates to:
  /// **'Mot de passe oublié ?'**
  String get forgotPassword;

  /// No description provided for @continueWithGoogle.
  ///
  /// In fr, this message translates to:
  /// **'Continuer avec Google'**
  String get continueWithGoogle;

  /// No description provided for @contentLoadFailed.
  ///
  /// In fr, this message translates to:
  /// **'Impossible de charger le contenu. Vérifiez votre connexion.'**
  String get contentLoadFailed;

  /// No description provided for @retry.
  ///
  /// In fr, this message translates to:
  /// **'Réessayer'**
  String get retry;

  /// No description provided for @latestNews.
  ///
  /// In fr, this message translates to:
  /// **'Actualités'**
  String get latestNews;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ar', 'en', 'fr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'en':
      return AppLocalizationsEn();
    case 'fr':
      return AppLocalizationsFr();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
