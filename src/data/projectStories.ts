/** Editorial descriptions grounded in the linked repositories and Rudolf’s project record. */
export type ProjectStory = {
  subtitle: string
  paragraphs: string[]
  method: string
  result: string
  note?: string
}
export const projectStories: Record<string, ProjectStory> = {
  automl: {
    subtitle: 'Du fichier CSV à une expérience que l’on peut reprendre et examiner.',
    paragraphs: [
      'Autonomous AutoML part d’un problème fréquent en machine learning tabulaire : obtenir un bon score est assez facile quand une colonne contient indirectement la réponse. J’ai voulu réunir la recherche de modèles et les vérifications qui permettent de comprendre comment ce score a été obtenu.',
      'L’outil analyse un fichier CSV, repère les variables suspectes, prépare la validation et lance une recherche sous budget avec Optuna. Les prétraitements sont ajustés à l’intérieur des folds. Les essais, leurs échecs et les décisions de sélection sont conservés ; une exécution interrompue peut reprendre à partir de son état enregistré.',
      'La sortie comprend le pipeline retenu, les prédictions et un rapport HTML autonome. La vérification des artefacts et la relecture des prédictions servent à contrôler que le modèle sauvegardé correspond bien à l’expérience présentée. Le projet est individuel, développé avec l’assistance de Codex à partir de mes spécifications.',
    ],
    method: 'Python, scikit-learn et Optuna pour les expériences ; SQLite pour leur suivi ; manifestes et empreintes de fichiers pour vérifier les artefacts.',
    result: 'Trois démonstrations couvrent la classification, la régression et une fuite de données synthétique. L’interface livrée est une CLI, accompagnée de rapports HTML.',
    note: 'Les vérifications sont internes au logiciel. Elles ne constituent pas une certification externe du modèle.',
  },
  risksim: {
    subtitle: 'Comprendre l’incertitude derrière un budget projet.',
    paragraphs: [
      'Comment déterminer une réserve budgétaire quand les coûts et les risques ne sont pas connus avec certitude ? C’est la question à laquelle répond RiskSim, développé pendant mon stage d’observation chez CHOUBEL, du 15 juillet au 28 août 2026.',
      'À partir d’un registre Excel, le moteur Python simule de nombreux scénarios. L’utilisateur choisit les distributions, renseigne les hypothèses et, si nécessaire, les corrélations entre les risques. Les résultats sont présentés sous forme de distributions, de percentiles et d’analyses de sensibilité, afin de comparer plusieurs niveaux de réserve.',
      'Mon travail a porté sur le moteur de calcul, puis sur son intégration dans une application. Après une première interface Streamlit, j’ai développé une interface React et TypeScript pour importer le registre, modifier les hypothèses, lancer le calcul et comparer les scénarios.',
      'La distribution Windows et la documentation ont complété ce travail. L’application fonctionne localement sur le poste utilisateur ; les échanges de registres passent par Excel. Une matrice de corrélation invalide est refusée, plutôt que corrigée sans que l’utilisateur sache ce qui a changé.',
    ],
    method: 'Simulation Monte Carlo vectorisée avec NumPy ; corrélations, percentiles, sensibilité de Spearman et diagnostics de convergence ; interface React reliée au moteur Python.',
    result: 'Une application locale distribuée sous Windows, avec import/export Excel, modification des hypothèses et comparaison des scénarios.',
    note: 'Les captures présentent la version S5 et son scénario de démonstration. Les montants affichés illustrent l’interface ; ils ne décrivent pas un dossier client.',
  },
  'financial-stress': {
    subtitle: 'Retrouver des signes de fragilité dans six mois de transactions.',
    paragraphs: [
      'Cette compétition Zindi consiste à prédire le stress financier à partir de données transactionnelles. Le travail ne se limite pas à choisir un classifieur : il faut représenter les montants et leur évolution dans le temps, tout en conservant les informations utiles des différents mois.',
      'J’ai construit et comparé plusieurs ensembles de variables autour d’un modèle LightGBM. Le dépôt conserve les paramètres, les importances et les résultats de validation de chaque expérience. Optuna intervient dans la recherche de réglages et la sélection des variables.',
      'Ma participation termine 4e sur 262. Les expériences publiques permettent de suivre une partie du travail : EXP005 utilise 257 variables et obtient une ROC AUC moyenne de 0,885 en validation croisée. Ce score local et le classement privé répondent à deux évaluations différentes.',
    ],
    method: 'Agrégats sur six mois, variables mensuelles, LightGBM, validation croisée et optimisation avec Optuna.',
    result: '4e sur 262 au classement privé. EXP005 : ROC AUC moyenne de 0,885 en validation croisée ; 0,883 sur le jeu de validation séparé.',
    note: 'Retirer douze variables dans EXP007 n’améliore pas la ROC AUC moyenne : 0,8849 contre 0,8851. Le modèle le plus petit n’est pas automatiquement le meilleur.',
  },
  geoai: {
    subtitle: 'Identifier des bassins quand une partie de l’année manque.',
    paragraphs: [
      'Les bassins aquacoles sont identifiés à partir de séries temporelles Sentinel-1 et Sentinel-2. Une ligne décrit un pixel au fil des mois : le problème traité dans le dépôt est une classification à partir de ces observations, et non le dessin de contours sur une photographie.',
      'La difficulté vient du décalage entre entraînement et test. Les données d’entraînement couvrent douze mois, alors que le test ne fournit que quatre à six mois radar consécutifs et peut comporter d’autres lacunes optiques. La validation doit donc reproduire ces absences pour être informative.',
      'Le protocole documenté porte sur 1 821 observations, avec cinq folds et trois répétitions. Il compare des modèles tabulaires à un GRU compact de 26 329 paramètres, sur les mêmes fenêtres temporelles, avec des analyses selon la disponibilité des capteurs.',
    ],
    method: 'Fenêtres temporelles, masques d’observation, arbres de gradient boosting et GRU ; préparation et normalisation à l’intérieur de chaque fold.',
    result: 'Médaille de bronze sur Zindi. Le dépôt public documente les phases de comparaison et le protocole de validation.',
    note: 'Les expériences publiées ne constituent pas, à elles seules, une reproduction de la soumission finale médaillée.',
  },
  waxal: {
    subtitle: 'Passer de l’enregistrement à une transcription, puis comprendre les erreurs.',
    paragraphs: [
      'Le challenge WAXAL porte sur la reconnaissance vocale en lingala, luganda et shona. Le pipeline prépare les enregistrements, entraîne un modèle de transcription et évalue les textes produits. Les erreurs sont étudiées par langue, plutôt que résumées par un seul score global.',
      'La séparation des locuteurs entre entraînement et validation fait partie du protocole. Le travail comprend une chaîne CTC avec un backend MMS configurable, ainsi que des mesures WER et CER pour distinguer les erreurs de mots et de caractères.',
      'Un audit de 4 253 prédictions historiques a retrouvé 118 sorties de repli. Cela a permis d’isoler un problème de fonctionnement de la chaîne, qui ne doit pas être confondu avec une mauvaise transcription. Les tests sur audio synthétique vérifient le parcours logiciel, pas la qualité du modèle sur la compétition.',
    ],
    method: 'Préparation audio, PyTorch, CTC, backend MMS, folds par locuteur et analyse des erreurs WER/CER.',
    result: 'Médaille de bronze sur Zindi ; audit des prédictions et vérifications de bout en bout de la chaîne de transcription.',
    note: 'L’audit historique et les tests synthétiques décrivent des vérifications distinctes du score final de compétition.',
  },
  '01': {
    subtitle: 'Comparer les modèles et rendre leurs prédictions lisibles.',
    paragraphs: [
      'PediAppend est un projet académique consacré à la classification de l’appendicite pédiatrique. Le jeu Regensburg réunit 782 patients et 53 variables brutes : observations cliniques, résultats biologiques et informations échographiques.',
      'Le projet réunit préparation des données, comparaison de SVM, Random Forest, LightGBM et CatBoost, puis analyse des prédictions avec SHAP. La comparaison accorde une attention particulière au rappel, parce qu’un faux négatif et un faux positif n’ont pas la même signification dans ce problème.',
      'Une application Flask permet de saisir les observations et d’examiner la prédiction accompagnée de ses explications. Les graphiques ci-contre sont de véritables exports conservés dans le dépôt : ils montrent l’importance des variables et les courbes d’évaluation du projet.',
    ],
    method: 'Nettoyage et encodage des données, comparaison de quatre familles de classifieurs, analyses SHAP et intégration Flask.',
    result: 'Un prototype académique avec interface web, graphiques d’évaluation et tests automatisés. Le code et les figures sont consultables sur GitHub.',
    note: 'Ce travail ne constitue pas une validation clinique et n’est pas présenté comme un outil utilisé en soins.',
  },
  '02': {
    subtitle: 'Faire réagir les feux à ce que la caméra observe.',
    paragraphs: [
      'L’objectif de ce projet académique est d’adapter les feux d’une maquette de carrefour au trafic observé. La vision estime les flux ; la logique de commande détermine ensuite quelles voies peuvent être ouvertes ensemble.',
      'YOLOv8 et K-Means interviennent dans l’estimation des flux. La commande prend en compte les combinaisons compatibles avant de piloter les feux sur Raspberry Pi. Le projet relie ainsi traitement d’image, décision et action sur un montage physique.',
      'L’animation représente cette chaîne de façon simplifiée : observation du trafic, choix d’une phase puis ouverture des voies correspondantes. Elle explique le principe de commande ; ce n’est pas un enregistrement de la maquette.',
    ],
    method: 'Vision par ordinateur avec YOLOv8, estimation des flux avec K-Means et pilotage de la maquette par Raspberry Pi.',
    result: 'Une maquette de carrefour associant estimation visuelle des flux et commande adaptative des feux.',
  },
  '03': {
    subtitle: 'Séparer les données, les signaux et leur évaluation.',
    paragraphs: [
      'Ce projet personnel est une application Python d’analyse Forex et de backtesting. L’objectif est de pouvoir examiner les données, calculer des indicateurs et comparer des règles de stratégie dans une architecture commune.',
      'Les modules distinguent les données de marché, les instruments suivis, les signaux et le moteur d’évaluation. Le dépôt comprend une interface Streamlit, un suivi SQLite et des rapports de sessions simulées. Les modes paper et démo permettent de tester le fonctionnement sans présenter ces essais comme des résultats de trading réel.',
      'Un point technique documenté concerne les pivots : un sommet ou un creux ne peut être utilisé qu’après sa confirmation. Employer les observations futures pour positionner rétrospectivement un signal fausserait le backtest. Le code comporte une vérification de cette cohérence temporelle.',
    ],
    method: 'Python, Pandas, Streamlit et SQLite ; modules de données, indicateurs, détection de configurations et backtesting.',
    result: 'Un outil local d’exploration et de simulation, avec rapports et code disponibles. Aucune rentabilité en conditions réelles n’est revendiquée.',
    note: 'Le graphique animé est une illustration du flux de données ; il ne représente ni un cours réel ni une performance de stratégie.',
  },
  '05': {
    subtitle: 'Suivre une impulsion dans une ligne électrique non linéaire.',
    paragraphs: [
      'Ce travail expérimental étudie la propagation de solitons sur une ligne électrique. Il met en regard les signaux mesurés à l’oscilloscope et une simulation numérique pour examiner la propagation d’une impulsion le long du montage.',
      'Les acquisitions sont réalisées cellule par cellule. Une chaîne de vingt cellules est simulée sous LTspice, puis les signaux sont traités en Python pour comparer leur évolution. Le travail aborde également les liens avec d’autres systèmes de propagation, notamment hydrauliques et mécaniques.',
    ],
    method: 'Montage électrique, mesures à l’oscilloscope, LTspice et traitement du signal en Python.',
    result: 'Une comparaison entre acquisitions expérimentales et simulation sur une chaîne de vingt cellules.',
    note: 'L’impulsion animée est un schéma de propagation. Elle n’est pas une trace mesurée ni une sortie LTspice.',
  },
}
