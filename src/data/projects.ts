import type { Project } from './types'

/**
 * Official project list (source of truth = CV).
 * Repo mappings confirmed by Rudolf:
 *   01 → Coding-week-project
 *   02 → projet en cours (pas de repo public encore) — TODO lien
 *   03 → forex-supervised-scanner
 *   04 → Clarte
 *   05 → Solitons : aucun repo trouvé sur le compte — slot réservé, contenu à venir.
 * Demos: aucune confirmée pour l'instant — TODO à confirmer par Rudolf.
 */
export const projects: Project[] = [
  {
    index: '01',
    title: 'Aide à la décision clinique',
    context: 'Coding Week · Centrale Casablanca',
    period: '2026',
    tagline:
      "Pipeline d'aide au diagnostic d'appendicite pédiatrique — données, modèle, interface et tests livrés dans la semaine.",
    highlights: [
      'Nettoyage des données et comparaison de modèles de classification supervisée',
      'Identification des variables discriminantes via SHAP pour garder la décision auditable',
      'Interface Flask + tests automatisés sur les étapes critiques du pipeline',
    ],
    stack: ['Python', 'scikit-learn', 'SHAP', 'Flask', 'Pytest'],
    links: {
      code: 'https://github.com/Rudolf-Staline/Coding-week-project',
      demo: null, // TODO: à confirmer par Rudolf
    },
    featured: true,
  },
  {
    index: '02',
    title: 'Feux rouges intelligents',
    context: 'Learning by Doing · Centrale Casablanca',
    period: '2025 — 2026',
    tagline:
      'Carrefour intelligent — phases adaptées au trafic réel, sans jamais violer les règles de sécurité entre voies.',
    highlights: [
      'Détection des flux par vision (YOLOv8) et clustering K-Means',
      'Logique de décision sur les combinaisons de voies autorisées',
      "Asservissement d'une maquette physique via Raspberry Pi",
    ],
    stack: ['YOLOv8', 'Computer Vision', 'K-Means', 'Raspberry Pi', 'Python'],
    links: {
      code: null, // Projet en cours — TODO: lien à fournir par Rudolf
      demo: null,
    },
    status: 'Projet en cours',
  },
  {
    index: '03',
    title: "Plateforme d'analyse Forex",
    context: 'Projet personnel',
    period: '2026',
    tagline:
      "Base Python pour tester des stratégies de marché sans réécrire l'architecture à chaque hypothèse.",
    highlights: [
      'Séparation stricte provider / broker / watchlist — données, exécution et suivi isolés',
      'Module de backtesting modulaire pour comparer les signaux',
      "Architecture évolutive : ajout d'une stratégie sans toucher au reste du code",
    ],
    stack: ['Python', 'Pandas', 'Backtesting', 'Architecture logicielle'],
    links: {
      code: 'https://github.com/Rudolf-Staline/forex-supervised-scanner',
      demo: null, // TODO: à confirmer par Rudolf
    },
  },
  {
    index: '04',
    title: "Clarté · application Android d'introspection",
    context: 'Projet personnel',
    period: '2026',
    tagline:
      'Application local-first, où chaque choix de confidentialité est explicite côté utilisateur.',
    highlights: [
      'Interface Kotlin / Jetpack Compose avec logique local-first',
      'Sauvegarde et récupération fiabilisées, sans serveur tiers',
      "Refonte de l'onboarding, des messages d'erreur et du centre de confidentialité",
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Local-first', 'UX'],
    links: {
      code: 'https://github.com/Rudolf-Staline/Clarte',
      demo: null, // n/a — application mobile
    },
  },
  {
    // Projet réel — contenu pas encore fourni par Rudolf. NE PAS inventer.
    // Slot réservé dans la grille ; remplir les champs ci-dessous quand
    // Rudolf fournit le texte, puis retirer `placeholder: true`.
    index: '05',
    title: 'Solitons',
    context: 'Projet expérimental', // TODO: contexte exact à confirmer par Rudolf
    period: '', // TODO: dates à confirmer par Rudolf
    tagline: '', // TODO: une phrase — ce que le projet explore ou démontre
    highlights: [], // TODO: 2–3 bullets à fournir par Rudolf
    stack: [], // TODO: ex. Python · NumPy · SciPy · simulation numérique
    links: {
      code: null, // TODO: repo à confirmer (peut ne pas exister encore)
      demo: null,
    },
    placeholder: true,
  },
]
