# Rudolf Hounlete — Creative Developer Lab

Portfolio personnel, entre logiciel, machine learning, simulation et expérimentation visuelle.

## Direction

Une refonte complète, et non une couche CSS supplémentaire sur l’ancienne page : typographie expressive, composition de type atelier, portrait original, navigation verticale, projets en grands chapitres et laboratoire génératif manipulable.

Le laboratoire est réalisé en **Canvas 2D natif**. Trois modes (« Champ », « Onde », « Réseau ») réagissent à la position du pointeur et offrent un contrôle pause/lecture. Aucun faux graphique ne remplace les résultats réels des projets.

**Les projets restent lisibles sans clic supplémentaire.** Cinq projets sont développés en grands chapitres et six autres gardent leurs méthodes, récits, résultats et notes directement dans la page. Les captures d’écran RiskSim et PediAppend restent authentiques ; les autres photographies illustratives générées sont indiquées comme telles. Aucun texte n’est incrusté dans les photographies.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Entrée active : `src/CreativeApp.tsx` via `src/main.tsx`. Styles : `src/creative.css`. L’ancien site et ses feuilles de style restent dans le dépôt pour faciliter une comparaison ou un retour arrière, mais **ne sont plus chargés** par l’entrée active.

Le portfolio n’ajoute pas de bibliothèque de motion ou de graphiques : Canvas 2D, CSS et React suffisent. Les animations tiennent compte de `prefers-reduced-motion`. Une navigation clavier, des libellés, des liens d’évitement et une version mobile restent disponibles.

## Provenance

- `src/data/` : textes, résultats des compétitions, méthodes, limites, parcours.
- `public/portrait-rudolf.webp` : portrait réel fourni pour le portfolio.
- `public/projects/risksim-*.png` : captures S5 sur scénarios synthétiques.
- `public/projects/pediappend-interface-symptomes.jpg`, `shap_summary_bar.png` : prototype académique et analyse SHAP. Aucun usage clinique n’est revendiqué.
- `public/cinema/*.webp` : illustrations photographiques générées, signalées sous chaque image.
- `public/CV_Rudolf_HOUNLETE.pdf` : CV.

Le code RiskSim n’est pas public. Aucun lien de dépôt n’est fabriqué pour les projets qui n’en possèdent pas.
