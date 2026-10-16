/** Section copy, kept separate from layout and navigation. */
export const editorial = {
  notebook: 'Chaque projet renvoie vers son code, ses captures et ses résultats lorsqu’ils sont publics.',
  skillsIntro: 'Python et TypeScript sont les principaux langages utilisés. Le reste de la pile dépend du projet : LightGBM ou PyTorch pour les modèles, React ou Flask pour les interfaces, Raspberry Pi et LTspice pour le matériel.',
  skillContexts: [
    'Python pour les moteurs de calcul et les expériences, TypeScript pour les interfaces. SQL, Kotlin et C/C++ complètent selon les projets.',
    'React et Vite pour l’interface de RiskSim, où l’on modifie les hypothèses et compare des scénarios. Flask pour PediAppend, qui affiche une prédiction avec ses explications. BaseKit est une bibliothèque de composants d’interface publiée sur npm.',
    'scikit-learn et LightGBM pour les modèles tabulaires, PyTorch pour les réseaux de neurones et l’audio, YOLOv8 pour la vision. Optuna règle les modèles, SHAP explique leurs prédictions.',
    'Git pour l’historique du code, des tests automatisés pour les traitements (393 tests sur AutoML), LaTeX pour la rédaction. Un Raspberry Pi pilote la maquette de carrefour ; LTspice simule les montages de physique.',
  ],
  competitionIntro: [
    'Sur Kaggle et Zindi, le sujet est imposé et le classement est public. Chaque participation m’a demandé de choisir quels indices extraire des données, puis de vérifier qu’un progrès local tenait sur des observations inédites.',
    'Mes sujets vont de la transformation de grilles à la reconnaissance vocale, en passant par l’imagerie satellite et la finance. J’y ai obtenu trois médailles de bronze, une 2e place sur 77, une 4e place sur 262 et une 18e place sur 628.',
  ],
  competitionHeading: 'Trois médailles de bronze et deux places dans le top 5.',
  competitionStudiesIntro: 'Cinq participations, cinq problèmes différents. Pour chacune : le défi, la démarche et le résultat.',
  projectsIntro: 'Une simulation de risques développée en entreprise, un pipeline AutoML, un prototype clinique explicable, une maquette de carrefour pilotée par caméra : des outils conçus pour être utilisés.',
  journeyIntro: 'Je viens du Bénin. J’ai étudié l’informatique et les sciences à l’IMSP avant d’intégrer en 2025 le cycle ingénieur généraliste de Centrale Casablanca.',
  educationDescriptions: [
    'Un cursus généraliste que je prolonge par la data et l’IA appliquée : simulation, traitement de données, expérimentation sur des systèmes physiques. Mes projets et mes compétitions de machine learning avancent en parallèle.',
    'La licence en TIC constitue le socle informatique de mon parcours, suivie avant mon arrivée à Centrale Casablanca.',
    'Une préparation scientifique en mathématiques, physique et chimie, menée à l’IMSP avant le cycle ingénieur.',
    'Baccalauréat en mathématiques et sciences technologiques, obtenu au Bénin avant mon entrée à l’IMSP.',
  ],
  contact: [
    'Un stage, une collaboration, un projet de données ou une question sur l’un de mes travaux ? Écrivez-moi.',
    'Mon GitHub rassemble les dépôts publics et mon CV résume mon parcours.',
  ],
} as const
