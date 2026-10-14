# Portfolio — Rudolf Hounlete

Portfolio personnel : développement logiciel, machine learning et systèmes expérimentaux.

**Site :** https://rudolf-hounlete-portfolio.vercel.app

## Design

Fond blanc cassé, jaune doux, typographie DM Sans et composition aérée, inspirés du portfolio jaune retenu comme référence. L’accueil présente le profil à gauche et la photo de départ avec son fond suisse à droite, sans retouche du visage ni détourage. Les touches jaunes animées sont conservées derrière la photo.

Les projets disposent d’une illustration abstraite et d’une fiche détaillée. Les visuels portent la mention « Illustration du projet » : ce ne sont pas des captures des applications ni des résultats mesurés. Le contenu comprend RiskSim, Horizon et les projets déjà présents dans le portfolio.

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
| `public/portrait-rudolf.webp` | Photo de départ, sans retouche, encodée pour le web |

Pour un projet, `visual` sélectionne une illustration (`simulation`, `calendar`, `model`, `vision`, `journal`, `signal` ou `code`). Les liens absents ne produisent pas de bouton vide. RiskSim n’affiche pas de lien vers son dépôt privé.

## Accessibilité et interactions

- Menu mobile avec état annoncé et fermeture par Échap.
- Fiches projets en dialogue natif : focus à l’ouverture, fermeture par Échap, bouton et clic hors de la fiche.
- Navigation clavier, lien d’évitement et focus visibles.
- Défilement et animations désactivés avec `prefers-reduced-motion`.
- Contact par email et téléchargement du CV sans service tiers.

Les anciens composants et `legacy/index.html` sont conservés pour référence ; la page active est composée dans `src/App.tsx`.
