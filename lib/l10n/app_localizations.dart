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
  /// **'Age'**
  String get age;

  /// No description provided for @ageOptional.
  ///
  /// In fr, this message translates to:
  /// **'Age (optionnel)'**
  String get ageOptional;

  /// No description provided for @algeria.
  ///
  /// In fr, this message translates to:
  /// **'Ain El Tûrck, Oran, Algerie'**
  String get algeria;

  /// No description provided for @appName.
  ///
  /// In fr, this message translates to:
  /// **'RND Campaign'**
  String get appName;

  /// No description provided for @approach.
  ///
  /// In fr, this message translates to:
  /// **'Notre approche repose sur l\'ecoute, la proximite et la transparence. Chaque projet, chaque decision sera prise avec et pour vous.'**
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
  /// **'Ain El Tûrck'**
  String get city;

  /// No description provided for @commitment.
  ///
  /// In fr, this message translates to:
  /// **'Engagement pour Ain El Tûrck'**
  String get commitment;

  /// No description provided for @commitmentText.
  ///
  /// In fr, this message translates to:
  /// **'En tant que Secretaire du Bureau Communal du RND a Ain El Tûrck, je m\'engage personnellement a porter les voix de nos concitoyens et a transformer nos aspirations en actions concretes sur le terrain.'**
  String get commitmentText;

  /// No description provided for @deputesApn.
  ///
  /// In fr, this message translates to:
  /// **'Deputes APN'**
  String get deputesApn;

  /// No description provided for @description.
  ///
  /// In fr, this message translates to:
  /// **'Zenasni Nabil, Secretaire du Bureau Communal du RND a Ain El Tûrck, Oran. Un engagement fort pour le developpement local, la transparence et la proximite avec les citoyens.'**
  String get description;

  /// No description provided for @development.
  ///
  /// In fr, this message translates to:
  /// **'Developpement'**
  String get development;

  /// No description provided for @developmentDesc.
  ///
  /// In fr, this message translates to:
  /// **'Croissance durable'**
  String get developmentDesc;

  /// No description provided for @discoverProgram.
  ///
  /// In fr, this message translates to:
  /// **'Decouvrir'**
  String get discoverProgram;

  /// No description provided for @elections2026.
  ///
  /// In fr, this message translates to:
  /// **'Elections Communales 2026'**
  String get elections2026;

  /// No description provided for @elusCommunaux.
  ///
  /// In fr, this message translates to:
  /// **'Elus Communaux'**
  String get elusCommunaux;

  /// No description provided for @email.
  ///
  /// In fr, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @emailField.
  ///
  /// In fr, this message translates to:
  /// **'Email'**
  String get emailField;

  /// No description provided for @emailInvalid.
  ///
  /// In fr, this message translates to:
  /// **'Email invalide'**
  String get emailInvalid;

  /// No description provided for @emailRequired.
  ///
  /// In fr, this message translates to:
  /// **'Email requis'**
  String get emailRequired;

  /// No description provided for @engagement.
  ///
  /// In fr, this message translates to:
  /// **'Notre engagement'**
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
  /// **'Evènements'**
  String get events;

  /// No description provided for @footerDesc.
  ///
  /// In fr, this message translates to:
  /// **'Secretaire du Bureau Communal du RND a Ain El Tûrck, Oran. Engage pour le developpement local et le bien-etre de tous les citoyens.'**
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
  /// **'Solutions modernes'**
  String get innovationDesc;

  /// No description provided for @joinMovement.
  ///
  /// In fr, this message translates to:
  /// **'Rejoignez le mouvement'**
  String get joinMovement;

  /// No description provided for @joinUs.
  ///
  /// In fr, this message translates to:
  /// **'Devenir Adherent'**
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
  /// **'Adherer'**
  String get membership;

  /// No description provided for @membershipDesc.
  ///
  /// In fr, this message translates to:
  /// **'Rejoignez-nous et participez activement a la construction de l\'avenir de notre commune. Ensemble, nous sommes plus forts.'**
  String get membershipDesc;

  /// No description provided for @membershipTitle.
  ///
  /// In fr, this message translates to:
  /// **'Devenez Adherent au RND'**
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
  /// **'Nom'**
  String get nom;

  /// No description provided for @nomRequired.
  ///
  /// In fr, this message translates to:
  /// **'Nom requis'**
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
  /// **'RND - RND'**
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
  /// **'Mot de passe requis'**
  String get passwordRequired;

  /// No description provided for @phone.
  ///
  /// In fr, this message translates to:
  /// **'Téléphone'**
  String get phone;

  /// No description provided for @phoneInvalid.
  ///
  /// In fr, this message translates to:
  /// **'Numéro invalide'**
  String get phoneInvalid;

  /// No description provided for @phoneRequired.
  ///
  /// In fr, this message translates to:
  /// **'Téléphone requis'**
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
  /// **'PROGRAMME'**
  String get programTitle;

  /// No description provided for @proximity.
  ///
  /// In fr, this message translates to:
  /// **'Proximite'**
  String get proximity;

  /// No description provided for @proximityDesc.
  ///
  /// In fr, this message translates to:
  /// **'A l\'ecoute des citoyens'**
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
  /// **'2026 Zenasni Nabil - RND Ain El Tûrck. Tous droits reserves.'**
  String get rights;

  /// No description provided for @rndDescText.
  ///
  /// In fr, this message translates to:
  /// **'Le Rassemblement National Democratique, fonde en 1997, est un parti liberal et progressiste engage pour le developpement national et local.'**
  String get rndDescText;

  /// No description provided for @rndDescription.
  ///
  /// In fr, this message translates to:
  /// **'Le RND, une force de progres pour l\'Algerie'**
  String get rndDescription;

  /// No description provided for @secretary.
  ///
  /// In fr, this message translates to:
  /// **'Secretaire'**
  String get secretary;

  /// No description provided for @seeEvents.
  ///
  /// In fr, this message translates to:
  /// **'Voir les prochains événements'**
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
  /// **'Votre message a été envoyé avec succès.'**
  String get successMessage;

  /// No description provided for @suggestion.
  ///
  /// In fr, this message translates to:
  /// **'Suggestion / Proposition'**
  String get suggestion;

  /// No description provided for @suggestionOptional.
  ///
  /// In fr, this message translates to:
  /// **'Suggestion / Proposition (optionnel)'**
  String get suggestionOptional;

  /// No description provided for @thankYou.
  ///
  /// In fr, this message translates to:
  /// **'Merci !'**
  String get thankYou;

  /// No description provided for @together.
  ///
  /// In fr, this message translates to:
  /// **'Ensemble, construisons\nl\'avenir d\'Ain El Tûrck'**
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
  /// **'Gestion claire et juste'**
  String get transparencyDesc;

  /// No description provided for @upcomingEvents.
  ///
  /// In fr, this message translates to:
  /// **'Prochains événements à venir...'**
  String get upcomingEvents;

  /// No description provided for @visionText.
  ///
  /// In fr, this message translates to:
  /// **'Une Algerie forte, prospere et unie. Le RND oeuvre pour une gouvernance transparente, une economie dynamique et une transformation numerique au service de tous les citoyens, dans chaque commune du pays.'**
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
  /// **'Annees d\'Engagement'**
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
