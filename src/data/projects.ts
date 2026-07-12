import type { Project } from './types'

export const projects: Project[] = [
  {
    index: '01',
    title: 'Aide à la décision clinique',
    context: 'Coding Week · Centrale Casablanca',
    period: '2026',
    tagline:
      "Un pipeline complet d’aide au diagnostic d’appendicite pédiatrique, conçu pour rester compréhensible jusque dans la décision du modèle.",
    highlights: [
      'Nettoyage des données et comparaison rigoureuse de modèles de classification',
      'Analyse SHAP pour identifier les variables réellement discriminantes',
      'Interface Flask et tests automatisés sur les étapes critiques du pipeline',
    ],
    stack: ['Python', 'scikit-learn', 'SHAP', 'Flask', 'Pytest'],
    links: {
      code: 'https://github.com/Rudolf-Staline/Coding-week-project',
      demo: null,
    },
    featured: true,
  },
  {
    index: '02',
    title: 'Feux rouges intelligents',
    context: 'Learning by Doing · Centrale Casablanca',
    period: '2025 — 2026',
    tagline:
      'Une maquette de carrefour qui adapte les phases au trafic observé, sans sacrifier les contraintes de sécurité entre voies.',
    highlights: [
      'Estimation des flux par vision avec YOLOv8 et segmentation par K-Means',
      'Logique de décision fondée sur les combinaisons de voies compatibles',
      'Asservissement de la maquette physique avec Raspberry Pi',
    ],
    stack: ['YOLOv8', 'Computer Vision', 'K-Means', 'Raspberry Pi', 'Python'],
    links: { code: null, demo: null },
    status: 'Projet académique',
  },
  {
    index: '03',
    title: 'Plateforme d’analyse Forex',
    context: 'Projet personnel',
    period: '2026',
    tagline:
      'Une base Python modulaire pour tester des hypothèses de marché sans réécrire l’architecture à chaque nouvelle stratégie.',
    highlights: [
      'Séparation nette des responsabilités : données, broker, watchlist et signaux',
      'Moteur de backtesting pour comparer les stratégies sur une base commune',
      'Architecture extensible : une nouvelle logique s’ajoute sans casser le noyau',
    ],
    stack: ['Python', 'Pandas', 'Backtesting', 'Architecture logicielle'],
    links: {
      code: 'https://github.com/Rudolf-Staline/forex-supervised-scanner',
      demo: null,
    },
  },
  {
    index: '04',
    title: 'Clarté · journal Android privé',
    context: 'Projet personnel',
    period: '2026',
    tagline:
      'Une application d’introspection local-first où la confidentialité n’est pas un texte juridique, mais un comportement visible du produit.',
    highlights: [
      'Application native Kotlin et Jetpack Compose avec stockage local prioritaire',
      'Synchronisation, sauvegarde et chiffrement conçus sans retour silencieux au clair',
      'Refonte de l’onboarding, du centre de confidentialité et des erreurs utilisateur',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase', 'AES-GCM'],
    links: {
      code: 'https://github.com/Rudolf-Staline/Clarte',
      demo: null,
    },
  },
  {
    index: '05',
    title: 'Propagation de solitons',
    context: 'Formation expérimentale · Centrale Casablanca',
    period: '2026',
    tagline:
      'Une étude croisée de la propagation non linéaire, de la ligne électrique réelle jusqu’aux modèles numériques de type Sine-Gordon.',
    highlights: [
      'Montage d’une ligne non linéaire et acquisitions cellule par cellule à l’oscilloscope',
      'Simulation LTspice d’une chaîne de 20 cellules et traitement Python des signaux',
      'Comparaison des approches électrique, hydraulique et mécanique',
    ],
    stack: ['Python', 'LTspice', 'Traitement du signal', 'Simulation numérique', 'Instrumentation'],
    links: { code: null, demo: null },
    status: 'Projet expérimental',
  },
]
