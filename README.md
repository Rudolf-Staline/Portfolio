# Rudolf Hounlete — Portfolio

Portfolio personnel de Rudolf Hounlete, élève ingénieur à Centrale Casablanca.

## Direction et hiérarchie

Le site utilise une **direction blanche éditoriale**, sans lourdes animations ni navigation horizontale. La première section est « À propos » : portrait original, parcours Bénin → Maroc et **preuves immédiatement lisibles** (trois bronzes Kaggle/Zindi, 2e/77 African Credit Scoring et 4e/262 Financial Stress).

**Trois études de cas principales** ouvrent les projets : RiskSim, Financial Stress et GeoAI. Elles bénéficient d'un traitement visuel panoramique. Les huit réalisations suivantes ont des couvertures plus compactes. Les onze projets conservent néanmoins leurs **textes, méthodes, résultats, limitations et preuves directement dans leur propre chapitre** ; aucun second passage ni clic d'ouverture n'est nécessaire.

Chaque chapitre commence par un résultat ou un repère vérifié, suivi du contexte et d'un résumé. La colonne latérale comporte les repères techniques utiles. Les détails sont composés avec des lignes limitées à environ 68 caractères typographiques (68ch) pour faciliter la lecture. Le bronze est la couleur chaude réservée aux distinctions.

Les projets restent accessibles par les repères numérotés du rail latéral sur ordinateur ; les longs chapitres utilisent un défilement normal, avec `scroll-snap: proximity` à l'ouverture. Sur mobile, un menu explicite et un lien Contact visible remplacent la navigation tronquée.

## Réalisations (11)

1. RiskSim — simulation de risques et scénarios de coûts
2. Financial Stress — prédiction financière, 4e / 262
3. GeoAI — bassins aquacoles sur séries satellitaires, bronze Zindi
4. PediAppend — prototype académique avec explications SHAP
5. Autonomous AutoML — validation, reprise des expériences, 393 tests
6. NeuroGolf — raisonnement sur grilles, bronze Kaggle
7. African Credit Scoring — 2e / 77
8. WAXAL ASR — reconnaissance vocale, bronze Zindi
9. Feux intelligents — YOLOv8 et Raspberry Pi
10. Analyse Forex — protocole walk-forward et résultat négatif documenté
11. Propagation de solitons — expériences et simulation de 20 cellules

## Images et provenance

- `public/portrait-rudolf.webp` : portrait original en tête du site.
- `public/projects/risksim-dashboard.png` : **capture authentique montrée en grand dès l'ouverture de RiskSim** ; `risksim-results.png` en complément dans le même chapitre. Scénarios synthétiques.
- `public/projects/pediappend-interface-symptomes.jpg` : capture authentique en ouverture de PediAppend ; `shap_summary_bar.png` pour les analyses SHAP. Prototype académique sans validation clinique.
- Les autres projets ne disposent pas de captures applicatives certifiées dans ce dépôt : leurs images existantes demeurent des **photographies illustratives**, clairement légendées comme telles. Ne pas les présenter comme données, mesures ou captures du travail.
- `public/editorial-white/hero-panorama.svg` : ancien visuel désormais inutilisé. L'attribut de dégradé mal formé a été réparé afin que le SVG reste valide si réutilisé.

Le site ne comporte ni classements ni métriques inventés.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

`src/main.tsx` importe `src/WhiteEditorial.tsx` et `src/white-editorial.css`. Familles de typographie actives : Georgia (titres), DM Sans (texte) et DM Mono (métadonnées), avec leurs polices de repli. La dépendance Figtree n'est plus importée à l'exécution.

Accessibilité : libellés de navigation, menu mobile avec état `aria-expanded`, contraste des textes renforcé, mode `prefers-reduced-motion`, navigation clavier et liens d'évitement.

La diffusion publique actuelle reste sur `main`. Les changements de cette passe d'audit sont sur la branche `design/portfolio-audit-polish-20261018` jusqu'à validation visuelle.
