# Rudolf Hounlete — Selected Work

Portfolio personnel de Rudolf Hounlete, élève ingénieur à Centrale Casablanca.

## Design — version blanche panoramique

Cette version conserve l'esthétique blanche et éditoriale avec **les onze projets en chapitres panoramiques**, mais l'accueil est désormais directement la section **« À propos »** : portrait original de Rudolf, formation à Centrale Casablanca, parcours Bénin → Maroc, concours Kaggle/Zindi et liens vers les réalisations et le CV. L'ancienne section À propos, autrefois placée après les distinctions, a été retirée pour ne pas répéter le même contenu.

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

## Navigation page par page

Les projets ont retrouvé une **ouverture quasi plein écran** et une progression entre chapitres : navigation latérale en 11 repères numérotés sur ordinateur, lien vers le projet suivant en bas de chaque chapitre, défilement doux et `scroll-snap: proximity` sur bureau.

Les descriptions longues ne sont **pas** enfermées dans un écran ni soumises au défilement forcé : le lecteur continue naturellement à parcourir l'étude de cas avant d'atteindre le projet suivant. Le défilement par pages n'est pas imposé aux petits écrans et s'adapte à `prefers-reduced-motion`.

## Images & provenance

- `public/portrait-rudolf.webp` : **portrait original de Rudolf**, maintenant mis en valeur sur l'accueil et non une illustration générée. L'ancien panorama SVG reste dans le dépôt, mais n'est plus utilisé.
- `public/cinema/financial-photo.webp` : photographie illustrative de documents financiers.
- `public/cinema/geoai-aerial-photo.webp` : photographie illustrative de bassins aquacoles, **pas une image satellite tirée du projet**.
- `public/cinema/automl-photo.webp` : photographie illustrative d'un espace de développement, **pas une capture du modèle**.
- `public/cinema/risksim-photo.webp` : illustration d'ouverture RiskSim, distincte des vraies captures dans l'étude de cas.
- `public/projects/risksim-dashboard.png` et `risksim-results.png` : captures authentiques sur scénarios synthétiques.
- `public/projects/pediappend-interface-symptomes.jpg` et `shap_summary_bar.png` : capture du prototype et graphique SHAP ; aucune validation clinique.
- La navigation « À propos » revient en haut de page et la navigation « Accueil » redondante a été supprimée.
- Les photographies des autres projets demeurent des **illustrations**, pas des preuves ou captures réelles. Une légende dans le site indique explicitement la provenance de chaque grande image. Les anciens SVG conceptuels restent dans le dépôt mais ne sont plus affichés comme images des trois projets correspondants.

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
