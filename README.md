# Rudolf Hounlete — Portfolio

Portfolio React, TypeScript et Vite, en français et en anglais : parcours à
Centrale Casablanca, catalogue de 14 projets, résultats de compétitions et CV.
Site en ligne : <https://rudolf-hounlete-portfolio.vercel.app/>.

## Développement

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run test:static
npm run preview
```

Le build génère 30 pages HTML dans `dist/` : deux accueils et les 14 études de
cas dans chaque langue. React hydrate le contenu déjà présent ; les textes,
schémas et liens restent consultables sans JavaScript. Aucun serveur Node n’est
nécessaire en production. La configuration Vercel conserve le build Vite.

Les pages `/projets/<slug>/` et `/en/projects/<slug>/` ont leurs propres titre,
description, image Open Graph, canonical et liens de traduction. Un sitemap,
un robots.txt et une page 404 sont générés. Les anciens liens `#projet/<id>`
restent compatibles lorsque JavaScript est actif.

Sharp produit à la compilation des images WebP adaptées à l’affichage. Les
originaux restent dans `public/`. Les variantes sont générées dans `dist/` et
ne sont pas versionnées. Le développement utilise directement les originaux.

## Contenu

- `src/App.tsx` : accueil, navigation et études de cas.
- `src/routes.ts` : routes, traductions et métadonnées.
- `src/data/english.ts` : textes anglais, avec les mêmes attributions et limites.
- `src/data/architecture.ts` : source commune des trois schémas FR/EN.
- `scripts/prerender.mjs` : HTML statique, images, SEO et exports SVG.
- `scripts/verify-static.mjs` : vérification du catalogue, des routes et des liens.
- `src/data/` : parcours, compétences, projets et classements.
- `src/style.css`, `src/positioning.css` et `src/project-gallery.css` : interface,
  adaptations mobiles ; `src/engineering.css` ajoute les études de cas et les
  schémas techniques. Les animations respectent la réduction des mouvements.
- `public/projects/` : captures des prototypes et couvertures des projets.
- `public/images/portrait.webp` : portrait réel.
- `public/CV_Rudolf_HOUNLETE.pdf` : CV graphique de trois pages avec photo et
  les 14 projets.
- `public/CV_Rudolf_HOUNLETE.docx` : version texte modifiable, avec une mise
  en page distincte du PDF graphique.
- `design/cv/` : contenu et scripts de reconstruction des deux versions du CV.

Les couvertures dans `public/projects/generated/` sont des images conceptuelles
générées ; elles ne constituent pas des captures de réalisation. Les captures
de RiskSim, PediAppend et Dossier Jaune illustrent les prototypes correspondants.
Les contributions au moteur de RiskSim et à son interface restent distinguées.

Les schémas RiskSim, Autonomous AutoML et PediAppend décrivent le fonctionnement
documenté des projets et sont téléchargeables en SVG dans les deux langues.
AlphaLab, ReverseFlow et les applications précédemment exclues ne sont pas
présentés comme des réalisations. Le téléchargement du CV reste en français.

La version Sites précédente est distincte de cette version GitHub/Vercel.
