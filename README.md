# Rudolf Hounlete — Portfolio

Portfolio React, TypeScript et Vite : présentation du parcours à Centrale
Casablanca, catalogue de 14 projets, résultats de compétitions et CV téléchargeable.

## Développement

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

Le build de production est généré dans `dist/`. La configuration Vercel utilise
`npm run build` et ce répertoire de sortie.

## Contenu

- `src/App.tsx` : navigation et fiches détaillées des projets.
- `src/data/` : parcours, compétences, projets et classements.
- `src/style.css`, `src/positioning.css` et `src/project-gallery.css` : interface,
  adaptations mobiles et animations respectant la réduction des mouvements.
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

La version Sites est accessible à
<https://rudolf-portfolio.rudolf43.chatgpt.site> selon les droits de partage du site.
