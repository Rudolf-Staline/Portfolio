# Portfolio — Rudolf Hounlete

Portfolio étudiant de Rudolf Hounlete, élève ingénieur à l’École Centrale Casablanca. Machine learning, développement logiciel, simulation et compétitions.

**Site :** https://rudolf-hounlete-portfolio.vercel.app

## Présentation

La page reprend la version blanche à cartes retenue en octobre 2026 : portrait et présentation, liens et distinctions, RiskSim, puis compétitions et projets, parcours et contact. Le défilement est vertical et natif. Chaque projet présente directement son image, son récit, son approche technique, son résultat et ses liens. Le thème sombre est facultatif. La typographie Figtree est hébergée avec l’application.

RiskSim et PediAppend montrent des captures réelles ; les autres projets reprennent les illustrations photographiques créées par IA, identifiées comme telles sous chaque image. Les récits conservent les textes et limites actuels, avec les liens vers les dépôts et les preuves disponibles.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` vérifie TypeScript et produit `dist/`. Vercel utilise le preset Vite et `vercel.json`. La page active est `src/App.tsx`, avec les styles `src/horizontal.css`, `src/vertical.css`, `src/expanded.css`, `src/cinema.css`, `src/white-return.css` et `src/pedi-inline.css`. Les anciennes propositions de design demeurent archivées dans le dépôt sans être chargées.

## Sources

- `src/data/` : projets, classements, parcours, compétences, contact, résumés et récits techniques. Les médailles et rangs sont repris du CV de Rudolf de septembre 2026.
- `public/portrait-rudolf.webp` : portrait original optimisé.
- `public/cinema/*-photo.webp` : illustrations de projet créées par IA, signalées sur la page.
- `public/projects/risksim-dashboard.png` et `risksim-results.png` : captures S5 de RiskSim sur un scénario de démonstration, avec montants illustratifs.
- `public/projects/pediappend-interface-symptomes.jpg` et `shap_summary_bar.png` : interface du prototype académique et graphique d’explication. PediAppend n’a pas de validation clinique et n’est pas destiné aux soins.
- `public/CV_Rudolf_HOUNLETE.pdf` : CV téléchargeable.

Les liens absents ne produisent pas de bouton vide. Le dépôt de l’entreprise pour RiskSim n’est pas public.

## Navigation

Ancres directes vers les sections et les projets, lien d’évitement, focus visible, prise en charge de `prefers-reduced-motion`, mise en page mobile et impression. La lecture des projets ne nécessite aucune ouverture de fiche.
