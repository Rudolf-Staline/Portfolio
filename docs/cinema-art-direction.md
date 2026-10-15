# Scènes de projets — direction cinématographique

La composition alterne des paysages illustrés et des sculptures de données en profondeur. Les scènes sont des illustrations du sujet, pas des captures de l’exécution des projets. Les captures RiskSim et les graphiques PediAppend restent accessibles dans leurs fiches.

## Décors

Images générées avec le générateur d’images intégré, puis copiées dans le projet :

- `public/cinema/geoai-aerial.png` — vue aérienne de bassins aquacoles au crépuscule.
- `public/cinema/traffic-night.png` — carrefour urbain après la pluie, à l’heure bleue.

### Brief GeoAI

Image panoramique cinématographique de bassins aquacoles vus en plongée oblique : géométrie imparfaite des digues, eau sombre vert pétrole, reflets cuivrés du coucher de soleil, texture du terrain et brume à l’horizon. Réserver une zone sombre en bas à gauche pour la typographie. Aucun texte, interface, logo ou résultat de détection dans l’image.

### Brief carrefour

Image panoramique photoréaliste d’un carrefour urbain à quatre branches à l’heure bleue après la pluie. Vue aérienne oblique, immeubles de hauteur moyenne, passages piétons, quelques voitures et traînées lumineuses, reflets des feux sur l’asphalte. Ombres bleu-vert, éclairage ambré et profondeur atmosphérique. Aucun texte, logo ou interface incrusté.

## Scènes procédurales

`CinematicCanvas.tsx` dessine une géométrie 3D projetée sur Canvas 2D : réseau de couches pour AutoML, rubans pour WAXAL et RiskSim, ligne de vingt cellules pour les solitons, composition de signaux pour les projets financiers et sphère de points pour PediAppend. La géométrie est illustrative et ne représente pas les données des modèles.

Les mouvements s’interrompent hors écran et avec le bouton Pause. `prefers-reduced-motion` conserve une vue statique. Le redimensionnement du canvas est observé ; le rendu est limité à environ 30 images par seconde et à un facteur de pixels de 1,5. Les scènes photographiques utilisent un mouvement de caméra CSS lent, une vignette et un grain léger. Vue rapprochée modifie le cadrage.

## Couverture complète des projets

Chaque projet et compétition présentés dans la page dispose maintenant d’une image propre, générée avec l’outil intégré et encodée en WebP pour la diffusion. Les onze images sont dans `public/cinema/` ; les originaux GeoAI et carrefour restent conservés.

| Projet | Image WebP | Brief du décor |
|---|---|---|
| AutoML | automl.webp | Processeur graphite et pistes de cuivre, macro cinématographique |
| WAXAL | waxal.webp | Microphone de studio, lumière latérale et matière de la capsule |
| RiskSim | risksim.webp | Sculpture de verre fumé évoquant une distribution d’incertitude |
| PediAppend | clinical.webp | Sonde d’échographie sur une console, salle médicale vide |
| Solitons | soliton.webp | Ligne de composants et bobines de cuivre dans un laboratoire |
| Forex | forex.webp | Poste d’analyse de marché, écrans défocalisés et ville nocturne |
| Stress financier | financial.webp | Reçus, portefeuille et feuilles mensuelles sur un bureau |
| NeuroGolf | neurogolf.webp | Tuiles de céramique colorées, métaphore de transformations de grilles |
| African Credit Scoring | credit.webp | Carte sans identité et documents, métaphore du risque de crédit |
| GeoAI | geoai-aerial.webp | Bassins aquacoles au crépuscule |
| Feux intelligents | traffic-night.webp | Carrefour urbain après la pluie |

Les briefs partagent un cadre horizontal 16:9, des matières réalistes, un éclairage cuivré et des ombres bleu-vert, avec un espace sombre à gauche pour la typographie. Aucun décor ne constitue une photographie du montage réel ou une capture des données de compétition. WAXAL, NeuroGolf et African Credit Scoring sont présentés dans la page, avec leur fiche détaillée.
