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
