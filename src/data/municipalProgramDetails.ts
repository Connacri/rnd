export interface MunicipalProgramItem {
  id: string;
  icon: string;
  color: string;
  title: { ar: string; fr: string; en: string };
  summary: { ar: string; fr: string; en: string };
  items: Array<{ ar: string; fr: string; en: string }>;
}

export const municipalProgramIntro = {
  ar: {
    title: 'تنمية • رفاهية • جودة حياة',
    subtitle: 'معاً من أجل عين الترك أفضل',
    closing: 'عين الترك تجمعنا… وخيرها مسؤوليتنا'
  },
  fr: {
    title: 'Développement • Bien-être • Qualité de vie',
    subtitle: 'Ensemble pour une meilleure Aïn El Turck',
    closing: 'Aïn El Turck nous rassemble… son avenir est notre responsabilité'
  },
  en: {
    title: 'Development • Well-being • Quality of life',
    subtitle: 'Together for a better Ain El Turck',
    closing: 'Ain El Turck brings us together… its future is our responsibility'
  }
};

export const municipalProgramDetails: MunicipalProgramItem[] = [
  {
    id: 'infrastructure',
    icon: '🛣️',
    color: '#0f766e',
    title: {
      ar: 'البنية التحتية والخدمات العامة',
      fr: 'Infrastructures et services publics',
      en: 'Infrastructure and public services'
    },
    summary: {
      ar: 'تحسين المرافق الأساسية والارتقاء بجودة الخدمات اليومية.',
      fr: 'Améliorer les équipements essentiels et la qualité des services du quotidien.',
      en: 'Improve essential infrastructure and the quality of everyday public services.'
    },
    items: [
      { ar: 'تطوير الطرق والأرصفة', fr: 'Développer et rénover les routes et les trottoirs.', en: 'Upgrade roads and sidewalks.' },
      { ar: 'تحسين شبكة الصرف الصحي', fr: 'Améliorer le réseau d’assainissement.', en: 'Improve the sanitation network.' },
      { ar: 'توفير خدمات عمومية ذات جودة', fr: 'Améliorer la qualité et l’accessibilité des services publics.', en: 'Provide accessible, high-quality public services.' }
    ]
  },
  {
    id: 'economy',
    icon: '📈',
    color: '#0284c7',
    title: {
      ar: 'التنمية المحلية والاقتصادية',
      fr: 'Développement local et économique',
      en: 'Local and economic development'
    },
    summary: {
      ar: 'دعم المبادرات المحلية والاستثمار وخلق فرص العمل.',
      fr: 'Soutenir les initiatives locales, l’investissement et la création d’emplois.',
      en: 'Support local initiatives, investment and job creation.'
    },
    items: [
      { ar: 'دعم المشاريع المحلية', fr: 'Accompagner les projets et initiatives économiques locaux.', en: 'Support local business and community projects.' },
      { ar: 'تشجيع الاستثمار والتجارة', fr: 'Encourager l’investissement et dynamiser le commerce.', en: 'Encourage investment and strengthen local trade.' },
      { ar: 'خلق فرص عمل جديدة', fr: 'Favoriser la création de nouvelles opportunités d’emploi.', en: 'Create new employment opportunities.' },
      { ar: 'إعادة بعث نشاط تربية الأسماك البحرية في الأحواض', fr: 'Relancer l’activité d’élevage de poissons marins en bassins.', en: 'Revive marine fish farming in dedicated basins.' }
    ]
  },
  {
    id: 'environment',
    icon: '🌱',
    color: '#16a34a',
    title: {
      ar: 'البيئة وجودة الحياة',
      fr: 'Environnement et qualité de vie',
      en: 'Environment and quality of life'
    },
    summary: {
      ar: 'حماية المحيط وتحسين النظافة والمحافظة على المساحات الخضراء.',
      fr: 'Protéger le cadre de vie, renforcer la propreté et préserver les espaces verts.',
      en: 'Protect the local environment, improve cleanliness and preserve green spaces.'
    },
    items: [
      { ar: 'حماية البيئة والمساحات الخضراء', fr: 'Protéger l’environnement et les espaces verts.', en: 'Protect the environment and green spaces.' },
      { ar: 'تحسين النظافة والتسيير البيئي', fr: 'Améliorer la propreté et la gestion environnementale.', en: 'Improve cleanliness and environmental management.' },
      { ar: 'إعادة تأهيل ميناء الرسو بالمنطقة الرملية', fr: 'Réhabiliter le petit port / point de mouillage de la zone sablonneuse.', en: 'Rehabilitate the anchorage harbour in the sandy area.' }
    ]
  },
  {
    id: 'tourism',
    icon: '🏖️',
    color: '#d97706',
    title: {
      ar: 'السياحة والترفيه',
      fr: 'Tourisme et loisirs',
      en: 'Tourism and recreation'
    },
    summary: {
      ar: 'تثمين الشواطئ والمرافق وتنشيط الحياة الثقافية والسياحية.',
      fr: 'Valoriser les plages et les équipements, et faire vivre l’offre culturelle et touristique.',
      en: 'Enhance beaches and facilities while energizing cultural and tourist activities.'
    },
    items: [
      { ar: 'تطوير القطاع السياحي', fr: 'Développer le secteur touristique.', en: 'Develop the tourism sector.' },
      { ar: 'تهيئة الشواطئ والمرافق الترفيهية', fr: 'Aménager les plages et les espaces de loisirs.', en: 'Improve beaches and recreational facilities.' },
      { ar: 'تنشيط المهرجانات والفعاليات الثقافية', fr: 'Dynamiser les festivals et les manifestations culturelles.', en: 'Promote festivals and cultural events.' },
      { ar: 'استرجاع مسرح الهواء الطلق بتروفيل وتهيئته', fr: 'Remettre en service et aménager le théâtre en plein air de Trouville.', en: 'Restore and refurbish the Trouville open-air theatre.' }
    ]
  },
  {
    id: 'education',
    icon: '🎓',
    color: '#7c3aed',
    title: {
      ar: 'التعليم والشباب',
      fr: 'Éducation et jeunesse',
      en: 'Education and youth'
    },
    summary: {
      ar: 'تهيئة المؤسسات التربوية وفتح آفاق جديدة أمام الشباب.',
      fr: 'Améliorer les établissements scolaires et ouvrir de nouvelles perspectives aux jeunes.',
      en: 'Improve schools and create new opportunities for young people.'
    },
    items: [
      { ar: 'تحسين البنية التحتية للمدارس', fr: 'Améliorer les infrastructures et les équipements des écoles.', en: 'Improve school infrastructure and facilities.' },
      { ar: 'دعم الأنشطة الشبابية والرياضية', fr: 'Soutenir les activités destinées aux jeunes et les activités sportives.', en: 'Support youth activities and sports.' },
      { ar: 'توفير التكوين والتوجيه المهني', fr: 'Développer l’accès à la formation et à l’orientation professionnelles.', en: 'Provide vocational training and career guidance.' }
    ]
  },
  {
    id: 'health',
    icon: '❤️',
    color: '#e11d48',
    title: {
      ar: 'الصحة والتضامن الاجتماعي',
      fr: 'Santé et solidarité sociale',
      en: 'Health and social solidarity'
    },
    summary: {
      ar: 'تقوية الخدمات الصحية ومساندة الفئات الهشة وتعزيز التضامن.',
      fr: 'Renforcer les services de santé, accompagner les personnes vulnérables et développer la solidarité.',
      en: 'Strengthen healthcare, support vulnerable people and promote solidarity.'
    },
    items: [
      { ar: 'تقوية الخدمات الصحية', fr: 'Renforcer les services et la proximité des soins de santé.', en: 'Strengthen healthcare services and local access to care.' },
      { ar: 'دعم الفئات الهشة', fr: 'Accompagner les personnes et les familles en situation de vulnérabilité.', en: 'Support vulnerable individuals and families.' },
      { ar: 'تعزيز التضامن الاجتماعي', fr: 'Renforcer les actions et les réseaux de solidarité sociale.', en: 'Strengthen social solidarity initiatives and networks.' }
    ]
  }
];
