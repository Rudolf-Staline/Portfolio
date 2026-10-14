# Portfolio — Rudolf Hounlete

Portfolio personnel : développement logiciel, machine learning et systèmes expérimentaux.

**Site :** https://rudolf-hounlete-portfolio.vercel.app

## Design

Fond clair, violet profond et typographie DM Sans, avec une composition inspirée du modèle Canva « Web Designer Online Portfolio » de Cosmic Latte. L’accueil présente un nom affirmé, un bandeau de spécialité et le portrait dans un disque violet. La présentation, les compétences, les compétitions, l’expérience et les projets alternent entre panneaux clairs et foncés.

Les projets disposent d’une illustration abstraite et d’une fiche détaillée. Les visuels portent la mention « Illustration du projet » : ce ne sont pas des captures des applications ni des résultats mesurés. Les compétitions Financial Stress Prediction, GeoAI et WAXAL complètent les projets Autonomous AutoML, RiskSim et les travaux académiques. Les fiches distinguent les travaux en cours des livrables disponibles.

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
