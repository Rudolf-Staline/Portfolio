# Portfolio — Rudolf Hounlete

Portfolio personnel : développement logiciel, machine learning et systèmes expérimentaux.

**Site :** https://rudolf-hounlete-portfolio.vercel.app

## Design

Direction éditoriale inspirée du modèle Framer [Majd](https://majd-portfolio.framer.website/) de Mejed Alkoutaini : fond ivoire, typographie noire affirmée, accent terre cuite et navigation flottante. L’accueil utilise le nom sur toute la largeur, puis une composition réunissant présentation, portrait circulaire et médailles. Les autres sections reprennent la palette et les contrastes. Le site est développé en React ; les éléments graphiques du modèle ne sont pas réutilisés.

Les projets disposent d’une fiche détaillée et d’une présentation typographique : Autonomous AutoML est mis en avant, accompagné de trois projets académiques ou personnels. Les compétences utilisent une grille de technologies ; les trois médailles et les deux classements ont des présentations distinctes. RiskSim présente les étapes de son fonctionnement, sans faux écran ni résultat simulé. Les compétitions Financial Stress Prediction, GeoAI et WAXAL complètent les projets Autonomous AutoML, RiskSim et les travaux académiques. Les fiches distinguent les travaux en cours des livrables disponibles.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` vérifie TypeScript puis génère la version de production dans `dist/`. Vercel utilise le preset Vite et la configuration `vercel.json`.

## Contenu

| Fichier | Contenu |
|---------|---------|
| `src/data/projects.ts` | Présentation, réalisations, technologies, liens et type d’illustration des projets |
| `src/data/profile.ts` | Profil et coordonnées |
| `src/data/education.ts` | Formation |
| `src/data/skills.ts` | Compétences regroupées |
| `src/App.tsx` | Composition de la page et fiches projets |
| `src/index.css` | Styles, responsive et animations |
| `src/editorial.css` | Direction visuelle Majd et composition de l’accueil |
| `public/CV_Rudolf_HOUNLETE.pdf` | CV téléchargeable |
| `public/portrait-rudolf.png` | Portrait retenu, chemise bleu ciel et fond transparent |

Pour un projet, `visual` sélectionne une illustration (`simulation`, `calendar`, `model`, `vision`, `journal`, `signal` ou `code`). Les liens absents ne produisent pas de bouton vide. RiskSim n’affiche pas de lien vers son dépôt privé.

## Accessibilité et interactions

- Menu mobile avec état annoncé et fermeture par Échap.
- Fiches projets en dialogue natif : focus à l’ouverture, fermeture par Échap, bouton et clic hors de la fiche.
- Navigation clavier, lien d’évitement et focus visibles.
- Défilement et animations désactivés avec `prefers-reduced-motion`.
- Contact par email et téléchargement du CV sans service tiers.

Les anciens composants et `legacy/index.html` sont conservés pour référence ; la page active est composée dans `src/App.tsx`.

Les médailles et classements sont repris du CV de Rudolf de septembre 2026. Les liens externes ouvrent la compétition ou les expérimentations disponibles, sans prétendre être des liens directs vers son profil.

Le site comporte huit sections au format slide. Le défilement vertical est natif : les panneaux suivent la molette ou le geste tactile, puis s’alignent grâce à CSS Scroll Snap. Les sections longues restent lisibles dans le même flux, sans zone de défilement interne ni temporisation bloquant la molette. Les liens directs, le clavier et les contrôles de navigation utilisent le même conteneur.

Chaque panneau occupe toute la largeur et au moins toute la hauteur visible (`100dvh`). L’en-tête et les contrôles sont superposés ; ils ne réduisent plus la surface des slides.

Les titres et les blocs apparaissent en cascade lorsqu’ils deviennent visibles dans le conteneur de défilement (Intersection Observer). Les entrées se rejouent au retour ; les détails ambiants s’arrêtent hors écran. Cartes, liens, boutons et dialogues ont des transitions dédiées. La préférence de réduction des animations est respectée, y compris si elle change pendant la consultation.

Le défilement pilote également la profondeur des panneaux (échelle, déplacement, fondu et arrondis), avec une position stable pendant la lecture des sections longues. Les positions de navigation utilisent les dimensions de mise en page pour rester indépendantes des transformations. Une parallaxe à la souris anime les éléments autour du portrait ; une fine barre indique la progression.

Sur ordinateur, les compositions utilisent la largeur disponible avec une marge de 4 % de chaque côté, sans plafond central de 1 120 ou 1 360 px. Les titres, le portrait, les grilles et les textes se mettent à l’échelle sur grand écran ; la longueur des paragraphes reste limitée pour la lecture.

## Portfolio étudiant — contenu et illustrations

Le contenu présente le parcours étudiant, sans appel à candidatures pour un stage. Les descriptions longues sont dans `src/data/projectStories.ts` ; l’accueil et le portrait restent dans `src/data/profile.ts` et `public/portrait-rudolf.png`. Les huit sections sont conservées, avec un défilement interne continu pour les panneaux longs.

`src/features/projects/` contient les dossiers, les galeries et les illustrations SVG/CSS. Les interactions montrent le parcours AutoML, les mois observés de GeoAI et les phases du carrefour. Les animations se mettent en pause hors écran, disposent d’un bouton de pause et respectent `prefers-reduced-motion`. Elles sont des schémas pédagogiques et ne calculent pas les modèles des projets.

### Origine des visuels

- `public/projects/risksim-dashboard.png` et `risksim-results.png` : captures S5 du projet RiskSim, issues de `reports/s5/images/`. Les écrans présentent un scénario de démonstration ; les montants ne sont pas des résultats client.
- `public/projects/shap_summary_bar.png` et `roc_curve.png` : exports originaux de `reports/images/` du dépôt [Coding-week-project](https://github.com/Rudolf-Staline/Coding-week-project). Les légendes précisent leur contexte académique.
- Les autres illustrations sont construites dans le portfolio en SVG et CSS ; aucune image satellite, donnée financière, sortie de transcription ou trace d’oscilloscope n’est présentée comme réelle à partir de ces schémas.

Les textes distinguent les classements de compétition et les scores locaux. Le périmètre public des expériences GeoAI est précisé, ainsi que la nature interne des vérifications AutoML et l’absence de validation clinique de PediAppend.

## Scènes cinématographiques

Les illustrations d’ouverture des projets utilisent désormais toute la largeur, avec une mise en scène photographique pour GeoAI et le carrefour, et des compositions 3D procédurales pour les autres sujets. Les descriptions restent sous les scènes et les captures réelles dans les fiches. La provenance, les briefs et les fichiers sont décrits dans [la direction visuelle](docs/cinema-art-direction.md). Les anciens schémas interactifs sont remplacés par des commandes de cadrage et de pause.
