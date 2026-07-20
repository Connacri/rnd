import 'package:rnd_campaign_app/l10n/app_localizations.dart';

class TranslationService {
  static AppLocalizations? _localizations;

  static void init(AppLocalizations localizations) {
    _localizations = localizations;
  }

  static final Map<String, Map<String, String>> translations = {
    'fr': {
      'appName': 'RND Campaign',
      'candidateName': 'Zenasni Nabil',
      'city': 'Ain El Tûrck',
      'elections2026': 'Elections Communales 2026',
      'together': 'Ensemble, construisons\nl\'avenir d\'Ain El Tûrck',
      'togetherHighlight': 'construisons',
      'description': 'Zenasni Nabil, Secretaire du Bureau Communal du RND a Ain El Tûrck, Oran. Un engagement fort pour le developpement local, la transparence et la proximite avec les citoyens.',
      'ourProgram': 'Notre Programme',
      'joinUs': 'Devenir Adherent',
      'whoWeAre': 'Qui sommes-nous',
      'ourVision': 'Notre Vision',
      'rndDescription': 'Le RND, une force de progres pour l\'Algerie',
      'rndDescText': 'Le Rassemblement National Democratique, fonde en 1997, est un parti liberal et progressiste engage pour le developpement national et local.',
      'visionText': 'Une Algerie forte, prospere et unie. Le RND oeuvre pour une gouvernance transparente, une economie dynamique et une transformation numerique au service de tous les citoyens, dans chaque commune du pays.',
      'commitment': 'Engagement pour Ain El Tûrck',
      'commitmentText': 'En tant que Secretaire du Bureau Communal du RND a Ain El Tûrck, je m\'engage personnellement a porter les voix de nos concitoyens et a transformer nos aspirations en actions concretes sur le terrain.',
      'approach': 'Notre approche repose sur l\'ecoute, la proximite et la transparence. Chaque projet, chaque decision sera prise avec et pour vous.',
      'candidate': 'Candidat',
      'program': 'Programme',
      'membership': 'Adherer',
      'events': 'Evènements',
      'login': 'Se connecter',
      'register': "S'inscrire",
      'logout': 'Déconnexion',
      'email': 'Email',
      'password': 'Mot de passe',
      'name': 'Nom',
      'phone': 'Téléphone',
      'age': 'Age',
      'profession': 'Profession',
      'address': 'Adresse',
      'message': 'Message',
      'suggestion': 'Suggestion / Proposition',
      'send': 'Envoyer ma Candidature',
      'thankYou': 'Merci !',
      'successMessage': 'Votre message a été envoyé avec succès.',
      'loginRequired': 'Vous devez être connecté pour envoyer',
      'noAccount': "Pas encore de compte ? S'inscrire",
      'haveAccount': 'Déjà un compte ? Se connecter',
      'secretary': 'Secretaire',
      'algeria': 'Ain El Tûrck, Oran, Algerie',
      'party': 'RND - RND',
      'ourValues': 'Nos Valeurs',
      'proximity': 'Proximite',
      'proximityDesc': "A l'ecoute des citoyens",
      'innovation': 'Innovation',
      'innovationDesc': 'Solutions modernes',
      'transparency': 'Transparence',
      'transparencyDesc': 'Gestion claire et juste',
      'development': 'Developpement',
      'developmentDesc': 'Croissance durable',
      'mairiesRnd': 'Mairies RND',
      'elusCommunaux': 'Elus Communaux',
      'deputesApn': 'Deputes APN',
      'yearsEngagement': 'Annees d\'Engagement',
      'learnMore': 'En savoir plus',
      'discoverProgram': 'Decouvrir',
      'joinMovement': 'Rejoignez le mouvement',
      'seeEvents': 'Voir les prochains événements',
      'upcomingEvents': 'Prochains événements à venir...',
      'footerDesc': 'Secretaire du Bureau Communal du RND a Ain El Tûrck, Oran. Engage pour le developpement local et le bien-etre de tous les citoyens.',
      'rights': '2026 Zenasni Nabil - RND Ain El Tûrck. Tous droits reserves.',
      'programTitle': 'PROGRAMME',
      'engagement': 'Notre engagement',
      'engagementText1': 'Notre programme est fondé sur des projets concrets, réalisables et financièrement responsables.',
      'engagementText2': 'Nous ne promettons pas des projets irréalisables ou dépendants de financements incertains.',
      'engagementText3': 'Ensemble, faisons d\'Aïn El Turck une commune où il fait bon vivre, investir, travailler et accueillir les visiteurs.',
      'slogan': '« Ensemble pour une nouvelle dynamique à Aïn El Turck »',
      'membershipTitle': 'Devenez Adherent au RND',
      'membershipDesc': 'Rejoignez-nous et participez activement a la construction de l\'avenir de notre commune. Ensemble, nous sommes plus forts.',
      'nom': 'Nom',
      'emailField': 'Email',
      'ageOptional': 'Age (optionnel)',
      'professionOptional': 'Profession (optionnel)',
      'addressOptional': 'Adresse (optionnel)',
      'messageOptional': 'Message (optionnel)',
      'suggestionOptional': 'Suggestion / Proposition (optionnel)',
      'nomRequired': 'Nom requis',
      'emailRequired': 'Email requis',
      'emailInvalid': 'Email invalide',
      'passwordRequired': 'Mot de passe requis',
      'passwordMin': 'Au moins 6 caractères',
      'phoneRequired': 'Téléphone requis',
      'phoneInvalid': 'Numéro invalide',
      'loginError': 'Erreur de connexion',
      'registerError': 'Erreur d\'inscription',
      'fullName': 'Nom complet',
      'welcome': 'Bienvenue',
      'audioMessage': 'Message audio',
    },
    'ar': {
      'appName': 'RND Campaign',
      'candidateName': 'زناسني نبيل',
      'city': 'عين الترك',
      'elections2026': 'انتخابات البلدية 2026',
      'together': 'معاً، لنبني\nمستقبل عين الترك',
      'togetherHighlight': 'لنبني',
      'description': 'زناسني نبيل، الأمين لمكتب حزب التجمع الوطني الديمقراطي بعين الترك، وهران. التزام قوي من أجل التنمية المحلية، الشفافية والقرب من المواطنين.',
      'ourProgram': 'برنامجنا',
      'joinUs': 'انضم إلينا',
      'whoWeAre': 'من نحن',
      'ourVision': 'رؤيتنا',
      'rndDescription': 'التجمع، قوة التقدم للجزائر',
      'rndDescText': 'التجمع الوطني الديمقراطي، الذي تأسس عام 1997، هو حزب ليبرالي وتقدمي ملتزم بالتنمية الوطنية والمحلية.',
      'visionText': 'جزائر قوية ومزدهرة وموحدة. يعمل التجمع الوطني الديمقراطي من أجل حوكمة شفافة واقتصاد ديناميكي وتحول رقمي في خدمة جميع المواطنين، في كل بلدية من بلديات الوطن.',
      'commitment': 'التزامنا بعين الترك',
      'commitmentText': 'بصفتي أمين المكتب البلدي للتجمع الوطني الديمقراطي بعين الترك، أتعهد شخصياً بحمل أصوات مواطنينا وتحويل تطلعاتنا إلى أفعال ملموسة على أرض الواقع.',
      'approach': 'يرتكز نهجنا على الاستماع والقرب والشفافية. سيتم اتخاذ كل مشروع وكل قرار معكم ومن أجلكم.',
      'candidate': 'المرشح',
      'program': 'البرنامج',
      'membership': 'انضم',
      'events': 'الفعاليات',
      'login': 'تسجيل الدخول',
      'register': 'التسجيل',
      'logout': 'تسجيل الخروج',
      'email': 'البريد الإلكتروني',
      'password': 'كلمة المرور',
      'name': 'الاسم',
      'phone': 'الهاتف',
      'age': 'العمر',
      'profession': 'المهنة',
      'address': 'العنوان',
      'message': 'الرسالة',
      'suggestion': 'اقتراح',
      'send': 'إرسال طلبي',
      'thankYou': 'شكراً!',
      'successMessage': 'تم إرسال رسالتك بنجاح.',
      'loginRequired': 'يجب تسجيل الدخول للإرسال',
      'noAccount': 'ليس لديك حساب؟ سجل',
      'haveAccount': 'لديك حساب؟ تسجيل الدخول',
      'secretary': 'الأمين',
      'algeria': 'عين الترك، وهران، الجزائر',
      'party': 'التجمع - RND',
      'ourValues': 'قيمنا',
      'proximity': 'القرب',
      'proximityDesc': 'الاستماع للمواطنين',
      'innovation': 'الابتكار',
      'innovationDesc': 'حلول حديثة',
      'transparency': 'الشفافية',
      'transparencyDesc': 'إدارة واضحة وعادلة',
      'development': 'التنمية',
      'developmentDesc': 'التزام بالنمو',
      'mairiesRnd': 'بلديات التجمع',
      'elusCommunaux': 'المنتخبون البلديون',
      'deputesApn': 'نواب المجلس',
      'yearsEngagement': 'سنوات الالتزام',
      'learnMore': 'معرفة المزيد',
      'discoverProgram': 'استكشف',
      'joinMovement': 'انضم إلى الحركة',
      'seeEvents': 'شاهد الفعاليات القادمة',
      'upcomingEvents': 'الفعاليات القادمة قريباً...',
      'footerDesc': 'الأمين لمكتب التجمع الوطني الديمقراطي بعين الترك، وهران. ملتزم بالتنمية المحلية ورفاهية جميع المواطنين.',
      'rights': '2026 زناسني نبيل - التجمع عين الترك. جميع الحقوق محفوظة.',
      'programTitle': 'البرنامج',
      'engagement': 'التزامنا',
      'engagementText1': 'برنامجنا مبني على مشاريع ملموسة وقابلة للتحقيق ومالياً مسؤولة.',
      'engagementText2': 'نحن لا نعد بمشاريع غير قابلة للتحقيق أو تعتمد على تمويلات غير مؤكدة.',
      'engagementText3': 'معا، لنجعل عين الترك بلدية يحسن العيش فيها والاستثمار والعمل واستقبل الزوار.',
      'slogan': '« معاً من أجل ديناميكية جديدة في عين الترك »',
      'membershipTitle': 'كن عضواً في التجمع',
      'membershipDesc': 'انضم إلينا وشارك بنشاط في بناء مستقبل بلديتنا. معاً، نحن أقوى.',
      'nom': 'الاسم',
      'emailField': 'البريد الإلكتروني',
      'ageOptional': 'العمر (اختياري)',
      'professionOptional': 'المهنة (اختياري)',
      'addressOptional': 'العنوان (اختياري)',
      'messageOptional': 'الرسالة (اختياري)',
      'suggestionOptional': 'اقتراح (اختياري)',
      'nomRequired': 'الاسم مطلوب',
      'emailRequired': 'البريد الإلكتروني مطلوب',
      'emailInvalid': 'بريد إلكتروني غير صالح',
      'passwordRequired': 'كلمة المرور مطلوبة',
      'passwordMin': '6 أحرف على الأقل',
      'phoneRequired': 'الهاتف مطلوب',
      'phoneInvalid': 'رقم غير صالح',
      'loginError': 'خطأ في تسجيل الدخول',
      'registerError': 'خطأ في التسجيل',
      'fullName': 'الاسم الكامل',
      'welcome': 'مرحباً',
      'audioMessage': 'رسالة صوتية',
    },
    'en': {
      'appName': 'RND Campaign',
      'candidateName': 'Zenasni Nabil',
      'city': 'Ain El Tûrck',
      'elections2026': 'Communal Elections 2026',
      'together': 'Together, let\'s build\nthe future of Ain El Tûrck',
      'togetherHighlight': 'let\'s build',
      'description': 'Zenasni Nabil, Secretary of the RND Communal Bureau in Ain El Tûrck, Oran. A strong commitment to local development, transparency and proximity with citizens.',
      'ourProgram': 'Our Program',
      'joinUs': 'Join Us',
      'whoWeAre': 'Who we are',
      'ourVision': 'Our Vision',
      'rndDescription': 'RND, a force of progress for Algeria',
      'rndDescText': 'The National Democratic Rally, founded in 1997, is a liberal and progressive party committed to national and local development.',
      'visionText': 'A strong, prosperous and united Algeria. The RND works for transparent governance, a dynamic economy and digital transformation at the service of all citizens, in every commune of the country.',
      'commitment': 'Commitment to Ain El Tûrck',
      'commitmentText': 'As Secretary of the RND Communal Bureau in Ain El Tûrck, I personally commit to carry the voices of our fellow citizens and to transform our aspirations into concrete actions on the ground.',
      'approach': 'Our approach is based on listening, proximity and transparency. Every project, every decision will be made with and for you.',
      'candidate': 'Candidate',
      'program': 'Program',
      'membership': 'Join',
      'events': 'Events',
      'login': 'Login',
      'register': 'Register',
      'logout': 'Logout',
      'email': 'Email',
      'password': 'Password',
      'name': 'Last Name',
      'phone': 'Phone',
      'age': 'Age',
      'profession': 'Profession',
      'address': 'Address',
      'message': 'Message',
      'suggestion': 'Suggestion / Proposal',
      'send': 'Send my Application',
      'thankYou': 'Thank you!',
      'successMessage': 'Your message has been sent successfully.',
      'loginRequired': 'You must be logged in to send',
      'noAccount': 'Don\'t have an account? Register',
      'haveAccount': 'Already have an account? Login',
      'secretary': 'Secretary',
      'algeria': 'Ain El Tûrck, Oran, Algeria',
      'party': 'RND - RND',
      'ourValues': 'Our Values',
      'proximity': 'Proximity',
      'proximityDesc': 'Listening to citizens',
      'innovation': 'Innovation',
      'innovationDesc': 'Modern solutions',
      'transparency': 'Transparency',
      'transparencyDesc': 'Clear and fair management',
      'development': 'Development',
      'developmentDesc': 'Sustainable growth',
      'mairiesRnd': 'RND Communalities',
      'elusCommunaux': 'Communal Elected',
      'deputesApn': 'APN Deputies',
      'yearsEngagement': 'Years of Commitment',
      'learnMore': 'Learn more',
      'discoverProgram': 'Discover',
      'joinMovement': 'Join the movement',
      'seeEvents': 'See upcoming events',
      'upcomingEvents': 'Upcoming events coming soon...',
      'footerDesc': 'Secretary of the RND Communal Bureau in Ain El Tûrck, Oran. Committed to local development and the well-being of all citizens.',
      'rights': '2026 Zenasni Nabil - RND Ain El Tûrck. All rights reserved.',
      'programTitle': 'PROGRAM',
      'engagement': 'Our commitment',
      'engagementText1': 'Our program is based on concrete, achievable and financially responsible projects.',
      'engagementText2': 'We do not promise unachievable projects or projects dependent on uncertain funding.',
      'engagementText3': 'Together, let us make Ain El Turck a communality where it is good to live, invest, work and welcome visitors.',
      'slogan': '« Together for a new dynamic in Ain El Turck »',
      'membershipTitle': 'Become an RND Member',
      'membershipDesc': 'Join us and actively participate in building the future of our communality. Together, we are stronger.',
      'nom': 'Last Name',
      'emailField': 'Email',
      'ageOptional': 'Age (optional)',
      'professionOptional': 'Profession (optional)',
      'addressOptional': 'Address (optional)',
      'messageOptional': 'Message (optional)',
      'suggestionOptional': 'Suggestion / Proposal (optional)',
      'nomRequired': 'Name is required',
      'emailRequired': 'Email is required',
      'emailInvalid': 'Invalid email',
      'passwordRequired': 'Password is required',
      'passwordMin': 'At least 6 characters',
      'phoneRequired': 'Phone is required',
      'phoneInvalid': 'Invalid number',
      'loginError': 'Login error',
      'registerError': 'Registration error',
      'fullName': 'Full name',
      'welcome': 'Welcome',
      'audioMessage': 'Audio message',
    },
  };

  static String? _currentLang = 'fr';
  static String get currentLang => _currentLang ?? 'fr';

  static void setLang(String lang) {
    _currentLang = lang;
  }

  static String t(String key) {
    final loc = _localizations;
    if (loc == null) {
      return translations[_currentLang]?[key] ?? translations['fr']?[key] ?? key;
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
