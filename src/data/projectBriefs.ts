/** Concise reading layer; complete technical stories remain available inline. */
export const projectBriefs: Record<
  string,
  { metric: string; label: string; body: string }
> = {
  risksim: {
    metric: "P50 / P80 / P90",
    label: "Du risque à la réserve budgétaire",
    body: "Un registre Excel entre, des scénarios de coûts sortent. Développé en binôme chez CHOUBEL CONSULTING, RiskSim permet de comparer les hypothèses et d’identifier les risques qui pèsent sur le budget. Contribution : registre, visualisations, sensibilité, interface React et distribution Windows. Le moteur de calcul a été porté par Daniel Awaga.",
  },
  "01": {
    metric: "782",
    label: "patients dans le jeu de données",
    body: "Quatre familles de classifieurs comparées sur les données de Regensburg. Le prototype Flask associe les observations cliniques à une prédiction et à des explications SHAP. Projet académique, sans validation clinique et non destiné aux soins.",
  },
  automl: {
    metric: "393",
    label: "tests automatisés",
    body: "Du CSV au modèle exporté : prétraitements dans chaque fold, détection des fuites, recherche Optuna et suivi SQLite. Les expériences peuvent reprendre après une interruption.",
  },
  "02": {
    metric: "Vision → action",
    label: "une maquette pilotée en temps réel",
    body: "YOLOv8 détecte les véhicules ; l’estimation des flux guide le choix des phases compatibles. Un Raspberry Pi commande les feux du carrefour miniature.",
  },
  "03": {
    metric: "Verdict négatif",
    label: "un résultat documenté, pas masqué",
    body: "Données, signaux et backtests séparés. La validation walk-forward montre une espérance nette négative hors échantillon : les coûts absorbent le signal. Le projet est clôturé, la méthode reste publique.",
  },
  "05": {
    metric: "20",
    label: "cellules simulées dans LTspice",
    body: "Une impulsion suivie cellule par cellule à l’oscilloscope, puis comparée à une simulation numérique. Python relie les mesures expérimentales à la propagation sur une ligne électrique non linéaire.",
  },
  neurogolf: {
    metric: "220ᵉ",
    label: "sur 2 963 équipes · bronze Kaggle",
    body: "Retrouver les transformations de grilles ARC-AGI avec des graphes ONNX de logique pure, sans poids entraînables, sous contrainte de taille.",
  },
  waxal: {
    metric: "Bronze",
    label: "Zindi · reconnaissance vocale",
    body: "Transcription du lingala, du luganda et du shona. Validation par locuteur et analyse des erreurs WER/CER langue par langue.",
  },
  geoai: {
    metric: "Bronze",
    label: "Zindi · imagerie satellitaire",
    body: "Repérer les bassins aquacoles avec Sentinel-1 et Sentinel-2. Une validation qui reproduit les mois manquants, pour comparer arbres de boosting et GRU.",
  },
  "financial-stress": {
    metric: "4ᵉ / 262",
    label: "classement privé · Zindi",
    body: "Six mois de transactions transformés en variables mensuelles et agrégats. Modèles LightGBM, réglage Optuna et expériences consignées dans le dépôt public.",
  },
  credit: {
    metric: "2ᵉ / 77",
    label: "participants · Zindi",
    body: "Estimer le risque associé à une demande de crédit à partir des informations disponibles. Le code de cette participation n’est pas public.",
  },
};
