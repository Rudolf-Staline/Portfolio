/** Project pitches: the problem, the work and the documented outcome. */
export type ProjectStory = {
  subtitle: string
  paragraphs: string[]
  method: string
  result: string
  note?: string
}
export const projectStories: Record<string, ProjectStory> = {
  neurogolf: {
    subtitle: 'Retrouver la règle cachée dans des grilles de couleur, avec la plus petite solution possible.',
    paragraphs: [
      'NeuroGolf reprend le format du défi ARC-AGI : quelques grilles d’exemple montrent des cases colorées qui se déplacent, se copient ou se transforment, et la même règle doit s’appliquer à une grille inédite. Dans cette compétition Kaggle, la taille de la solution compte dans le score.',
      'La solution repose sur des graphes ONNX de logique pure, sans poids entraînables : chaque règle de transformation est encodée directement dans le graphe.',
      'Résultat : 220e sur 2 963 équipes, soit dans le top 7,4 %, avec une médaille de bronze. Cette participation porte sur le raisonnement visuel, tandis que les autres compétitions présentées ici concernent des données financières, satellitaires ou vocales.',
    ],
    method: 'Graphes ONNX de logique pure, sans poids entraînables, pour des transformations de grilles ARC-AGI sous contrainte de taille.',
    result: 'Médaille de bronze Kaggle · 220e sur 2 963 équipes · top 7,4 %.',
    note: 'Les grilles de la scène sont illustratives ; elles ne montrent pas une solution soumise.',
  },
  credit: {
    subtitle: 'Estimer le risque d’un crédit avant de l’accorder.',
    paragraphs: [
      'African Credit Scoring, sur Zindi, consiste à estimer le risque associé à une demande de crédit à partir des informations disponibles. La prédiction sert à éclairer une décision d’octroi.',
      'Cette participation s’est classée 2e sur 77 participants.',
    ],
    method: 'Modélisation du risque de crédit pour la compétition African Credit Scoring sur Zindi.',
    result: '2e sur 77 · Zindi.',
    note: 'Le code de cette participation n’est pas public.',
  },
  automl: {
    subtitle: 'Un pipeline AutoML qui détecte les fuites de données et garde la trace de chaque essai.',
    paragraphs: [
      'Autonomous AutoML est un outil en ligne de commande. Il prend un fichier CSV et une cible, entraîne des modèles de classification ou de régression, puis exporte le pipeline retenu, les prédictions et un rapport HTML autonome. Ce projet individuel a été réalisé pendant la Build Week.',
      'L’outil vise des scores crédibles. Les prétraitements sont ajustés dans chaque fold, de sorte que les données de validation n’influencent jamais l’entraînement, et il signale les variables qui copient la cible, les identifiants suspects et les informations qui n’existent qu’après le résultat. Optuna explore les modèles dans un budget fixé.',
      'Chaque essai, réussi ou non, est enregistré dans SQLite. Une expérience interrompue reprend où elle s’est arrêtée, et les fichiers exportés sont contrôlés par empreinte avant que les prédictions ne soient relues.',
      'Le projet compte 393 tests et trois démonstrations : classification, régression et détection d’une fuite de données synthétique. Codex a servi d’assistant au développement, à partir de spécifications définies pour le projet.',
    ],
    method: 'Python, scikit-learn et Optuna ; SQLite pour le suivi des essais ; empreintes de fichiers et relecture des prédictions pour contrôler les exports.',
    result: 'Une CLI pour fichiers CSV tabulaires, des expériences reprenables, un rapport HTML autonome et 393 tests.',
    note: 'Périmètre : données tabulaires au format CSV, sans interface web ni traitement d’images ou d’audio.',
  },
  risksim: {
    subtitle: 'Simuler le risque de dépassement de budget d’un projet et dimensionner la réserve.',
    paragraphs: [
      'RiskSim est un outil de simulation des coûts de projet, développé en binôme avec Daniel Awaga pendant le stage au service informatique de CHOUBEL CONSULTING à Casablanca, du 15 juillet au 28 août 2026. Il sert à évaluer le risque de dépasser un budget, notamment dans des études de faisabilité immobilière. Un registre peut contenir des risques rares mais coûteux, des aléas fréquents et des risques qui évoluent ensemble : la réserve à prévoir dépend de leur combinaison.',
      'À partir d’un registre Excel, le moteur Python simule de nombreux scénarios de coûts. L’utilisateur choisit les distributions, renseigne les corrélations entre risques, et obtient les percentiles P50, P80 et P90, la probabilité de dépasser le budget et le classement des risques qui pèsent le plus sur le résultat. Modifier une hypothèse et relancer le calcul montre tout de suite son effet.',
      'Daniel a porté le moteur de calcul. Ma contribution couvre le registre Excel, les visualisations des résultats, l’analyse de sensibilité, l’interface, ainsi que la distribution Windows et la documentation de prise en main. J’ai proposé de remplacer le prototype Streamlit par une interface React et TypeScript ; le tuteur a retenu cette proposition.',
      'Une règle de fonctionnement a compté : une matrice de corrélation invalide est refusée au lieu d’être corrigée en silence, pour que les hypothèses de l’utilisateur restent les siennes. Le périmètre porte sur les coûts ; la dimension des délais est reportée à une version suivante.',
    ],
    method: 'Simulation Monte Carlo (Python, NumPy) avec corrélations entre risques, percentiles et analyse de sensibilité ; interface React et TypeScript reliée au moteur.',
    result: 'Une application Windows qui fonctionne en local : import et export Excel, édition des hypothèses, simulation et comparaison de scénarios.',
    note: 'Les captures montrent la version S5 sur un scénario de démonstration. L’outil a été vérifié sur des cas synthétiques ; aucun dossier client réel n’a été utilisé.',
  },
  'financial-stress': {
    subtitle: '4e sur 262 en prédisant la fragilité financière à partir de six mois de transactions.',
    paragraphs: [
      'Dans le Financial Stress Prediction Challenge de Zindi, il faut prédire le stress financier d’un client à partir de six mois de transactions. Deux historiques peuvent avoir le même montant total et des trajectoires opposées : la façon de représenter ces trajectoires pèse autant que le choix du modèle.',
      'Le travail a porté sur la construction d’agrégats et de variables mensuelles autour d’un modèle LightGBM. Plusieurs préparations des données ont été comparées pour mesurer leur apport. Optuna a servi au réglage des modèles et à la sélection des variables.',
      'Le dépôt public garde les paramètres, les importances et les résultats de chaque expérience, y compris celles qui n’ont rien donné : dans EXP007, retirer 12 variables ramène le modèle à 245 variables sans changer la ROC AUC (0,8849 contre 0,8851).',
      'Classement final : 4e sur 262 sur les données privées. Dans l’expérience publique EXP005, 257 variables donnent une ROC AUC moyenne de 0,885 en validation croisée (écart-type 0,0076) et de 0,883 sur le jeu de validation séparé.',
    ],
    method: 'Variables mensuelles et agrégats sur six mois, LightGBM, sélection de variables et optimisation avec Optuna.',
    result: '4e sur 262 au classement privé. EXP005 : ROC AUC moyenne de 0,885 en validation croisée et de 0,883 sur le jeu de validation séparé.',
    note: 'Les scores d’EXP005 et d’EXP007 viennent d’expériences locales ; le classement mesure la participation sur les données privées de la compétition.',
  },
  geoai: {
    subtitle: 'Repérer des bassins aquacoles depuis l’espace, même quand des mois d’observation manquent.',
    paragraphs: [
      'Le GeoAI Aquaculture Pond Identification Challenge, sur Zindi, repose sur des séries Sentinel-1 (radar) et Sentinel-2 (optique) : chaque observation suit un pixel mois après mois. Les données d’entraînement couvrent douze mois ; au test, il n’y a que quatre à six mois radar consécutifs, avec des trous supplémentaires côté optique.',
      'La validation reproduit ces absences pour se rapprocher des conditions du test. Des modèles d’arbres de gradient boosting et un GRU compact de 26 329 paramètres sont comparés sur les mêmes fenêtres temporelles, en tenant compte des capteurs disponibles.',
      'Le protocole porte sur 1 821 observations, cinq folds et trois répétitions, avec la normalisation recalculée dans chaque fold. Les analyses détaillent les résultats selon les capteurs disponibles et la longueur de fenêtre.',
      'Cette participation a obtenu une médaille de bronze sur Zindi. Le dépôt public publie le protocole et les comparaisons entre modèles.',
    ],
    method: 'Fenêtres temporelles et masques d’observation ; comparaison de modèles de gradient boosting et d’un GRU, avec préparation des données dans chaque fold.',
    result: 'Médaille de bronze Zindi. Un protocole de comparaison sur 1 821 observations, en validation 5 folds × 3 répétitions.',
    note: 'Le dépôt documente le protocole et la comparaison des modèles ; la soumission finale médaillée n’y figure pas.',
  },
  waxal: {
    subtitle: 'Transcrire le lingala, le luganda et le shona, et mesurer les erreurs langue par langue.',
    paragraphs: [
      'La solution au Google WAXAL ASR Challenge, sur Zindi, réunit une chaîne complète de reconnaissance vocale en lingala, luganda et shona : préparation de l’audio, entraînement CTC sur un backend MMS-300M configurable, puis évaluation par langue. Un score moyen peut cacher une langue bien transcrite et une autre beaucoup plus fragile, d’où l’évaluation séparée de chaque langue.',
      'Les locuteurs sont séparés entre entraînement et validation, afin de tester le modèle sur des voix qu’il n’a jamais entendues. Les erreurs sont mesurées en WER et en CER, avec un bootstrap sur les scores.',
      'Un audit de la chaîne a retrouvé 118 sorties de repli parmi les 4 253 prédictions d’une soumission historique. Les isoler permet de distinguer un échec technique d’une vraie erreur de reconnaissance.',
      'Cette participation a obtenu une médaille de bronze sur Zindi. Des tests de bout en bout sur audio synthétique vérifient le parcours logiciel ; la qualité de transcription se mesure sur les enregistrements de la compétition.',
    ],
    method: 'Préparation audio, PyTorch, CTC et MMS ; validation par locuteur et analyse WER/CER par langue.',
    result: 'Médaille de bronze Zindi ; une chaîne de transcription multilingue et un audit portant sur 4 253 prédictions historiques.',
    note: 'L’audit historique et les tests synthétiques sont distincts de l’évaluation finale de la compétition.',
  },
  '01': {
    subtitle: 'Un classifieur d’appendicite pédiatrique qui montre ce qui motive chaque prédiction.',
    paragraphs: [
      'PediAppend est un projet de la Coding Week de Centrale Casablanca. À partir du jeu de données de Regensburg (782 patients et 53 variables brutes issues d’observations cliniques, biologiques et échographiques), il prédit une appendicite pédiatrique et explique ses prédictions.',
      'Le projet couvre la préparation des données et la comparaison de quatre familles de classifieurs : SVM, Random Forest, LightGBM et CatBoost. Le rappel est l’indicateur suivi de près : dans ce contexte, manquer un cas n’a pas le même poids que signaler un cas à tort.',
      'Les analyses SHAP montrent quelles variables pèsent dans le modèle, notamment les observations échographiques, le diamètre de l’appendice et les marqueurs biologiques.',
      'Le prototype Flask permet de saisir les observations d’un patient et d’afficher la prédiction avec ses explications. Le dépôt contient le code, les tests automatisés et les graphiques d’évaluation. Il s’agit d’un projet académique : aucune validation clinique n’a été menée et l’outil n’est pas destiné aux soins.',
    ],
    method: 'Préparation des données, comparaison de quatre classifieurs (SVM, Random Forest, LightGBM, CatBoost), explications SHAP, interface Flask.',
    result: 'Un prototype web qui associe prédiction et explications, avec tests automatisés et graphiques d’évaluation.',
  },
  '02': {
    subtitle: 'Des feux qui s’adaptent au trafic mesuré par caméra.',
    paragraphs: [
      'Une voie attend au rouge pendant qu’une autre, presque vide, garde le vert. Ce projet de Learning by Doing, à Centrale Casablanca (2025-2026), fait varier la commande des feux selon les véhicules observés, en respectant les mouvements compatibles dans le carrefour.',
      'Une caméra filme la maquette. YOLOv8 détecte les véhicules et K-Means intervient dans l’estimation des flux par voie. Une logique de décision choisit ensuite les phases à partir des combinaisons de voies compatibles.',
      'Un Raspberry Pi pilote la maquette physique : la chaîne complète tourne sur un carrefour miniature, de la détection des véhicules à la commande des feux.',
    ],
    method: 'Estimation des flux avec YOLOv8 et K-Means ; sélection de phases compatibles et pilotage des feux sur Raspberry Pi.',
    result: 'Une maquette de carrefour dont les feux réagissent à une estimation visuelle du trafic.',
  },
  '03': {
    subtitle: 'Un backtest qui n’utilise que ce que la stratégie pouvait savoir au moment du signal, et un verdict assumé.',
    paragraphs: [
      'Sur un graphique terminé, les bons points d’entrée paraissent évidents, alors que la stratégie n’avait pas accès à la suite de la courbe au moment de décider. Cette application Python teste des règles de trading Forex en respectant cette chronologie.',
      'Les modules séparent les données de marché, les instruments suivis, la génération de signaux et le backtesting. Une interface Streamlit affiche les résultats, SQLite conserve le suivi des sessions, et des modes paper et démo produisent des rapports de simulation. Un pivot (sommet ou creux) n’est exploité qu’après sa confirmation, pour ne jamais placer un signal à un moment où il ne pouvait pas être connu.',
      'Le protocole de validation walk-forward a été fixé avant l’examen des résultats. Verdict : l’espérance nette hors échantillon est négative, avec une borne haute d’intervalle de confiance sous zéro, car les coûts de transaction absorbent un signal brut proche de zéro. Le projet est donc clôturé ; le dépôt conserve la méthode et ses résultats.',
    ],
    method: 'Python, Pandas, Streamlit et SQLite ; données, signaux et backtests séparés ; validation walk-forward fixée à l’avance.',
    result: 'Une application locale d’analyse Forex, un protocole de validation fixé à l’avance et un verdict négatif documenté ; code public.',
  },
  '05': {
    subtitle: 'Mesurer une impulsion à l’oscilloscope et la comparer à la simulation d’une ligne de 20 cellules.',
    paragraphs: [
      'Une impulsion injectée dans une ligne électrique non linéaire change-t-elle de forme en se propageant ? Ce projet expérimental de Centrale Casablanca étudie la propagation de solitons, cellule par cellule.',
      'Sur le montage, les signaux sont acquis à l’oscilloscope à chaque cellule. En parallèle, une chaîne de vingt cellules simulée dans LTspice sert de référence numérique. Le traitement des signaux se fait en Python, ce qui permet de comparer directement mesures et simulation.',
      'Le projet rapproche aussi la propagation électrique de deux analogies, hydraulique et mécanique.',
    ],
    method: 'Montage d’une ligne électrique non linéaire, acquisitions à l’oscilloscope, simulation LTspice et traitement des signaux en Python.',
    result: 'Une comparaison entre acquisitions expérimentales et simulation d’une chaîne de vingt cellules.',
    note: 'Le visuel de couverture est une image générée ; les mesures et la simulation sont décrites dans le projet.',
  },
}
