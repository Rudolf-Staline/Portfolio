# Rudolf Hounlete — Fieldnotes / Creative Engineering

Portfolio personnel consacré aux logiciels, à la simulation, aux compétitions de machine learning et à l'expérimentation graphique.

## Direction visuelle — Issue 03

Nouvelle direction **Fieldnotes** : papier chaud, anthracite, accent cuivre, typographie Space Grotesk et Instrument Serif, mise en page asymétrique. Accueil avec portrait authentique ; galerie éditoriale des cinq projets principaux donnant un accès direct aux récits détaillés.

### Illustrations

Les neuf anciens visuels photographiques génériques ont été **remplacés par des illustrations vectorielles spécifiques aux sujets** dans `public/editorial/*.svg`, créées pour ce portfolio :

- Stress financier — séries temporelles et profils de risque
- GeoAI — tuiles satellitaires et bassins aquacoles stylisés
- AutoML — graphe conceptuel de pipeline et de branches
- NeuroGolf — grilles de couleur et transformation
- WAXAL — trois tracés de signaux
- Credit Scoring — données et séparation conceptuelle
- Feux intelligents — carrefour schématique
- Forex — chandeliers et courbe stylisés
- Solitons — champ d'ondes en propagation

**Ces illustrations sont des concepts graphiques et non des résultats d'expériences.** Une légende le précise. Les captures réelles RiskSim et PediAppend et le portrait personnel `public/portrait-rudolf.webp` n'ont pas été remplacés par des personnes inventées ou des interfaces artificielles.

### Interactions

Lab Canvas 2D natif avec trois modes (champ, onde, réseau), suivi de la souris, pause/lecture. Ensemble de 43 icônes SVG et navigation latérale contextuelle sur bureau ; navigation et composition responsives sur mobile. Les apparitions et effets respectent `prefers-reduced-motion`. Les textes, méthodes, résultats, limites et liens restent consultables directement.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Entrée active : `src/CreativeApp.tsx` → `src/main.tsx`, avec les CSS `creative.css`, `studio-edition.css`, `studio-motion.css` et `edition-03.css` (appliqué en dernier). L'ancienne interface reste dans le dépôt mais n'est pas chargée.

## Sources fiables

- `src/data/` : textes, classements et récits techniques.
- `public/portrait-rudolf.webp` : portrait original.
- `public/projects/risksim-dashboard.png`, `risksim-results.png` : captures de démonstration de RiskSim.
- `public/projects/pediappend-interface-symptomes.jpg`, `shap_summary_bar.png` : captures du prototype académique et graphique SHAP. Aucun usage clinique revendiqué.
- `public/editorial/*.svg` : illustrations thématiques originales.
- `public/CV_Rudolf_HOUNLETE.pdf` : CV téléchargeable.

Le code RiskSim n'est pas public et aucun faux lien de dépôt n'est ajouté. Les réalisations techniques sont présentées avec leurs limitations et sans données client privées.
