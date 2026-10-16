# Portfolio — Rudolf Hounlete

Portfolio étudiant de Rudolf Hounlete, élève ingénieur à l’École Centrale Casablanca. Machine learning, développement logiciel, simulations et compétitions.

**Site :** https://rudolf-hounlete-portfolio.vercel.app

## Direction visuelle

Un carnet d’expériences numérique : papier presque blanc, encre vert noir, accent citron, typographies Space Grotesk et IBM Plex Mono. La page se lit verticalement, du portrait et des résultats vers deux études de cas, les autres projets, les compétitions et le parcours. Les captures RiskSim et PediAppend proviennent des projets ; elles s’agrandissent dans une boîte de dialogue native. Les autres travaux sont présentés avec leurs résultats et leurs limites, sans visuel conceptuel.

Les descriptions courtes se trouvent dans `src/data/projectBriefs.ts` et les récits techniques dans `src/data/projectStories.ts`. La page active est `src/App.tsx`, son style est `src/fieldnotes.css`. Les anciennes compositions restent dans le dépôt pour référence, sans être chargées par l’application.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` vérifie TypeScript et produit la version de production dans `dist/`. Vercel utilise le preset Vite et `vercel.json`.

## Sources des contenus et des images

- `src/data/` : projets, classements, études, compétences, contact et liens. Les médailles et rangs sont repris du CV de Rudolf de septembre 2026.
- `public/portrait-rudolf.webp` : portrait original de Rudolf.
- `public/projects/risksim-dashboard.png` et `risksim-results.png` : captures S5 de RiskSim issues de `reports/s5/images/`. Le scénario est une démonstration ; les montants sont illustratifs.
- `public/projects/pediappend-interface-symptomes.jpg` et `shap_summary_bar.png` : interface du prototype académique et export de ses explications. PediAppend n’a pas de validation clinique et n’est pas destiné aux soins.
- `public/CV_Rudolf_HOUNLETE.pdf` : CV téléchargeable.

Les descriptions précisent aussi les résultats négatifs, les validations locales et les limites de disponibilité du code. RiskSim n’expose pas le dépôt privé de l’entreprise.

## Navigation et accessibilité

Navigation par ancres, lien d’évitement, focus visible, détails techniques ouverts au clavier, galerie fermable avec Échap. Le thème clair est utilisé à la première visite ; le choix d’un thème sombre est mémorisé localement. Le mouvement est réduit avec `prefers-reduced-motion` et une feuille d’impression simplifie la mise en page.
