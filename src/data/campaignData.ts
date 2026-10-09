import { ProgramPillar, CandidateInfo, CampaignStat, CampaignEvent, NewsArticle } from '../types';

export const candidateData: CandidateInfo = {
  name: "Zenasni Nabil",
  photoUrl: "/assets/images/nabil-zenasni-profile2.jpg",
  role: {
    fr: "Secrétaire du Bureau Communal",
    ar: "أمين المكتب البلدي",
    en: "Communal Bureau Secretary"
  },
  party: {
    fr: "Rassemblement National Démocratique (RND)",
    ar: "التجمع الوطني الديمقراطي (RND)",
    en: "National Democratic Rally (RND)"
  },
  location: {
    fr: "Aïn El Turck, Wilaya d'Oran, Algérie",
    ar: "عين الترك، ولاية وهران، الجزائر",
    en: "Ain El Turck, Oran Province, Algeria"
  },
  biography: {
    fr: "Une Algérie forte, prospère et unie. Le RND œuvre pour une gouvernance transparente, une économie dynamique et une transformation numérique au service de tous les citoyens, dans chaque commune du pays. En tant que Secrétaire du Bureau Communal à Aïn El Turck, je m'engage à porter les voix de nos concitoyens pour redonner à notre joyau côtier toute sa splendeur et son rayonnement.",
    ar: "جزائر قوية ومزدهرة وموحدة. يعمل التجمع الوطني الديمقراطي من أجل حوكمة شفافة واقتصاد ديناميكي وتحول رقمي في خدمة جميع المواطنين، في كل بلدية من بلديات الوطن. وبصفتي أميناً للمكتب البلدي بعين الترك، أتعهد بحمل صوت ساكنتنا وإعادة البريق والازدهار لهذه الجوهرة الساحلية.",
    en: "A strong, prosperous and united Algeria. The RND works for transparent governance, a dynamic economy and digital transformation serving all citizens in every municipality. As Secretary of the Communal Bureau in Ain El Turck, I commit to championing our residents' voices to restore our coastal gem to its full splendor."
  }
};

export const campaignStats: CampaignStat[] = [
  {
    icon: "🏛️",
    number: "451",
    label: {
      fr: "Mairies RND",
      ar: "بلديات التجمع",
      en: "RND Communalities"
    }
  },
  {
    icon: "👥",
    number: "6 521",
    label: {
      fr: "Élus Communaux",
      ar: "المنتخبون البلديون",
      en: "Communal Elected"
    }
  },
  {
    icon: "🏛️",
    number: "58",
    label: {
      fr: "Députés APN",
      ar: "نواب المجلس الشعبي",
      en: "APN Deputies"
    }
  },
  {
    icon: "📅",
    number: "28",
    label: {
      fr: "Années d'Engagement",
      ar: "سنوات الالتزام والخبرة",
      en: "Years of Commitment"
    }
  }
];

export const programPillars: ProgramPillar[] = [
  {
    id: "p1",
    number: "01",
    icon: "💼",
    accentColor: "#0284c7", // Sky blue
    bgLight: "bg-sky-50 dark:bg-sky-950/30",
    title: {
      fr: "Développement économique, commerce et emploi",
      ar: "التنمية الاقتصادية والتجارة والتوظيف",
      en: "Economic Development, Commerce and Employment"
    },
    subtitle: {
      fr: "Notre priorité est de transformer Aïn El Turck en une commune créatrice de richesse.",
      ar: "أولويتنا هي تحويل عين الترك إلى بلدية تُنتج الثروة وفرص العمل.",
      en: "Our priority is to transform Ain El Turck into a wealth-generating communality."
    },
    tag: {
      fr: "Économie & Emploi",
      ar: "التنمية الاقتصادية",
      en: "Economic Development"
    },
    items: {
      fr: [
        "L'ouverture d'une deuxième route reliant les deux extrémités de la commune afin de désengorger la circulation.",
        "La réalisation des raccordements nécessaires sur cette route déjà existante.",
        "La création d'un nouveau corridor économique favorisant l'implantation de commerces et de nouveaux locaux commerciaux.",
        "La valorisation des terrains, habitations et résidences situés le long de cette nouvelle voie.",
        "La création d'emplois directs et indirects pour les jeunes de la région.",
        "La création d'un marché quotidien à Trouville (à l'étude).",
        "La création d'un marché hebdomadaire de véhicules à l'entrée ou à la sortie de la commune.",
        "L'installation de kiosques commerciaux harmonisés selon une architecture de style californien moderne.",
        "La création d'une base de données recensant tous les commerces, artisans, professions libérales et services.",
        "L'organisation de rencontres régulières entre entreprises, commerçants, investisseurs et clubs sportifs/culturels.",
        "Encourager les entreprises titulaires de marchés publics à contribuer à deux problématiques d'intérêt communal."
      ],
      ar: [
        "فتح طريق ثانٍ يربط طرفي البلدية لتخفيف الازدحام المروري الدائم.",
        "إنجاز التوصيلات والمسالك اللازمة على هذا الطريق الموجود بالفعل.",
        "إنشاء ممر اقتصادي جديد يشجع على استقرار المتاجر والمحلات التجارية الجديدة.",
        "تعزيز قيمة الأراضي والمساكن والإقامات الواقعة على طول هذا الطريق الحيوي.",
        "خلق فرص عمل مباشرة وغير مباشرة لشباب بلدية عين الترك.",
        "إنشاء سوق يومي في حي تروفيل لتسهيل التموين اليومي (قيد الدراسة).",
        "إنشاء سوق أسبوعي منظم للمركبات عند مدخل أو مخرج البلدية.",
        "تركيب أكشاك تجارية موحدة ومتناسقة وفق هندسة معمارية عصرية جمالية.",
        "إنشاء قاعدة بيانات رقمية تسرد جميع المتاجر والحرفيين والمهن الحرة والجمعيات لتسهيل التعاملات.",
        "تنظيم لقاءات دورية بين المؤسسات والتجار والمستثمرين والأندية لدعم الرعاية والمشاريع التشاركية.",
        "تشجيع المؤسسات الحاصلة على صفقات عمومية على المساهمة في حل معضلتين بلديتين في إطار المسؤولية الاجتماعية."
      ],
      en: [
        "Opening a second road connecting the two ends of the communality to ease traffic flow.",
        "Carrying out the necessary connections on this already existing road.",
        "Creating a new economic corridor promoting the establishment of businesses and new commercial premises.",
        "Enhancing the value of land, homes and residences located along this new road.",
        "Creating direct and indirect jobs for local youth.",
        "Creating a daily market in Trouville (under study).",
        "Creating a weekly vehicle market at the entrance or exit of the communality.",
        "Installing harmonized commercial kiosks according to modern architecture.",
        "Creating a comprehensive database listing all businesses, craftsmen, and services.",
        "Organizing regular meetings between businesses, traders, and investors for sponsorships and partnerships.",
        "Encouraging public contract holders to contribute to solving communal challenges through corporate social responsibility."
      ]
    }
  },
  {
    id: "p2",
    number: "02",
    icon: "🚗",
    accentColor: "#e11d48", // Rose / Coral
    bgLight: "bg-rose-50 dark:bg-rose-950/30",
    title: {
      fr: "Mobilité, circulation et transports",
      ar: "التنقل والسير والمواصلات",
      en: "Mobility, Traffic and Transport"
    },
    subtitle: {
      fr: "La mobilité fluide est indispensable au bien-être et au développement économique.",
      ar: "التنقل السلس والسريع ضروري لحياة كريمة وتنمية اقتصادية حقيقية.",
      en: "Seamless mobility is essential for economic and social development."
    },
    tag: {
      fr: "Mobilité Urbaine",
      ar: "حركة المرور",
      en: "Mobility & Transit"
    },
    items: {
      fr: [
        "L'ouverture de la deuxième route afin de fluidifier durablement la circulation.",
        "La création de nouvelles lignes de transport en commun régulières et modernes.",
        "La création de nouvelles lignes de taxis desservant les quartiers éloignés.",
        "Une meilleure desserte des quartiers pour éviter les longues marches jusqu'à la route nationale.",
        "Une gestion optimisée des flux routiers pendant la forte saison estivale.",
        "Bâtir 6 ponts pour la déviation depuis la route vers les Andalouses pour un accès fluide.",
        "Création de stations de transport près de Trouville, Bouisseville, Bensmir, Cap Falcon et Les Dunes."
      ],
      ar: [
        "فتح الطريق الثاني من أجل تسهيل حركة المرور وفك الاختناق بشكل مستدام.",
        "إنشاء خطوط جديدة ومنتظمة للنقل العمومي بالحافلات الحديثة.",
        "إنشاء خطوط تاكسي مخصصة لخدمة الأحياء السكنية النائية والمحرومة.",
        "خدمة الأحياء بصورة أفضل حتى لا يضطر المواطن لقطع مسافات طويلة مشياً نحو الطريق الوطني.",
        "إدارة ذكية واحترافية لتدفقات حركة المرور خلال موسم الاصطياف السياحي.",
        "بناء 6 جسور لتحويل السير من طريق الأندلس وتمكين الوصول السهل وتفادي الاختناقات المرورية.",
        "إنشاء محطات منظمة للنقل العمومي بالقرب من تجمعات تروفيل، بويسفيل، بنسمير، وكاب فالكون وليدون."
      ],
      en: [
        "Opening the second road to ensure sustainable long-term traffic flow.",
        "Creating new, modern public transit bus routes.",
        "Creating taxi routes dedicated to serving distant neighborhoods.",
        "Better direct neighborhood transit connections to avoid long walks to the national road.",
        "Smart traffic management during peak summer tourist seasons.",
        "Constructing 6 bypass bridges towards Les Andalouses for smooth traffic flow.",
        "Establishing structured transit stations near Trouville, Bouisseville, Bensmir, Cap Falcon and Les Dunes."
      ]
    }
  },
  {
    id: "p3",
    number: "03",
    icon: "🏖️",
    accentColor: "#d97706", // Amber / Gold
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    title: {
      fr: "Tourisme, plages et attractivité",
      ar: "السياحة والشواطئ والجاذبية",
      en: "Tourism, Beaches and Attractiveness"
    },
    subtitle: {
      fr: "Aïn El Turck doit redevenir une référence nationale parmi les stations balnéaires.",
      ar: "يجب أن تعود عين الترك كوجهة نموذجية ومرجع وطني للمنتجعات البحرية الراقية.",
      en: "Ain El Turck must regain its status as a top seaside resort."
    },
    tag: {
      fr: "Tourisme & Plages",
      ar: "السياحة البحرية",
      en: "Tourism & Coast"
    },
    items: {
      fr: [
        "Des accès aux plages conçus pour durer avec des moules architecturaux de style osmanien.",
        "L'utilisation de mortiers teintés hautement résistants à l'humidité marine.",
        "Des passerelles et accès en bois élégants inspirés du style côtier californien.",
        "La création de brigades permanentes de propreté et de nettoyage des plages 7j/7.",
        "La mise en place d'animations culturelles et de campagnes de sensibilisation écocitoyennes.",
        "L'installation de panneaux modernes bilingues rappelant les règles de civisme et de sécurité.",
        "Le développement des activités et clubs de sports nautiques pour les jeunes.",
        "Le soutien aux associations organisant des événements sportifs et culturels maritimes.",
        "Une plateforme numérique regroupant toutes les informations utiles aux résidents et estivants."
      ],
      ar: [
        "مداخل شاطئ مصممة لتدوم سنوات طويلة عبر تصنيع قوالب جدارية متقنة على طراز معماري أصيل.",
        "استخدام مونة ملونة خاصة مقاومة لملوحة البحر والرطوبة العالية.",
        "جسور وممرات خشبية راقية مستوحاة من أسلوب الواجهات البحرية الحديثة.",
        "إنشاء فرق بلدية دائمة ومجهزة لنظافة الشواطئ طوال أيام الأسبوع.",
        "تنظيم حملات توعوية وفعاليات تنشيطية ثقافية وبيئية للأسر والأطفال.",
        "تركيب لوحات إرشادية عصرية تذكر بقواعد النظافة والأمان والحفاظ على البيئة البحرية.",
        "تطوير الأنشطة والرياضات البحرية ودعم نوادي الغوص والتجديف.",
        "دعم الجمعيات الرياضية والثقافية التي تنشط في المجال البحري والسياحي.",
        "إطلاق بوابة رقمية شاملة تضم كل المعلومات والخدمات للمواطنين والسياح والزوار."
      ],
      en: [
        "Durable beach access points built using high-standard architectural molds.",
        "Using marine moisture-resistant tinted materials for durable coastal structures.",
        "Elegant wooden boardwalks and footbridges inspired by coastal seaside architecture.",
        "Dedicated full-time coastal sanitation teams operating seven days a week.",
        "Eco-citizen awareness campaigns and lively seasonal family cultural animations.",
        "Modern multilingual signboards promoting hygiene, environmental care and water safety.",
        "Expanding water sports clubs and ocean youth activities.",
        "Direct logistical support for associations organizing maritime, cultural and sports festivals.",
        "A comprehensive digital portal providing essential local services and visitor guides."
      ]
    }
  },
  {
    id: "p4",
    number: "04",
    icon: "🌳",
    accentColor: "#16a34a", // Emerald green
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    title: {
      fr: "Environnement, espaces verts et cadre de vie",
      ar: "البيئة والمساحات الخضراء وجودة الحياة",
      en: "Environment, Green Spaces and Quality of Life"
    },
    subtitle: {
      fr: "Nous voulons une commune plus verte, plus respirable et durable pour nos enfants.",
      ar: "نريد بلدية أكثر خضرة، نقية وممتعة، توفر بيئة عيش كريمة ومستدامة لأبنائنا.",
      en: "We envision a greener, healthier and more sustainable town for our children."
    },
    tag: {
      fr: "Cadre de Vie & Écologie",
      ar: "المساحات الخضراء",
      en: "Green Spaces"
    },
    items: {
      fr: [
        "La création d'une pépinière communale dédiée à la production locale de plantes et arbustes.",
        "La plantation de 10 000 arbres adaptés au climat méditerranéen et à croissance rapide.",
        "La protection stricte du patrimoine arboricole et des espaces naturels de la corniche.",
        "L'interdiction absolue de coupes d'arbres ou dégradations non autorisées par la loi.",
        "La fabrication locale d'aires de jeux sécurisées pour parcs municipaux afin de réduire les coûts et accélérer l'aménagement."
      ],
      ar: [
        "إنشاء مشتل بلدي لإنتاج الأشجار والنباتات التزيينية محلياً وتوفير النفقات.",
        "غرس 10,000 شجرة سريعة النمو ومتكيفة مع المناخ المتوسطي عبر كافة أحياء البلدية.",
        "حماية مشددة وصارمة للثروة الشجرية والغطاء النباتي للواجهة البحرية والغابات.",
        "منع قاطع لقطع أو إتلاف الأشجار بدون تراخيص قانونية معاقبة المخالفين.",
        "تصنيع محلي لألعاب وحدائق الأطفال في المتنزهات البلدية لتسريع التجديد وتوفير التكاليف."
      ],
      en: [
        "Establishing a municipal nursery for local plant cultivation and tree nursery.",
        "Planting 10,000 climate-resilient fast-growing trees across municipal neighborhoods.",
        "Strict preservation of the coastal arboreal heritage and natural reserves.",
        "Prohibiting unauthorized tree cutting with rigorous enforcement of environmental laws.",
        "Local fabrication of safe, high-quality playground equipment for municipal parks."
      ]
    }
  },
  {
    id: "p5",
    number: "05",
    icon: "📱",
    accentColor: "#8b5cf6", // Purple / Violet
    bgLight: "bg-purple-50 dark:bg-purple-950/30",
    title: {
      fr: "Une commune numérique et une administration moderne",
      ar: "بلدية رقمية وإدارة حديثة ومبسطة",
      en: "A Digital Communality and Modern Administration"
    },
    subtitle: {
      fr: "Le citoyen doit pouvoir communiquer en toute simplicité avec ses élus et son administration.",
      ar: "يجب أن يتمكن المواطن من التواصل السريع والشفاف مع بلديته ومتابعة حقوقه وانشغالاته.",
      en: "Citizens must be empowered to communicate easily with local government."
    },
    tag: {
      fr: "Numérique & Services",
      ar: "رقمنة الإدارة",
      en: "Smart Governance"
    },
    items: {
      fr: [
        "Signalement des anomalies de voirie, éclairage et décharges avec géolocalisation photo.",
        "Suivi en temps réel de l'avancement et du traitement des requêtes citoyennes.",
        "Consultation transparente des délais d'intervention des équipes techniques.",
        "Canal de contact direct avec le maire et les services du bureau communal.",
        "Espace d'envoi d'idées participatives et de propositions pour les quartiers.",
        "Tableau de bord public des réalisations et projets de la commune.",
        "Renforcement des effectifs aux guichets lors des périodes de forte affluence estivale.",
        "Création d'une cellule municipale de veille active et d'une cellule de gestion de crise.",
        "Système de notification des incidents de coupures d'eau ou d'électricité."
      ],
      ar: [
        "تطبيق للإبلاغ الفوري عن أعطال الإنارة والنفايات والحفر مع تحديد الموقع الجغرافي والصور.",
        "متابعة مسار معالجة طلبات وشكاوى المواطنين في الوقت الفعلي عبر الهاتف.",
        "إعلان شفاف عن آجال وتوقيت التدخل الميداني للفرق التقنية البلدية.",
        "قناة تواصل رقمية مباشرة مع رئيس المجلس وأعضاء المكتب البلدي.",
        "منصة تشاركية لإرسال مقترحات ومبادرات السكان لتطوير أحيائهم.",
        "لوحة قيادة عامة شفافة تعرض تقدم إنجازات ومشاريع البلدية بالأرقام.",
        "تدعيم موظفي شبابيك استخراج الوثائق والإدارة في أوقات الذروة والمواسم.",
        "إنشاء خلية يقظة بلدية دائمة وخلية لإدارة الأزمات وحالات الطوارئ.",
        "نظام إشعارات سريع لتنبيه المواطنين بمستجدات وانقطاعات المياه أو الأشغال."
      ],
      en: [
        "Reporting street repairs, lighting outages and waste points with geotagged mobile photos.",
        "Real-time citizen request status tracking and automated resolution updates.",
        "Transparent municipal intervention response timers.",
        "Direct communication channel between residents and the elected communal bureau.",
        "Participatory citizen idea submission portal for local neighborhood enhancements.",
        "Public dashboard showcasing communal project completions and budgetary milestones.",
        "Reinforcing public service desks during peak seasons for quick, hassle-free paperwork.",
        "Municipal monitoring cell and emergency crisis response unit.",
        "Real-time notifications regarding municipal utilities and road work."
      ]
    }
  },
  {
    id: "p6",
    number: "06",
    icon: "⚖️",
    accentColor: "#f59e0b", // Gold / Amber
    bgLight: "bg-amber-50 dark:bg-amber-950/30",
    title: {
      fr: "Gouvernance, transparence et participation citoyenne",
      ar: "الحوكمة والشفافية والمشاركة المواطنة",
      en: "Governance, Transparency and Citizen Participation"
    },
    subtitle: {
      fr: "La confiance renouvelée se construit par la transparence et la probité absolue.",
      ar: "الثقة المتبادلة بين المواطن وممثليه تُبنى بالشفافية والنزاهة والعمل الدؤوب.",
      en: "Renewed trust is built upon total transparency and genuine citizen dialogue."
    },
    tag: {
      fr: "Transparence & Démocratie",
      ar: "المشاركة الديمقراطية",
      en: "Transparency"
    },
    items: {
      fr: [
        "Publication ouverte de l'intégralité du programme et des engagements électoraux.",
        "Bilan annuel détaillé des réalisations, budgets et dépenses communiqué aux habitants.",
        "Rencontres citoyennes mensuelles ouvertes à tous dans chaque quartier de la commune.",
        "Sondages et consultations locales avant les grands aménagements urbains.",
        "Association active des comités de quartier et des jeunes aux prises de décisions."
      ],
      ar: [
        "نشر كامل بنود البرنامج الانتخابي والتعهدات بوضوح للجميع دون استثناء.",
        "نشر تقرير سنوي مفصل ومعلن عن الإنجازات والميزانية والمداخيل نهاية كل عام.",
        "تنظيم لقاءات شعبية شهرية مفتوحة مع المواطنين دورياً في كل أحياء البلدية.",
        "استشارات عامة واستطلاعات رأي للسكان قبل إطلاق المشاريع الحضرية الكبرى.",
        "إشراك فعّال للجان الأحياء، الجمعيات الفاعلة، والشباب في القرارات المصيرية للبلدية."
      ],
      en: [
        "Public availability of the entire electoral program and actionable commitments.",
        "Detailed annual accountability report on communal projects, budgets and expenses.",
        "Monthly open town-hall community meetings across all residential neighborhoods.",
        "Direct local polling and surveys prior to executing major urban development plans.",
        "Active inclusion of neighborhood committees, civic associations, and youth in local choices."
      ]
    }
  }
];

export const campaignEvents: CampaignEvent[] = [
  {
    id: "ev1",
    title: {
      fr: "Grande Rencontre Citoyenne — Quartier Trouville",
      ar: "لقاء شعبي جماهيري كبير — حي تروفيل",
      en: "Major Citizen Town Hall — Trouville Neighborhood"
    },
    description: {
      fr: "Présentation détaillée des solutions pour le commerce, la deuxième route et débat ouvert avec les riverains.",
      ar: "عرض مفصل لحلول التجارة، فتح الطريق الثاني، ونقاش مفتوح ومباشر مع سكان الحي.",
      en: "Detailed presentation of trade solutions, the bypass road, and an open debate with local residents."
    },
    location: {
      fr: "Place centrale de Trouville, Aïn El Turck",
      ar: "الساحة المركزية لتروفيل، عين الترك",
      en: "Trouville Central Square, Ain El Turck"
    },
    date: "2026-10-24T17:00:00Z",
    tag: {
      fr: "Rencontre de quartier",
      ar: "لقاء شعبي",
      en: "Neighborhood Meetup"
    }
  },
  {
    id: "ev2",
    title: {
      fr: "Forum de la Jeunesse & des Métiers du Tourisme",
      ar: "منتدى الشباب ومهن السياحة والرياضات البحرية",
      en: "Youth & Maritime Tourism Opportunities Forum"
    },
    description: {
      fr: "Discussion autour des opportunités d'emploi pour les jeunes, des kiosques municipaux et des activités sportives.",
      ar: "حوار حول فرص العمل للشباب، الأكشاك النموذجية، ودعم المبادرات الرياضية والبحرية.",
      en: "Discussion on youth employment opportunities, standardized kiosks, and maritime athletic clubs."
    },
    location: {
      fr: "Salle des Fêtes Municipale, Aïn El Turck",
      ar: "قاعة الحفلات البلدية، عين الترك",
      en: "Municipal Hall, Ain El Turck"
    },
    date: "2026-11-06T14:30:00Z",
    tag: {
      fr: "Jeunesse & Emploi",
      ar: "الشباب والتوظيف",
      en: "Youth & Jobs"
    }
  },
  {
    id: "ev3",
    title: {
      fr: "Meeting de Présentation du Programme Électoral 2026",
      ar: "التجمع الشعبي الحاشد لعرض البرنامج الانتخابي 2026",
      en: "Grand Rally — 2026 Electoral Program Unveiling"
    },
    description: {
      fr: "Allocution solennelle du candidat Zenasni Nabil et des cadres du RND sur la vision pour les 5 années à venir.",
      ar: "كلمة رسمية للمترشح زناسني نبيل وإطارات التجمع الوطني الديمقراطي حول آفاق عهدتنا القادمة.",
      en: "Official keynote by candidate Zenasni Nabil and RND representatives outlining the 5-year vision."
    },
    location: {
      fr: "Esplanade Cap Falcon, Aïn El Turck",
      ar: "ساحة كاب فالكون، عين الترك",
      en: "Cap Falcon Esplanade, Ain El Turck"
    },
    date: "2026-11-20T16:00:00Z",
    tag: {
      fr: "Grand Meeting",
      ar: "تجمع شعبي حاشد",
      en: "Grand Rally"
    }
  }
];

export const campaignNews: NewsArticle[] = [
  {
    id: "n1",
    title: {
      fr: "Lancement de la plateforme numérique participative du RND Aïn El Turck",
      ar: "إطلاق المنصة الرقمية التشاركية للتجمع الوطني الديمقراطي بعين الترك",
      en: "Launch of RND Ain El Turck Participatory Digital Platform"
    },
    body: {
      fr: "Afin de renforcer le contact direct avec chaque citoyenne et citoyen, notre bureau communal déploie son application officielle permettant de découvrir le programme, d'adhérer et de soumettre vos propositions.",
      ar: "تعزيزاً للتواصل المباشر مع كل مواطنة ومواطن، يطلق مكتبنا البلدي تطبيقه الرسمي المبتكر لاكتشاف البرنامج الكامل، الانخراط، وتقديم مقترحاتكم لبلديتنا.",
      en: "To foster direct engagement with every citizen, our communal bureau launches its official app to explore our complete program, sign up, and submit local community ideas."
    },
    date: "2026-10-09",
    tag: {
      fr: "Communiqué officiel",
      ar: "بيان رسمي",
      en: "Official Bulletin"
    }
  },
  {
    id: "n2",
    title: {
      fr: "Visite de terrain à Bouisseville : écoute des commerçants et riverains",
      ar: "زيارة ميدانية لحي بويسفيل: الاستماع لانشغالات التجار والمواطنين",
      en: "Field Visit in Bouisseville: Listening to Local Shopkeepers and Residents"
    },
    body: {
      fr: "Zenasni Nabil et l'équipe de campagne ont échangé avec les commerçants concernant le plan de circulation estival et l'aménagement futur de la deuxième route.",
      ar: "التقى زناسني نبيل وفريق الحملة بتجار وساكنة الحي لمناقشة خطة تسيير حركة السير الصيفية وتهيئات الطريق البديل لفك الخناق.",
      en: "Zenasni Nabil and the campaign committee met with local shop owners and residents regarding traffic mitigation and future road infrastructure."
    },
    date: "2026-10-05",
    tag: {
      fr: "Terrain & Proximité",
      ar: "نزول ميداني",
      en: "Field Work"
    }
  }
];
