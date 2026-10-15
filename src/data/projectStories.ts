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
    subtitle: 'Trouver la règle derrière quelques cases de couleur.',
    paragraphs: [
      'Quelques grilles d’exemple, des cases colorées qui changent de place, puis une nouvelle grille à compléter. Le défi consiste à retrouver la transformation qui relie les exemples et à l’appliquer à un cas inédit. Une apparence simple pour un problème de raisonnement visuel.',
      'NeuroGolf ajoute une contrainte à cet exercice : proposer des réseaux compacts. La taille de la solution compte aussi. Ma participation à cette compétition Kaggle portait sur ces transformations de grilles ARC-AGI, à la rencontre du raisonnement sur les motifs et de la conception de petits réseaux.',
      'J’ai terminé 220e sur 2 963 équipes, dans les 7,4 % premiers, avec une médaille de bronze. Cette participation occupe une place à part parmi mes compétitions : le sujet porte sur des règles visuelles à retrouver, tandis que mes autres travaux exploitent surtout des données financières, satellitaires ou vocales.',
    ],
    method: 'Transformations de grilles ARC-AGI avec des réseaux de neurones soumis à une contrainte de compacité.',
    result: 'Médaille de bronze Kaggle · 220e sur 2 963 équipes · top 7,4 %.',
    note: 'Les grilles de la scène sont illustratives ; elles ne montrent pas une solution soumise à la compétition.',
  },
  credit: {
    subtitle: 'Estimer le risque avant d’accorder un crédit.',
    paragraphs: [
      'Accorder un crédit engage une décision sur un remboursement futur. Comment apprécier ce risque à partir des informations disponibles ? Le credit scoring transforme cette question en un problème de modélisation : exploiter les données pour estimer le risque associé à une demande.',
      'J’ai abordé ce sujet à travers African Credit Scoring, une compétition de machine learning sur Zindi. Cette participation rejoint mon intérêt pour les applications de l’apprentissage automatique en finance, où une prédiction doit être évaluée au regard de la décision qu’elle pourrait éclairer.',
      'J’ai terminé deuxième sur 77 dans cette compétition. Ce classement est le résultat de ma participation à l’évaluation proposée sur Zindi.',
    ],
    method: 'Modélisation du risque de crédit dans le cadre de la compétition African Credit Scoring sur Zindi.',
    result: '2e sur 77 · Zindi.',
    note: 'Le détail de la solution et son code ne sont pas publiés sur ce portfolio.',
  },
  automl: {
    subtitle: 'Automatiser l’entraînement sans perdre le fil des expériences.',
    paragraphs: [
      'Un fichier CSV, une cible à prédire et plusieurs modèles à essayer. Très vite, les expériences s’accumulent : quels prétraitements ont été utilisés ? D’où vient ce score inhabituellement élevé ? Que reste-t-il d’un entraînement interrompu ? Automatiser la recherche de modèles demande aussi de garder la trace de ces choix.',
      'J’ai conçu Autonomous AutoML pour réunir ce travail dans un outil en ligne de commande. Il analyse les données tabulaires, signale les variables susceptibles de révéler la cible et organise la validation. Optuna explore les modèles dans un budget défini ; les prétraitements sont ajustés dans chaque fold pour éviter que les données de validation influencent l’entraînement.',
      'Les essais sont enregistrés dans SQLite, avec leurs résultats et leurs échecs. Une expérience interrompue peut reprendre. À la fin, l’outil exporte le pipeline retenu, les prédictions et un rapport HTML autonome qui permet d’examiner ce qui a été fait.',
      'Trois démonstrations permettent de parcourir le fonctionnement : classification, régression et détection d’une fuite de données synthétique. J’ai développé ce projet individuel avec l’assistance de Codex, à partir de mes spécifications, en incluant la vérification des fichiers exportés et la relecture des prédictions.',
    ],
    method: 'scikit-learn et Optuna pour l’entraînement ; SQLite pour suivre les essais ; empreintes de fichiers et relecture des prédictions pour contrôler les exports.',
    result: 'Une CLI pour les fichiers CSV tabulaires, des expériences reprenables et un rapport HTML. Trois démonstrations fonctionnelles.',
    note: 'Le périmètre livré couvre les données tabulaires. Les contrôles sont ceux du logiciel, sans certification externe des modèles.',
  },
  risksim: {
    subtitle: 'Quelle réserve prévoir pour les risques d’un projet ?',
    paragraphs: [
      'Ajouter une marge au budget est simple. Savoir quels risques elle couvre l’est moins. Un même registre peut contenir des événements peu probables mais coûteux, des incertitudes plus fréquentes et des risques qui évoluent ensemble. Comment choisir une réserve budgétaire en tenant compte de ces différences ?',
      'C’est le point de départ de RiskSim, développé pendant mon stage chez CHOUBEL, du 15 juillet au 28 août 2026. À partir d’un registre Excel, le moteur Python simule de nombreux scénarios de coûts. L’utilisateur renseigne les hypothèses, choisit les distributions et précise les corrélations entre risques lorsque c’est nécessaire.',
      'Les résultats permettent de comparer plusieurs niveaux de réserve, notamment aux percentiles P50, P80 et P90, d’examiner la probabilité de dépasser un budget et de repérer les risques qui pèsent le plus sur le résultat. Modifier une hypothèse puis relancer le calcul rend son effet visible dans la comparaison des scénarios.',
      'Mon travail a porté sur le moteur de calcul et sur l’application qui permet de l’utiliser. Après une première interface Streamlit, j’ai développé une interface React et TypeScript, puis préparé la distribution Windows et la documentation. L’outil fonctionne localement et conserve Excel pour les échanges de registres. Un choix de fonctionnement compte particulièrement : une matrice de corrélation invalide est refusée, sans correction silencieuse des hypothèses de l’utilisateur.',
    ],
    method: 'Simulation Monte Carlo avec NumPy, corrélations entre risques, percentiles et analyses de sensibilité ; interface React reliée au moteur Python.',
    result: 'Une application Windows utilisable localement : import/export Excel, édition des hypothèses, simulation et comparaison de scénarios.',
    note: 'Les captures montrent la version S5 sur un scénario de démonstration. Les cas synthétiques vérifient le calcul ; ils ne valident pas les hypothèses d’un dossier client.',
  },
  'financial-stress': {
    subtitle: 'Ce que six mois de transactions révèlent d’une fragilité financière.',
    paragraphs: [
      'Un total de transactions peut masquer des évolutions très différentes. Deux historiques peuvent avoir un montant cumulé proche, tout en suivant des trajectoires distinctes au fil des mois. Pour prédire le stress financier, la façon de représenter cette évolution compte autant que le choix du modèle.',
      'Dans cette compétition Zindi, j’ai travaillé sur une fenêtre de six mois de données transactionnelles. J’ai construit et comparé des agrégats et des variables mensuelles autour d’un modèle LightGBM. Le but était de conserver l’information temporelle utile, puis de vérifier ce qu’apportait chaque préparation des données.',
      'Optuna intervient dans le réglage des modèles et la sélection des variables. Le dépôt garde les paramètres, les importances et les résultats de chaque expérience. Il permet aussi de voir une piste qui n’a pas payé : retirer douze variables dans EXP007 a réduit le modèle sans améliorer la ROC AUC moyenne.',
      'Le classement privé place ma participation au 4e rang sur 262. Parmi les expériences publiques, EXP005 utilise 257 variables et atteint une ROC AUC moyenne de 0,885 en validation croisée. Ce score décrit une expérience locale ; le classement mesure la participation sur les données privées de la compétition.',
    ],
    method: 'Variables mensuelles et agrégats sur six mois, LightGBM, sélection de variables et optimisation avec Optuna.',
    result: '4e sur 262 au classement privé. EXP005 : ROC AUC moyenne de 0,885 en validation croisée et de 0,883 sur le jeu de validation séparé.',
    note: 'EXP007 obtient 0,8849 contre 0,8851 pour EXP005 en moyenne de validation croisée, avec douze variables de moins.',
  },
  geoai: {
    subtitle: 'Reconnaître un bassin aquacole malgré les mois manquants.',
    paragraphs: [
      'Un satellite ne fournit pas toujours une année complète d’observations. Certaines périodes manquent, et les informations radar et optiques ne sont pas disponibles aux mêmes moments. Peut-on encore identifier les bassins aquacoles quand on ne dispose que d’une partie de leur évolution dans l’année ?',
      'Le challenge GeoAI pose ce problème à partir de séries Sentinel-1 et Sentinel-2. Chaque observation suit un pixel au fil des mois. La difficulté vient notamment du décalage entre les données : douze mois sont disponibles à l’entraînement, contre quatre à six mois radar consécutifs au test, avec d’autres lacunes possibles dans les observations optiques.',
      'J’ai travaillé sur une validation qui reproduit ces absences. Les modèles tabulaires et un GRU compact sont comparés sur les mêmes fenêtres temporelles, en tenant compte des capteurs disponibles. Le protocole documenté porte sur 1 821 observations, cinq folds et trois répétitions ; le GRU compte 26 329 paramètres.',
      'Ma participation a obtenu une médaille de bronze sur Zindi. Le dépôt public présente les comparaisons et le protocole : il permet de comprendre comment les modèles ont été évalués lorsque les observations deviennent incomplètes.',
    ],
    method: 'Fenêtres temporelles et masques d’observation ; comparaison d’arbres de gradient boosting et d’un GRU, avec préparation des données dans chaque fold.',
    result: 'Médaille de bronze Zindi. Un protocole de comparaison sur 1 821 observations, en validation 5 folds × 3 répétitions.',
    note: 'Les expériences publiées documentent une partie du travail, sans reproduire à elles seules la soumission finale médaillée.',
  },
  waxal: {
    subtitle: 'Transcrire le lingala, le luganda et le shona, puis examiner les erreurs.',
    paragraphs: [
      'Un enregistrement vocal entre dans le système ; une transcription en sort. Entre les deux, il faut traiter l’audio, reconnaître les mots et composer avec des voix différentes. Quand plusieurs langues sont concernées, un score moyen peut cacher une transcription satisfaisante dans l’une et beaucoup plus fragile dans une autre.',
      'Pour le challenge WAXAL sur Zindi, j’ai travaillé sur une chaîne de reconnaissance vocale en lingala, luganda et shona. Elle réunit la préparation des enregistrements, un entraînement CTC avec un backend MMS configurable et une évaluation par langue. Les locuteurs sont séparés entre entraînement et validation afin d’examiner le comportement du modèle sur d’autres voix.',
      'L’analyse distingue les erreurs de mots et de caractères avec les mesures WER et CER. Elle porte aussi sur le fonctionnement de la chaîne : un audit de 4 253 prédictions historiques a retrouvé 118 sorties de repli. Les isoler permet de séparer un problème d’exécution d’une erreur de reconnaissance vocale.',
      'Cette participation a obtenu une médaille de bronze. Les tests sur audio synthétique complètent les vérifications du parcours logiciel ; la qualité de transcription s’évalue, elle, sur les enregistrements de la compétition.',
    ],
    method: 'Préparation audio, PyTorch, CTC et MMS ; validation par locuteur et analyse WER/CER par langue.',
    result: 'Médaille de bronze Zindi ; une chaîne de transcription multilingue et un audit portant sur 4 253 prédictions historiques.',
    note: 'L’audit historique et les tests synthétiques sont distincts de l’évaluation finale de la compétition.',
  },
  '01': {
    subtitle: 'Comprendre ce qui conduit un modèle à prédire une appendicite.',
    paragraphs: [
      'Face à une suspicion d’appendicite pédiatrique, une prédiction seule laisse une question ouverte : sur quelles observations repose-t-elle ? Un modèle peut fournir une classe, mais il faut aussi examiner les erreurs qu’il commet et les variables qui contribuent à sa réponse.',
      'PediAppend explore cette question dans un projet académique à partir du jeu de données Regensburg : 782 patients et 53 variables brutes, issues d’observations cliniques, biologiques et échographiques. Le travail comprend la préparation des données et la comparaison de SVM, Random Forest, LightGBM et CatBoost.',
      'Une attention particulière est portée au rappel : manquer un cas et signaler à tort un cas n’ont pas la même signification dans ce problème. Les analyses SHAP permettent ensuite d’examiner la contribution des variables aux prédictions, au-delà du seul score global.',
      'Le prototype intègre ces résultats dans une interface Flask, où l’on peut saisir les observations et consulter la prédiction avec ses explications. Le dépôt réunit le code, les tests et les graphiques d’évaluation. Il s’agit d’un travail académique, sans validation clinique ni utilisation en soins.',
    ],
    method: 'Préparation des données, comparaison de quatre familles de classifieurs, explications SHAP et intégration dans Flask.',
    result: 'Un prototype web qui associe prédictions et explications, accompagné de tests et de graphiques d’évaluation consultables.',
  },
  '02': {
    subtitle: 'Faire évoluer les feux avec le trafic observé.',
    paragraphs: [
      'Une voie attend au rouge pendant qu’une autre, presque vide, garde le vert. Ce décalage pose une question concrète : comment faire varier la commande des feux en fonction des véhicules observés, tout en respectant les mouvements compatibles dans le carrefour ?',
      'Ce projet académique aborde la question sur une maquette. La caméra fournit les observations ; YOLOv8 et K-Means interviennent dans l’estimation des flux. La logique de décision utilise ensuite cette estimation pour choisir les phases des feux.',
      'Le Raspberry Pi assure le pilotage du montage physique. L’intérêt du projet est de relier ce que la caméra perçoit à une action sur la maquette : une détection doit devenir une estimation du trafic, puis une commande cohérente des différentes voies.',
      'La réalisation associe vision par ordinateur et commande adaptative sur un carrefour miniature. Elle permet d’étudier toute la chaîne, depuis l’observation des véhicules jusqu’au pilotage des feux, sur un montage académique.',
    ],
    method: 'Estimation des flux avec YOLOv8 et K-Means ; sélection de phases compatibles et pilotage des feux sur Raspberry Pi.',
    result: 'Une maquette de carrefour dont les feux réagissent à une estimation visuelle du trafic.',
  },
  '03': {
    subtitle: 'Tester une stratégie avec les informations disponibles à l’instant du signal.',
    paragraphs: [
      'Sur un graphique déjà terminé, les points d’entrée semblent parfois évidents. Le problème est qu’une stratégie n’avait pas encore accès à la suite de la courbe au moment de décider. Un backtest utile doit respecter cette chronologie, sinon il mesure une capacité à regarder le passé avec des informations futures.',
      'J’ai développé cette application Python pour explorer les données Forex et comparer des règles de stratégie. Les modules séparent les données de marché, les instruments suivis, la génération de signaux et leur évaluation. Une interface Streamlit permet d’examiner les résultats ; SQLite conserve le suivi des sessions.',
      'Un point technique concerne les pivots : un sommet ou un creux n’est exploitable qu’après sa confirmation. Le code vérifie cette cohérence temporelle pour éviter de placer rétrospectivement un signal à un instant où il ne pouvait pas encore être connu.',
      'Le projet comprend des modes paper et démo ainsi que des rapports de sessions simulées. Il sert à expérimenter les stratégies dans un même environnement et à examiner leur comportement. Les résultats présentés restent des simulations, sans rentabilité réelle revendiquée.',
    ],
    method: 'Python, Pandas, Streamlit et SQLite ; séparation des données, signaux et backtests, avec vérification de leur cohérence temporelle.',
    result: 'Une application locale d’analyse Forex, avec suivi des sessions, rapports de simulation et code public.',
  },
  '05': {
    subtitle: 'Observer une impulsion, puis confronter sa propagation au modèle.',
    paragraphs: [
      'Une impulsion injectée à l’entrée d’un circuit change-t-elle de forme en le traversant ? Comment suivre son évolution d’une cellule à l’autre ? Ce travail expérimental aborde la propagation de solitons à travers une ligne électrique non linéaire.',
      'L’étude met en regard deux façons d’observer le même système. Sur le montage, les signaux sont acquis à l’oscilloscope, cellule par cellule. Dans LTspice, une chaîne de vingt cellules permet de simuler la propagation et de disposer d’un point de comparaison numérique.',
      'Les signaux sont ensuite traités en Python pour examiner leur évolution et comparer mesures et simulation. Le travail aborde aussi les liens avec des systèmes hydrauliques et mécaniques : un même sujet de propagation peut être étudié à travers des dispositifs physiques différents.',
    ],
    method: 'Montage d’une ligne électrique non linéaire, acquisitions à l’oscilloscope, simulation LTspice et traitement des signaux en Python.',
    result: 'Une étude comparant des acquisitions expérimentales à la simulation d’une chaîne de vingt cellules.',
    note: 'Le banc d’essai de la scène est une illustration générée. Il ne constitue pas une photographie du montage réalisé.',
  },
}
