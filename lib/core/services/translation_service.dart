import 'package:rnd_campaign_app/l10n/app_localizations.dart';

/// Passerelle statique vers [AppLocalizations] pour permettre l'accès aux
/// traductions en dehors du widget tree (ex. dans des services statiques
/// comme [ProgramData]) sans avoir à passer un [BuildContext] partout.
///
/// Source de vérité unique : les fichiers .arb (lib/l10n/app_*.arb).
/// Ne PAS dupliquer les traductions ici — ajoutez toute nouvelle clé
/// uniquement dans les .arb, puis relancez `flutter gen-l10n`.
class TranslationService {
  static AppLocalizations? _localizations;

  /// Doit être appelé après chaque changement de langue
  /// (voir [LanguageProvider]) avant que [t] ne soit utilisé.
  static void init(AppLocalizations localizations) {
    _localizations = localizations;
  }

  static String? _currentLang = 'fr';
  static String get currentLang => _currentLang ?? 'fr';

  static void setLang(String lang) {
    _currentLang = lang;
  }

  static String t(String key) {
    final loc = _localizations;
    // Avant le premier LanguageProvider.loadSavedLang(), _localizations est
    // encore null : on retourne la clé brute plutôt que de planter. En
    // pratique ce cas est évité par l'appel dans main().
    if (loc == null) {
      return key;
    }
    switch (key) {
      case 'appName': return loc.appName;
      case 'candidateName': return loc.candidateName;
      case 'city': return loc.city;
      case 'elections2026': return loc.elections2026;
      case 'together': return loc.together;
      case 'togetherHighlight': return loc.togetherHighlight;
      case 'description': return loc.description;
      case 'ourProgram': return loc.ourProgram;
      case 'joinUs': return loc.joinUs;
      case 'whoWeAre': return loc.whoWeAre;
      case 'ourVision': return loc.ourVision;
      case 'rndDescription': return loc.rndDescription;
      case 'rndDescText': return loc.rndDescText;
      case 'visionText': return loc.visionText;
      case 'commitment': return loc.commitment;
      case 'commitmentText': return loc.commitmentText;
      case 'approach': return loc.approach;
      case 'candidate': return loc.candidate;
      case 'program': return loc.program;
      case 'membership': return loc.membership;
      case 'events': return loc.events;
      case 'login': return loc.login;
      case 'register': return loc.register;
      case 'logout': return loc.logout;
      case 'email': return loc.email;
      case 'password': return loc.password;
      case 'name': return loc.name;
      case 'phone': return loc.phone;
      case 'age': return loc.age;
      case 'profession': return loc.profession;
      case 'address': return loc.address;
      case 'message': return loc.message;
      case 'suggestion': return loc.suggestion;
      case 'send': return loc.send;
      case 'thankYou': return loc.thankYou;
      case 'successMessage': return loc.successMessage;
      case 'loginRequired': return loc.loginRequired;
      case 'noAccount': return loc.noAccount;
      case 'haveAccount': return loc.haveAccount;
      case 'secretary': return loc.secretary;
      case 'algeria': return loc.algeria;
      case 'party': return loc.party;
      case 'ourValues': return loc.ourValues;
      case 'proximity': return loc.proximity;
      case 'proximityDesc': return loc.proximityDesc;
      case 'innovation': return loc.innovation;
      case 'innovationDesc': return loc.innovationDesc;
      case 'transparency': return loc.transparency;
      case 'transparencyDesc': return loc.transparencyDesc;
      case 'development': return loc.development;
      case 'developmentDesc': return loc.developmentDesc;
      case 'mairiesRnd': return loc.mairiesRnd;
      case 'elusCommunaux': return loc.elusCommunaux;
      case 'deputesApn': return loc.deputesApn;
      case 'yearsEngagement': return loc.yearsEngagement;
      case 'learnMore': return loc.learnMore;
      case 'discoverProgram': return loc.discoverProgram;
      case 'joinMovement': return loc.joinMovement;
      case 'seeEvents': return loc.seeEvents;
      case 'upcomingEvents': return loc.upcomingEvents;
      case 'footerDesc': return loc.footerDesc;
      case 'rights': return loc.rights;
      case 'programTitle': return loc.programTitle;
      case 'engagement': return loc.engagement;
      case 'engagementText1': return loc.engagementText1;
      case 'engagementText2': return loc.engagementText2;
      case 'engagementText3': return loc.engagementText3;
      case 'slogan': return loc.slogan;
      case 'membershipTitle': return loc.membershipTitle;
      case 'membershipDesc': return loc.membershipDesc;
      case 'nom': return loc.nom;
      case 'emailField': return loc.emailField;
      case 'ageOptional': return loc.ageOptional;
      case 'professionOptional': return loc.professionOptional;
      case 'addressOptional': return loc.addressOptional;
      case 'messageOptional': return loc.messageOptional;
      case 'suggestionOptional': return loc.suggestionOptional;
      case 'nomRequired': return loc.nomRequired;
      case 'emailRequired': return loc.emailRequired;
      case 'emailInvalid': return loc.emailInvalid;
      case 'passwordRequired': return loc.passwordRequired;
      case 'passwordMin': return loc.passwordMin;
      case 'phoneRequired': return loc.phoneRequired;
      case 'phoneInvalid': return loc.phoneInvalid;
      case 'loginError': return loc.loginError;
      case 'registerError': return loc.registerError;
      case 'fullName': return loc.fullName;
      case 'welcome': return loc.welcome;
      case 'audioMessage': return loc.audioMessage;
      default:
        return key;
    }
  }

  static bool get isRtl => _currentLang == 'ar';
}
