# Rudolf Hounlete — Selected Work

Portfolio personnel de Rudolf Hounlete, élève ingénieur à Centrale Casablanca.

## Design — version blanche panoramique

Cette branche implémente la maquette blanche retenue : navigation discrète, typographie éditoriale, accueil avec un grand paysage, et **les onze projets présentés en lignes avec une image panoramique à gauche et leurs réalisations, technologies et résultats à droite**.

Les sections déroulantes cachées, carrousels à flèches et animations décoratives excessives ne sont pas utilisés. Chaque projet possède une **étude de cas intégralement visible en descendant la page**, avec méthode, résultats, limites, technologies et, lorsqu'elles existent, preuves et liens.

### Présentation uniforme des onze projets

Tous les projets sont réunis dans une seule section panoramique, sans zone « Et aussi » et sans différenciation entre projets principaux et secondaires :

1. RiskSim — simulation de risques projet
2. Financial Stress — prédiction financière
3. GeoAI — détection de bassins aquacoles
4. PediAppend — projet académique de machine learning, non clinique
5. Autonomous AutoML — automatisation et validation
6. NeuroGolf — raisonnement sur grilles colorées (Kaggle)
7. African Credit Scoring — risque de crédit (Zindi)
8. WAXAL ASR — reconnaissance vocale multilingue (Zindi)
9. Feux rouges intelligents — vision et maquette embarquée
10. Analyse Forex — backtesting et validation hors échantillon
11. Propagation de solitons — physique et simulation

Chaque projet constitue désormais **un chapitre autonome** : grande image panoramique et présentation courte, immédiatement suivies de la démarche technique, des choix, des résultats, des limites et des captures authentiques disponibles. Le visiteur passe ensuite directement au projet suivant — il n'a pas à parcourir les onze projets une première fois avant de retrouver leurs études de cas. Les liens « Lire la démarche » conduisent à la partie détaillée du même chapitre. Les distinctions Kaggle/Zindi, le parcours, les compétences et le contact restent accessibles ensuite.

## Images & provenance

- `public/editorial-white/hero-panorama.svg` : paysage panoramique **illustratif** conçu pour cette maquette.
- `public/editorial-white/financial-stress.svg` : représentation graphique conceptuelle d'une analyse transactionnelle, sans chiffres d'expérience inventés.
- `public/editorial-white/geoai.svg` : représentation conceptuelle du traitement d'images satellitaires, **pas une vraie image satellite**.
- `public/editorial-white/automl.svg` : représentation conceptuelle d'un pipeline, **pas une capture d'application**.
- `public/cinema/risksim-photo.webp` : illustration d'ouverture RiskSim, distincte des vraies captures dans l'étude de cas.
- `public/projects/risksim-dashboard.png` et `risksim-results.png` : captures authentiques sur scénarios synthétiques.
- `public/projects/pediappend-interface-symptomes.jpg` et `shap_summary_bar.png` : capture du prototype et graphique SHAP ; aucune validation clinique.
- `public/portrait-rudolf.webp` : portrait original conservé dans la section À propos.
- Les photographies des autres projets demeurent des **illustrations**, pas des preuves ou captures réelles.

Aucun résultat, classement ou métrique de maquette n’a été introduit dans les données du portfolio.

## Développement

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Le point d’entrée actif est `src/WhiteEditorial.tsx` depuis `src/main.tsx`, avec **une seule feuille de style active** : `src/white-editorial.css`. Les anciens composants et styles sont conservés pour revenir en arrière, mais ils ne sont plus chargés.

Le suivi du défilement évite les nouveaux rendus à chaque pixel, les révélations progressives utilisent IntersectionObserver et `prefers-reduced-motion` est respecté. Mise en page responsive, contrastes, focus clavier, descriptions textuelles et liens d'évitement prévus.

Le code RiskSim n'est pas public. Pas de liens artificiels pour les dépôts indisponibles.

**Site public actuel :** https://rudolf-hounlete-portfolio.vercel.app  
**Cette version :** branche GitHub `design/white-wide-editorial-20261017`, avec prévisualisation Vercel à valider avant fusion dans `main`.
