import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:rnd_campaign_app/core/services/translation_service.dart';

class ProgramPage extends StatelessWidget {
  const ProgramPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(TranslationService.t('programTitle')),
        backgroundColor: const Color(0xFF0a1628),
        foregroundColor: Colors.white,
      ),
      backgroundColor: const Color(0xFF0a1628),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _SloganCard(),
          const SizedBox(height: 16),
          _PillarCard(
            number: '01',
            icon: '💼',
            title: 'Développement économique, commerce et emploi',
            subtitle: 'Notre priorité est de transformer Aïn El Turck en une commune créatrice de richesse.',
            accentColor: const Color(0xFF00d4ff),
            items: const [
              "L'ouverture d'une deuxième route reliant les deux extrémités de la commune",
              'La réalisation des raccordements nécessaires sur cette route',
              'La création d\'un nouveau corridor économique',
              'La valorisation des terrains le long de cette nouvelle voie',
              'La création d\'emplois directs et indirects',
              'La création d\'un marché quotidien à Trouville',
              'La création d\'un marché hebdomadaire de véhicules',
              "L'installation de kiosques commerciaux style californien",
              "Une base de données des commerces et associations",
              'Des rencontres régulières entre acteurs économiques',
            ],
            tag: 'Développement Économique',
          ),
          const SizedBox(height: 16),
          _PillarCard(
            number: '02',
            icon: '🚗',
            title: 'Mobilité, circulation et transports',
            subtitle: 'La mobilité est indispensable au développement économique.',
            accentColor: const Color(0xFFff006e),
            items: const [
              "L'ouverture de la deuxième route pour fluidifier la circulation",
              'La création de nouvelles lignes de transport en commun',
              'De nouvelles lignes de taxis pour les quartiers éloignés',
              'Une meilleure desserte des quartiers',
              'Une meilleure gestion des flux routiers en été',
              'Bâtir 6 ponts pour la déviation vers les Andalouses',
              'Stations de transport près de Trouville, Bouisseville, Bensmir',
            ],
            tag: 'Mobilité',
          ),
          const SizedBox(height: 16),
          _PillarCard(
            number: '03',
            icon: '🏖️',
            title: 'Tourisme, plages et attractivité',
            subtitle: 'Aïn El Turck doit devenir une référence nationale parmi les stations balnéaires.',
            accentColor: const Color(0xFFd4af37),
            items: const [
              'Accès aux plages avec murs de style ottoman',
              'Utilisation de mortiers teintés résistants à l\'humidité',
              'Passerelles et accès en bois style californien',
              'Brigades permanentes de nettoyage des plages',
              'Animations de sensibilisation',
              'Panneaux modernes de propreté et sécurité',
              'Développement des activités nautiques',
              'Soutien aux clubs et associations sportifs',
              'Plateforme numérique pour citoyens et touristes',
            ],
            tag: 'Tourisme',
          ),
          const SizedBox(height: 16),
          _PillarCard(
            number: '04',
            icon: '🌳',
            title: 'Environnement, espaces verts et cadre de vie',
            subtitle: 'Nous voulons une commune plus verte, plus agréable et plus durable.',
            accentColor: const Color(0xFF00A651),
            items: const [
              "La création d'une pépinière communale",
              'La plantation de 10 000 arbres adaptés au climat',
              'La protection stricte du patrimoine arboricole',
              "L'interdiction de couper les arbres hors cadre légal",
              'Fabrication locale des aires de jeux pour parcs',
            ],
            tag: 'Environnement',
          ),
          const SizedBox(height: 16),
          _PillarCard(
            number: '05',
            icon: '📱',
            title: 'Une commune numérique et une administration moderne',
            subtitle: 'Le citoyen doit pouvoir communiquer facilement avec sa commune.',
            accentColor: const Color(0xFF00d4ff),
            items: const [
              'Signaler les problèmes avec géolocalisation',
              'Signaler les accidents',
              'Identifier les points noirs',
              'Suivi en temps réel des demandes',
              'Contacter directement le maire',
              'Envoyer des suggestions et propositions',
              'Suivre les réalisations de la commune',
              'Renforcement des guichets état civil',
              'Création d\'une cellule de veille et de crise',
            ],
            tag: 'Numérique',
          ),
          const SizedBox(height: 16),
          _PillarCard(
            number: '06',
            icon: '⚖️',
            title: 'Gouvernance, transparence et participation citoyenne',
            subtitle: 'La confiance se construit par la transparence.',
            accentColor: const Color(0xFFd4af37),
            items: const [
              "Publier l'intégralité de notre programme",
              'Publier un bilan annuel des réalisations',
              'Rencontres citoyennes mensuelles ouvertes à tous',
              'Recueillir les propositions via l\'application',
              'Associer les habitants aux décisions',
            ],
            tag: 'Gouvernance',
          ),
          const SizedBox(height: 16),
          _EngagementSection(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }
}

class _SloganCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x330047AB), Color(0x3300A651)],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          const Text('💎', style: TextStyle(fontSize: 40)),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('slogan'),
            textAlign: TextAlign.center,
            style: GoogleFonts.roboto(
              fontSize: 16,
              fontStyle: FontStyle.italic,
              color: Colors.white.withValues(alpha: 0.9),
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}

class _PillarCard extends StatelessWidget {
  final String number;
  final String icon;
  final String title;
  final String subtitle;
  final Color accentColor;
  final List<String> items;
  final String tag;

  const _PillarCard({
    required this.number,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.accentColor,
    required this.items,
    required this.tag,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.white.withValues(alpha: 0.05),
            Colors.white.withValues(alpha: 0.02),
          ],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(icon, style: const TextStyle(fontSize: 36)),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: GoogleFonts.roboto(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: accentColor,
            ),
          ),
          const SizedBox(height: 12),
          ...items.map(
            (item) => Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('• ', style: TextStyle(color: accentColor)),
                  Expanded(
                    child: Text(
                      item,
                      style: TextStyle(
                        fontSize: 13,
                        color: Colors.white.withValues(alpha: 0.6),
                        height: 1.4,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: accentColor.withValues(alpha: 0.1),
              border: Border.all(color: accentColor.withValues(alpha: 0.3)),
              borderRadius: BorderRadius.circular(50),
            ),
            child: Text(
              tag,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: accentColor,
                letterSpacing: 1,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _EngagementSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0x330047AB), Color(0x3300A651), Color(0x19C8102E)],
        ),
        border: Border.all(color: Colors.white.withValues(alpha: 0.15)),
        borderRadius: BorderRadius.circular(24),
      ),
      child: Column(
        children: [
          Text(
            TranslationService.t('engagement'),
            style: GoogleFonts.roboto(
              fontSize: 24,
              fontWeight: FontWeight.w900,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('engagementText1'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 15,
              height: 1.7,
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 12),
          Text(
            TranslationService.t('engagementText2'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              height: 1.7,
              color: Colors.white.withValues(alpha: 0.85),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            TranslationService.t('engagementText3'),
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: const Color(0xFF00d4ff),
              fontStyle: FontStyle.italic,
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFF0047AB), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFF00A651), borderRadius: BorderRadius.circular(2))),
              const SizedBox(width: 8),
              Container(width: 32, height: 4, decoration: BoxDecoration(color: const Color(0xFFC8102E), borderRadius: BorderRadius.circular(2))),
            ],
          ),
        ],
      ),
    );
  }
}
