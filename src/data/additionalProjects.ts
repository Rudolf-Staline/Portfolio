// Descriptions checked against each public repository's README and implementation.
export const additionalProjects = [
  {
    id: 'churn-dashboard', title: 'Churn Dashboard', group: 'Machine learning',
    context: 'Projet personnel · Prédiction et explicabilité', period: 'Prototype',
    summary: 'Passer d’un modèle de départ client à une API de prédiction et un tableau de bord explicatif.',
    result: 'Une chaîne d’entraînement, une API FastAPI et une interface React présentant le risque estimé et les facteurs associés.',
    method: 'Comparaison de régression logistique, Random Forest et Gradient Boosting, avec sélection par ROC-AUC, rappel puis F1.',
    paragraphs: [
      'Le projet transforme un fichier de données clients en un outil de scoring. Le pipeline prépare les variables, compare les modèles et sauvegarde les artefacts nécessaires à l’inférence.',
      'Une API expose la prédiction individuelle et par lot. Pour chaque client, elle renvoie une probabilité de départ, un niveau de risque et cinq facteurs locaux approximatifs ; l’interface rend ces sorties consultables.',
    ],
    stack: ['Python', 'scikit-learn', 'FastAPI', 'React', 'TypeScript'],
    code: 'https://github.com/Rudolf-Staline/explainable-churn-ml-dashboard',
    note: 'Les données fournies sont synthétiques et servent à valider le fonctionnement. Les contributions sont des approximations, pas des valeurs SHAP ni des explications causales.',
  },
  {
    id: 'biohub', title: 'BioHub Cell Tracker', group: 'Expérimentation',
    context: 'Kaggle · Suivi cellulaire', period: 'Baseline V0',
    summary: 'Suivre des cellules dans des volumes 3D au fil du temps et vérifier la cohérence de leurs trajectoires.',
    result: 'Une chaîne reproductible de lecture Zarr, détection, association temporelle et export de soumission audité.',
    method: 'Détection multi-échelle par Laplacien de Gauss, appariement hongrois en unités physiques et hypothèses de division cellulaire.',
    paragraphs: [
      'Cette première version prépare une chaîne de suivi cellulaire pour la compétition Biohub. Elle lit des volumes 3D+t au format Zarr et détecte les centres des cellules à plusieurs échelles.',
      'Les détections sont reliées entre images successives par un algorithme d’affectation. Le pipeline propose aussi des divisions d’une cellule en deux et contrôle les invariants du graphe avant de produire le fichier de soumission.',
    ],
    stack: ['Python', 'NumPy', 'SciPy', 'Zarr', 'pandas'],
    code: 'https://github.com/Rudolf-Staline/biohub-cell-tracker',
    note: 'Baseline technique V0 : le détecteur appris et le modèle temporel font partie des étapes suivantes. Aucun classement n’est revendiqué pour cette version.',
  },
]
