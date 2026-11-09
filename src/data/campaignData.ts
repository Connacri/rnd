import { ProgramPillar, CandidateInfo, CampaignStat, CampaignEvent, NewsArticle, CampaignPoster } from '../types';

export const candidateData: CandidateInfo = {
  name: "Bureau Communal du RND — Aïn El Turck",
  photoUrl: "assets/images/nabil-zenasni-profile2.jpg",
  role: {
    fr: "Secrétaire du bureau : Zenasni Nabil",
    ar: "أمين المكتب: زناسني نبيل",
    en: "Bureau Secretary: Zenasni Nabil"
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
    fr: "Une Algérie forte, prospère et unie. Le RND œuvre pour une gouvernance transparente, une économie dynamique et une transformation numérique au service de tous les citoyens, dans chaque commune du pays. Le Bureau Communal du RND à Aïn El Turck, avec son secrétaire Zenasni Nabil, œuvre à porter les préoccupations des citoyens et à défendre un développement local transparent, dynamique et durable.",
    ar: "جزائر قوية ومزدهرة وموحدة. يعمل التجمع الوطني الديمقراطي من أجل حوكمة شفافة واقتصاد ديناميكي وتحول رقمي في خدمة جميع المواطنين، في كل بلدية من بلديات الوطن. يعمل المكتب البلدي للتجمع الوطني الديمقراطي بعين الترك، بأمينه زناسني نبيل، على نقل انشغالات المواطنين والدفاع عن تنمية محلية شفافة وديناميكية ومستدامة.",
    en: "A strong, prosperous and united Algeria. The RND works for transparent governance, a dynamic economy and digital transformation serving all citizens in every municipality. The RND Communal Bureau in Ain El Turck, led by its secretary Zenasni Nabil, works to represent residents' concerns and promote transparent, dynamic and sustainable local development."
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
      fr: "Développement économique, commerce et création d'emplois et d'activités",
      ar: "التنمية الاقتصادية والتجارة و خلق جو العمل و الأعمال.",
      en: "Economic development, commerce, and the creation of jobs and business opportunities"
    },
    subtitle: {
      fr: "Notre priorité est de faire d’Aïn El Turck une commune qui crée de la richesse et des emplois, et une destination touristique particulièrement attractive.",
      ar: `أولويتنا هي تحويل عين الترك إلى بلدية تُنتج الثروة  و وفرص العمل. و الاعمال
و جعلها مدينة سياحية جذابة بإمتياز`,
      en: "Our priority is to transform Ain El Turck into a municipality that generates wealth and jobs, and to make it an exceptionally attractive tourist destination."
    },
    tag: {
      fr: "Économie, commerce et emploi",
      ar: "التنمية الاقتصادية والتجارة والتوظيف",
      en: "Economy, commerce and employment"
    },
    items: {
      fr: [
        "Ouverture d’une deuxième voie reliant les différents secteurs de la commune afin de réduire les embouteillages permanents et de créer une nouvelle dynamique commerciale le long de cette voie.",
        "Réalisation des raccordements et des voies d’accès nécessaires sur cette route déjà existante.",
        "Création d’un nouveau corridor économique favorisant l’installation de nouveaux magasins et commerces.",
        "Valorisation des terrains, des habitations et des résidences situés le long de cette voie stratégique.",
        "Création d’un environnement favorable aux activités et aux emplois directs et indirects pour les jeunes d’Aïn El Turck.",
        "Création d’un marché quotidien dans le quartier de Trouville afin de faciliter l’approvisionnement de tous les jours.",
        "Création d’un marché hebdomadaire organisé pour les véhicules à la sortie de la ville.",
        "Installation de kiosques commerciaux uniformes et harmonisés, conçus selon une architecture moderne et esthétique.",
        "Création d’une base de données numérique répertoriant tous les commerces, artisans, professions libérales et associations afin de faciliter les échanges et la communication.",
        "Organisation de rencontres périodiques entre entreprises, commerçants, investisseurs et clubs afin de soutenir le sponsoring et les projets partenariaux.",
        "Incitation des entreprises titulaires de marchés publics à contribuer à la résolution d’au moins deux problèmes auxquels la ville est confrontée.",
        "Accompagner les projets économiques locaux, encourager l’investissement et le commerce, et favoriser la création de nouvelles activités et de nouveaux emplois.",
        "Relancer, après étude de faisabilité et dans le respect des exigences environnementales, l’activité de pisciculture marine en bassins."
      ],
      ar: [
        "فتح طريق ثانٍ يربط البلدية لتخفيف الازدحام المروري الدائم و خلق جو تجاري جديد في الطريق الجديد",
        "إنجاز التوصيلات والمسالك اللازمة على هذا الطريق الموجود بالفعل.",
        "إنشاء ممر اقتصادي جديد يشجع على استقرار المتاجر والمحلات التجارية الجديدة.",
        "تعزيز قيمة الأراضي والمساكن والإقامات الواقعة على طول هذا الطريق الحيوي.",
        "خلق مناخ اعمال مباشرة وغير مباشرة لشباب بلدية عين الترك.",
        "إنشاء سوق يومي في حي تروفيل لتسهيل التموين اليومي",
        "إنشاء سوق أسبوعي منظم للمركبات عند مخرج المدينة",
        "تركيب أكشاك تجارية موحدة ومتناسقة وفق هندسة معمارية عصرية جمالية.",
        "إنشاء قاعدة بيانات رقمية تسرد جميع المتاجر والحرفيين والمهن الحرة والجمعيات لتسهيل التعاملات. و التواصل",
        "تنظيم لقاءات دورية بين المؤسسات والتجار والمستثمرين والأندية لدعم الرعاية والمشاريع التشاركية.",
        "حث المؤسسات الحاصلة على صفقات عمومية على المساهمة في حل على الأقل معضلتين موجودتين في المدينة.",
        "دعم المشاريع المحلية وتشجيع الاستثمار والتجارة وخلق أنشطة اقتصادية وفرص عمل جديدة.",
        "إعادة بعث نشاط تربية الأسماك البحرية في الأحواض بعد دراسة الجدوى واحترام المتطلبات البيئية."
      ],
      en: [
        "Open a second road connecting the municipality’s different areas to ease persistent traffic congestion and create new commercial activity along the new route.",
        "Carry out the utility connections and access roads required for this road, which already exists.",
        "Create a new economic corridor that encourages the establishment of new shops and businesses.",
        "Increase the value of land, homes and residential properties along this vital road.",
        "Create an environment that generates direct and indirect business and employment opportunities for the young people of Ain El Turck.",
        "Establish a daily market in the Trouville district to make everyday shopping and supplies easier.",
        "Establish an organized weekly vehicle market at the exit of the city.",
        "Install standardized, coordinated commercial kiosks with attractive, modern architectural design.",
        "Create a digital database listing all shops, tradespeople, independent professionals and associations to facilitate transactions and communication.",
        "Hold regular meetings between businesses, traders, investors and clubs to support sponsorships and collaborative projects.",
        "Encourage companies awarded public contracts to help resolve at least two of the problems facing the city."
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
      fr: "Circulation, mobilité et transports",
      ar: `حركة المرور
التنقل والسير والمواصلات`,
      en: "Traffic, mobility and transport"
    },
    subtitle: {
      fr: "Une mobilité fluide et rapide est indispensable à une vie digne et à un véritable développement économique.",
      ar: "التنقل السلس والسريع ضروري لحياة كريمة وتنمية اقتصادية حقيقية.",
      en: "Smooth and efficient mobility is essential to a dignified quality of life and genuine economic development."
    },
    tag: {
      fr: "Circulation et transports",
      ar: "حركة المرور",
      en: "Traffic and transport"
    },
    items: {
      fr: [
        "Ouverture de la deuxième voie afin de faciliter la circulation et de désengorger durablement la ville.",
        "Création de nouvelles lignes régulières de transport public assurées par des bus modernes.",
        "Création de lignes de taxis dédiées aux quartiers résidentiels éloignés et insuffisamment desservis.",
        "Amélioration de la desserte des quartiers afin d’éviter aux habitants de parcourir de longues distances à pied pour rejoindre la route nationale.",
        "Gestion intelligente et professionnelle des flux de circulation pendant la saison touristique estivale.",
        "Construction de 6 ponts pour dévier la circulation depuis la route des Andalouses, faciliter les déplacements et éviter les embouteillages.",
        "Création de stations organisées de transport public à proximité des zones de Trouville, Bouisseville, Bensmir et Cap Falcon.",
        "Support local economic projects, encourage investment and trade, and foster new activities and employment.",
        "Revive marine fish farming in basins following feasibility studies and in compliance with environmental requirements.",
        "Développer et rénover les routes et les trottoirs dans les différents quartiers.",
        "Améliorer le réseau d’assainissement et la qualité des services publics de proximité."
      ],
      ar: [
        "فتح الطريق الثاني من أجل تسهيل حركة المرور وفك الاختناق بشكل مستدام.",
        "إنشاء خطوط جديدة ومنتظمة للنقل العمومي بالحافلات الحديثة.",
        "إنشاء خطوط تاكسي مخصصة لخدمة الأحياء السكنية النائية والمحرومة.",
        "خدمة الأحياء بصورة أفضل حتى لا يضطر المواطن لقطع مسافات طويلة مشياً نحو الطريق الوطني.",
        "إدارة ذكية واحترافية لتدفقات حركة المرور خلال موسم الاصطياف السياحي.",
        "بناء 6 جسور لتحويل السير من طريق الأندلس وتمكين الوصول السهل وتفادي الاختناقات المرورية.",
        "إنشاء محطات منظمة للنقل العمومي بالقرب من تجمعات تروفيل، بوزفيل، بن سمير، وكاب فالكون",
        "تطوير الطرق والأرصفة وتجديدها عبر مختلف أحياء البلدية.",
        "تحسين شبكة الصرف الصحي والارتقاء بجودة الخدمات العمومية الجوارية."
      ],
      en: [
        "Open the second road to improve traffic flow and provide a sustainable solution to congestion.",
        "Create new, regular public transport routes operated by modern buses.",
        "Create dedicated taxi routes serving remote and underserved residential neighborhoods.",
        "Improve service to neighborhoods so residents do not have to walk long distances to reach the national road.",
        "Ensure smart and professional traffic-flow management during the summer tourist season.",
        "Build 6 bridges to divert traffic from the Les Andalouses road, make access easier and prevent congestion.",
        "Create organized public transport stops near the Trouville, Bouisseville, Bensmir and Cap Falcon areas."
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
      en: "Tourism, beaches and appeal"
    },
    subtitle: {
      fr: "Aïn El Turck doit redevenir une destination exemplaire et une référence parmi les stations balnéaires méditerranéennes haut de gamme.",
      ar: "يجب أن تعود عين الترك كوجهة نموذجية ومرجع المنتجعات المتوسطية للمنتجعات البحرية الراقية.",
      en: "Ain El Turck must once again become an exemplary destination and a benchmark for premium Mediterranean seaside resorts."
    },
    tag: {
      fr: "Tourisme et littoral",
      ar: "السياحة البحرية",
      en: "Tourism and coastline"
    },
    items: {
      fr: [
        "Aménagement d’entrées de plage conçues pour durer de nombreuses années, grâce à la fabrication de moules muraux soignés dans un style architectural authentique.",
        "Utilisation d’un mortier teinté spécial, résistant à la salinité marine et à une forte humidité.",
        "Réalisation de passerelles et de promenades en bois élégantes, inspirées du style des fronts de mer modernes.",
        "Création d’équipes municipales permanentes et équipées pour assurer la propreté des plages tous les jours de la semaine.",
        "Organisation de campagnes de sensibilisation et d’activités culturelles et environnementales destinées aux familles et aux enfants.",
        "Installation de panneaux d’information modernes rappelant les règles de propreté, de sécurité et de préservation de l’environnement marin.",
        "Développement des activités et des sports nautiques, avec le soutien aux clubs de plongée, d’aviron, de voile et à toutes les autres disciplines sportives.",
        "Soutien aux associations sportives et culturelles actives dans les domaines maritime et touristique.",
        "Lancement d’un portail numérique complet regroupant toutes les informations et tous les services destinés aux citoyens, aux touristes et aux visiteurs.",
        "Upgrade and renovate roads and sidewalks across the municipality’s neighborhoods.",
        "Improve the sanitation network and the quality of local public services.",
        "Poursuivre le développement du secteur touristique et l’aménagement des plages et des équipements de loisirs.",
        "Dynamiser les festivals et les manifestations culturelles pour faire vivre la commune toute l’année.",
        "Remettre en service et aménager le théâtre en plein air de Trouville."
      ],
      ar: [
        "مداخل شاطئ مصممة لتدوم سنوات طويلة عبر تصنيع قوالب جدارية متقنة على طراز معماري أصيل.",
        "استخدام نرسانة ملونة خاصة مقاومة لملوحة البحر والرطوبة العالية.",
        "جسور وممرات خشبية راقية مستوحاة من أسلوب الواجهات البحرية الحديثة.",
        "إنشاء فرق بلدية دائمة ومجهزة لنظافة الشواطئ طوال أيام الأسبوع.",
        "تنظيم حملات توعوية وفعاليات تنشيطية ثقافية وبيئية للأسر والأطفال.",
        "تركيب لوحات إرشادية عصرية تذكر بقواعد النظافة والأمان والحفاظ على البيئة البحرية.",
        "تطوير الأنشطة والرياضات البحرية ودعم نوادي الغوص والتجديف. و الرياضات الشراعية و كل الرياضات الاخرى.",
        "دعم الجمعيات الرياضية والثقافية التي تنشط في المجال البحري والسياحي.",
        "إطلاق بوابة رقمية شاملة تضم كل المعلومات والخدمات للمواطنين والسياح والزوار.",
        "مواصلة تطوير القطاع السياحي وتهيئة الشواطئ والمرافق الترفيهية.",
        "تنشيط المهرجانات والتظاهرات الثقافية لإحياء البلدية على مدار السنة.",
        "إعادة فتح وتهيئة مسرح الهواء الطلق بتروفيل."
      ],
      en: [
        "Design beach entrances to last for many years by producing carefully crafted wall molds in an authentic architectural style.",
        "Use a specially colored mortar resistant to sea salt and high humidity.",
        "Build elegant wooden bridges and walkways inspired by modern waterfront promenades.",
        "Establish permanent, properly equipped municipal teams to keep beaches clean every day of the week.",
        "Organize awareness campaigns and cultural and environmental activities for families and children.",
        "Install modern information signs reminding visitors of cleanliness, safety and marine-environment protection rules.",
        "Develop water-based activities and sports, supporting diving, rowing, sailing and all other sports clubs.",
        "Support sports and cultural associations active in maritime and tourism activities.",
        "Launch a comprehensive digital portal containing all information and services for residents, tourists and visitors."
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
      fr: "Environnement, espaces verts et qualité de vie",
      ar: "المساحات الخضراء",
      en: "Environment, green spaces and quality of life"
    },
    subtitle: {
      fr: "Nous voulons une commune plus verte, propre et agréable, offrant à nos enfants un cadre de vie digne et durable.",
      ar: "نريد بلدية أكثر خضرة، نقية وممتعة، توفر بيئة عيش كريمة ومستدامة لأبنائنا.",
      en: "We want a greener, cleaner and more pleasant municipality that provides our children with a dignified and sustainable living environment."
    },
    tag: {
      fr: "Environnement et espaces verts",
      ar: "البيئة والمساحات الخضراء وجودة الحياة",
      en: "Environment and green spaces"
    },
    items: {
      fr: [
        "Création d’une pépinière municipale pour produire localement des arbres et des plantes ornementales et réduire les dépenses.",
        "Plantation de 10 000 arbres à croissance rapide, adaptés au climat méditerranéen, dans tous les quartiers de la commune.",
        "Protection renforcée et stricte du patrimoine arboré et du couvert végétal du front de mer et des forêts.",
        "Interdiction absolue de couper ou de dégrader des arbres sans autorisation légale, avec sanction des contrevenants.",
        "Fabrication locale de jeux et d’équipements pour les aires de jeux pour enfants dans les ateliers municipaux, afin d’accélérer leur renouvellement et leur entretien et de réduire les coûts.",
        "Continue developing tourism and improving beaches and recreational facilities.",
        "Promote festivals and cultural events that bring the municipality to life throughout the year.",
        "Restore and refurbish the Trouville open-air theatre.",
        "Renforcer la protection de l’environnement et des espaces verts, et améliorer durablement la propreté et la gestion environnementale.",
        "Réhabiliter le point de mouillage de la zone sablonneuse, après les études et autorisations nécessaires.",
        "Améliorer les infrastructures et les équipements des établissements scolaires.",
        "Soutenir les activités destinées aux jeunes et les activités sportives, et développer la formation et l’orientation professionnelles.",
        "Renforcer l’accès aux services de santé, accompagner les personnes vulnérables et soutenir les initiatives de solidarité sociale."
      ],
      ar: [
        "إنشاء مشتل بلدي لإنتاج الأشجار والنباتات التزيينية محلياً وتوفير النفقات.",
        "غرس 10,000 شجرة سريعة النمو ومتكيفة مع المناخ المتوسطي عبر كافة أحياء البلدية.",
        "حماية مشددة وصارمة للثروة الشجرية والغطاء النباتي للواجهة البحرية والغابات.",
        "منع قاطع لقطع أو إتلاف الأشجار بدون تراخيص قانونية معاقبة المخالفين.",
        "تصنيع محلي لألعاب وحدائق الأطفال في ورشات البلدية لتسريع التجديد، الصيانة وتوفير التكاليف.",
        "تعزيز حماية البيئة والمساحات الخضراء وتحسين النظافة والتسيير البيئي بشكل مستدام.",
        "إعادة تأهيل نقطة الرسو بمنطقة الرمال بعد استكمال الدراسات والتراخيص اللازمة.",
        "تحسين البنية التحتية والتجهيزات بالمؤسسات التربوية.",
        "دعم الأنشطة الشبابية والرياضية وتطوير التكوين والتوجيه المهني.",
        "تعزيز الوصول إلى الخدمات الصحية ومرافقة الفئات الهشة ودعم مبادرات التضامن الاجتماعي."
      ],
      en: [
        "Establish a municipal nursery to grow trees and ornamental plants locally and reduce expenses.",
        "Plant 10,000 fast-growing trees adapted to the Mediterranean climate throughout all municipal neighborhoods.",
        "Enforce strict protection of trees and vegetation along the waterfront and in forest areas.",
        "Strictly prohibit the cutting down or damaging of trees without legal authorization and penalize offenders.",
        "Manufacture playground equipment and children’s park facilities locally in municipal workshops to speed up renewal and maintenance and reduce costs."
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
      fr: "Numérisation de l’administration",
      ar: "رقمنة الإدارة",
      en: "Digitalization of the administration"
    },
    subtitle: {
      fr: "Les citoyens doivent pouvoir communiquer rapidement et en toute transparence avec leur mairie et suivre leurs droits et leurs préoccupations.",
      ar: "يجب أن يتمكن المواطن من التواصل السريع والشفاف مع بلديته ومتابعة حقوقه وانشغالاته.",
      en: "Residents must be able to communicate quickly and transparently with their municipality and track their rights and concerns."
    },
    tag: {
      fr: "Administration numérique",
      ar: "بلدية رقمية وإدارة حديثة ومبسطة",
      en: "Digital administration"
    },
    items: {
      fr: [
        "Application permettant de signaler immédiatement les pannes d’éclairage, les problèmes de déchets et les nids-de-poule, avec géolocalisation et photos.",
        "Suivi en temps réel, via une application dédiée, du traitement des demandes et des réclamations des citoyens.",
        "Publication transparente des délais et des horaires d’intervention des équipes techniques municipales sur le terrain.",
        "Canal numérique de communication directe avec le président du conseil communal et les membres du bureau communal.",
        "Plateforme participative permettant aux habitants d’envoyer des propositions et des initiatives pour améliorer leurs quartiers, et de faire entendre de nouvelles idées, quelle que soit l’importance de leur contribution.",
        "Tableau de bord public et transparent présentant, en chiffres, l’avancement des réalisations et des projets de la commune.",
        "Renforcement des effectifs aux guichets de délivrance des documents et dans les services administratifs pendant les périodes de forte affluence et les saisons.",
        "Création d’une cellule municipale permanente de veille ainsi que d’une cellule de gestion des crises et des situations d’urgence.",
        "Système de notifications rapides pour informer les citoyens des actualités et des interruptions d’eau ou des travaux.",
        "Strengthen environmental and green-space protection while improving cleanliness and environmental management sustainably.",
        "Rehabilitate the anchorage point in the sandy area, subject to the required studies and permits.",
        "Improve infrastructure and facilities in schools.",
        "Support youth and sports activities and expand vocational training and career guidance.",
        "Improve access to healthcare, assist vulnerable people and support social-solidarity initiatives."
      ],
      ar: [
        "تطبيق للإبلاغ الفوري عن أعطال الإنارة والنفايات والحفر مع تحديد الموقع الجغرافي والصور.",
        "متابعة مسار معالجة طلبات وشكاوى المواطنين في الوقت الفعلي عبر تطبيق خاص",
        "إعلان شفاف عن آجال وتوقيت التدخل الميداني للفرق التقنية البلدية.",
        "قناة تواصل رقمية مباشرة مع رئيس المجلس وأعضاء المكتب البلدي.",
        "منصة تشاركية لإرسال مقترحات ومبادرات السكان لتطوير أحيائهم. و سماع افكار جديدة مهما كانت درجة مساهمتها",
        "لوحة قيادة عامة شفافة تعرض تقدم إنجازات ومشاريع البلدية بالأرقام.",
        "تدعيم موظفي شبابيك استخراج الوثائق والإدارة في أوقات الذروة والمواسم.",
        "إنشاء خلية يقظة بلدية دائمة وخلية لإدارة الأزمات وحالات الطوارئ.",
        "نظام إشعارات سريع لتنبيه المواطنين بمستجدات وانقطاعات المياه أو الأشغال."
      ],
      en: [
        "Provide an app for immediately reporting lighting failures, waste problems and potholes, with geolocation and photos.",
        "Allow residents to track the processing of their requests and complaints in real time through a dedicated app.",
        "Publish transparently the deadlines and schedules for on-site interventions by municipal technical teams.",
        "Create a direct digital communication channel with the president of the communal council and members of the municipal bureau.",
        "Provide a participatory platform where residents can submit proposals and initiatives to improve their neighborhoods and have new ideas heard, whatever the scale of their contribution.",
        "Provide a transparent public dashboard showing the progress of municipal achievements and projects in figures.",
        "Reinforce staffing at document-issuing counters and administrative services during peak periods and busy seasons.",
        "Establish a permanent municipal monitoring unit and a unit for crisis and emergency management.",
        "Set up a rapid notification system to inform residents about updates, water outages and roadworks."
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
      fr: "Participation démocratique",
      ar: "المشاركة الديمقراطية",
      en: "Democratic participation"
    },
    subtitle: {
      fr: "La confiance mutuelle entre les citoyens et leurs représentants se construit par la transparence, l’intégrité et un travail constant.",
      ar: "الثقة المتبادلة بين المواطن وممثليه تُبنى بالشفافية والنزاهة والعمل الدؤوب.",
      en: "Mutual trust between residents and their representatives is built through transparency, integrity and diligent work."
    },
    tag: {
      fr: "Gouvernance et transparence",
      ar: "الحوكمة والشفافية والمشاركة المواطنة",
      en: "Governance and transparency"
    },
    items: {
      fr: [
        "Publication intégrale et claire de tous les éléments du programme électoral et des engagements, à la connaissance de tous sans exception.",
        "Publication, à la fin de chaque année, d’un rapport annuel détaillé et public sur les réalisations, le budget et les recettes.",
        "Organisation régulière de rencontres citoyennes mensuelles ouvertes dans tous les quartiers de la commune.",
        "Organisation de consultations publiques et de sondages auprès des habitants avant le lancement des grands projets d’aménagement urbain.",
        "Participation effective des comités de quartier, des associations actives et des jeunes aux décisions majeures de la commune."
      ],
      ar: [
        "نشر كامل بنود البرنامج الانتخابي والتعهدات بوضوح للجميع دون استثناء.",
        "نشر تقرير سنوي مفصل ومعلن عن الإنجازات والميزانية والمداخيل نهاية كل عام.",
        "تنظيم لقاءات شعبية شهرية مفتوحة مع المواطنين دورياً في كل أحياء البلدية.",
        "استشارات عامة واستطلاعات رأي للسكان قبل إطلاق المشاريع الحضرية الكبرى.",
        "إشراك فعّال للجان الأحياء، الجمعيات الفاعلة، والشباب في القرارات المصيرية للبلدية."
      ],
      en: [
        "Publish all parts of the electoral program and all commitments clearly and in full, making them accessible to everyone without exception.",
        "Publish a detailed public annual report on achievements, the budget and revenues at the end of each year.",
        "Hold regular monthly public meetings with residents in every neighborhood of the municipality.",
        "Conduct public consultations and resident surveys before launching major urban development projects.",
        "Ensure the active involvement of neighborhood committees, community associations and young people in the municipality’s major decisions."
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

export const defaultCouncilCandidates: import('../types').CouncilCandidate[] = []; /* Removed fictional demo candidates: only submitted and approved Supabase profiles are displayed. */
/*
  {
    id: "cc1",
    name: "Dr. Amine Benali",
    photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
    expertise: "Médecin Spécialiste & Expert en Santé Publique",
    role: "Candidat - Liste RND Ain El Turck",
    commission: "Commission Santé, Hygiène & Affaires Sociales",
    bio: "Praticien réputé à Oran et Ain El Turck, engagé pour la modernisation des centres de soins de proximité, les urgences pédiatriques et la prévention sanitaire sur nos plages.",
    order: 1,
    email: "dr.benali@rnd-ainturck.dz",
    phone: "+213 550 12 34 56"
  },
  {
    id: "cc2",
    name: "Mme. Samira Cherif",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    expertise: "Architecte Urbaniste & Ingénieur d'État",
    role: "Candidate - Liste RND Ain El Turck",
    commission: "Commission Urbanisme, Voirie & Aménagement Côtier",
    bio: "Spécialiste de la régénération urbaine littorale et de l'aménagement des corniches côtières, artisane du projet de la 2e voie de désengorgement d'Ain El Turck.",
    order: 2,
    email: "s.cherif@rnd-ainturck.dz",
    phone: "+213 661 98 76 54"
  },
  {
    id: "cc3",
    name: "Karim Mansouri",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    expertise: "Expert en Économie Touristique & Hôtellerie Balnéaire",
    role: "Candidat - Liste RND Ain El Turck",
    commission: "Commission Tourisme, Artisanat & Développement Économique",
    bio: "Consultant chevronné dans l'industrie touristique, promoteur d'un tourisme familial éco-responsable 12 mois sur 12 à Clairefontaine, Trouville et Cap Falcon.",
    order: 3,
    email: "k.mansouri@rnd-ainturck.dz",
    phone: "+213 770 45 67 89"
  },
  {
    id: "cc4",
    name: "Yassine Daoudi",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    expertise: "Ingénieur Télécom & Transformation Numérique",
    role: "Candidat - Liste RND Ain El Turck",
    commission: "Commission Numérique, Modernisation de l'APC & Jeunesse",
    bio: "Pionnier de la numérisation des services municipaux, porteur de la guichet unique dématérialisé pour les actes d'état-civil et le portail citoyen.",
    order: 4,
    email: "y.daoudi@rnd-ainturck.dz",
    phone: "+213 555 33 22 11"
  }
];
*/
export const defaultCampaignSettings: import('../types').CampaignSettings = {
  recipientEmail: "contact@rnd-ainturck.dz",
  secondaryEmail: "secretariat.rnd.aet@gmail.com",
  contactPhone: "+213 41 33 55 77",
  officeAddress: "Bureau Communal RND, Boulevard de la Corniche, Aïn El Turck, Oran",
  sloganText: "Ensemble pour un Aïn El Turck moderne, prospère et solidaire"
};

export const officialCampaignPosters: CampaignPoster[] = [
  {
    id: "poster-nouvelle-dynamique",
    title: {
      fr: "J-10 : Lancement de la Campagne",
      ar: "العد التنازلي (J-10): انطلاق الحملة الرسمية",
      en: "D-10: Official Campaign Launch"
    },
    subtitle: {
      fr: "Ensemble pour une nouvelle dynamique • Aïn El Turck 2026",
      ar: "معاً من أجل ديناميكية جديدة • عين الترك 2026",
      en: "Together for a new dynamic • Ain El Turck 2026"
    },
    tag: {
      fr: "J-10 Lancement",
      ar: "انطلاق الحملة",
      en: "Campaign Launch"
    },
    src: "assets/images/1000011155.png",
    dateOrTheme: {
      fr: "Dimanche 18 Octobre • 18h00 - 21h00",
      ar: "الأحد 18 أكتوبر • 18:00 - 21:00",
      en: "Sunday Oct 18 • 18:00 - 21:00"
    },
    location: {
      fr: "Salle Omnisports Communale, Aïn El Turck",
      ar: "القاعة متعددة الرياضات، عين الترك",
      en: "Ain El Turck Sports Complex"
    }
  },
  {
    id: "poster-rencontre-citoyenne",
    title: {
      fr: "Grande Rencontre Citoyenne & Débat",
      ar: "لقاء شعبي تشاركي حاشد مع المواطنين",
      en: "Major Citizen Town Hall & Debate"
    },
    subtitle: {
      fr: "Une nouvelle dynamique pour Aïn El Turck • Proximité & Innovation",
      ar: "ديناميكية جديدة لعين الترك • القرب والابتكار والتنمية المحلية",
      en: "A new dynamic for Ain El Turck • Proximity & Innovation"
    },
    tag: {
      fr: "Rencontre Citoyenne",
      ar: "لقاء شعبي",
      en: "Citizen Meetup"
    },
    src: "assets/images/1000011156.png",
    dateOrTheme: {
      fr: "Le 15 Décembre à 18h00",
      ar: "15 ديسمبر على الساعة 18:00",
      en: "December 15 at 18:00"
    },
    location: {
      fr: "Salle APC, Aïn El Turck",
      ar: "قاعة المجلس الشعبي البلدي APC، عين الترك",
      en: "Ain El Turck Town Hall (Salle APC)"
    }
  },
  {
    id: "poster-commune-forte",
    title: {
      fr: "Commune Forte et Moderne",
      ar: "بلدية قوية وعصرية لجميع السكان",
      en: "Strong and Modern Communality"
    },
    subtitle: {
      fr: "Agir aujourd'hui, construire demain • Économie, Transports, Cadre de vie",
      ar: "نعمل اليوم لنبني الغد • التنمية الاقتصادية والتجارة والتوظيف والنقل وجودة الحياة",
      en: "Act today, build tomorrow • Economy, Transit & Quality of Life"
    },
    tag: {
      fr: "Vision 2026",
      ar: "رؤية 2026",
      en: "Vision 2026"
    },
    src: "assets/images/1000011157.png",
    dateOrTheme: {
      fr: "5 Piliers d'Avenir",
      ar: "5 محاور استراتيجية",
      en: "5 Strategic Pillars"
    },
    location: {
      fr: "Aïn El Turck mérite le meilleur",
      ar: "عين الترك تستحق الأفضل دائماً",
      en: "Ain El Turck deserves the best"
    }
  },
  {
    id: "poster-agissons-ensemble",
    title: {
      fr: "Agissons Ensemble pour Aïn El Tûrck",
      ar: "معاً نعمل من أجل عين الترك",
      en: "Let's Act Together for Ain El Turck"
    },
    subtitle: {
      fr: "Notre commune, notre avenir ! Rejoignez le mouvement citoyen",
      ar: "بلديتنا، مستقبلنا ! انضموا إلى المبادرة التشاركية",
      en: "Our town, our future! Join the citizen movement"
    },
    tag: {
      fr: "Mouvement Citoyen",
      ar: "مبادرة تشاركية",
      en: "Citizen Movement"
    },
    src: "assets/images/1000011158.png",
    dateOrTheme: {
      fr: "Adhérez • Participez • Agissons",
      ar: "انخرطوا • شاركوا • لنعمل معاً",
      en: "Join • Participate • Act"
    },
    location: {
      fr: "Élections Communales 2026",
      ar: "انتخابات المجالس البلدية 2026",
      en: "Communal Elections 2026"
    }
  }
];

