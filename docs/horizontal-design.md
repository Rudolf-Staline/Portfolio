# Horizontal — adaptation du portfolio

Référence choisie par Rudolf : **Horizontal**, Justin Farrugia.

- Modèle : https://www.framer.com/marketplace/templates/horizontal/
- Démonstration : https://horizontal.framer.website/

La composition reprend les caractéristiques visibles du modèle choisi : police Figtree, cartes blanches arrondies à bordure discrète, portrait compact et groupes de liens en bento. À la demande de Rudolf, le parcours utilise désormais le défilement vertical natif du document, avec les projets disposés en grille. Le contenu reste celui du portfolio étudiant, avec ses onze projets et ses trois médailles de bronze.

L’implémentation React et CSS est écrite dans ce dépôt. Ce n’est pas un export du projet Framer. Aucun code compilé, visuel de démonstration ou contenu personnel du modèle n’est repris. La sphère décorative est produite en SVG dans le composant React. Les illustrations et les captures sont les assets déjà présents dans le portfolio.

La molette, le pavé tactile et les touches de navigation conservent le comportement natif du navigateur. Aucun gestionnaire ne détourne le défilement ou le clavier pour déplacer la page latéralement. Les liens du menu atteignent les sections verticales, avec un espace réservé à l’en-tête. Le pied de page permet de revenir en haut. Les onze présentations de projets sont intégrées directement dans le document, sans fenêtre modale ni bouton de dépliage.

Les onze projets affichent tous les paragraphes de `src/data/projectStories.ts`, leur approche technique, leurs résultats, leurs limites, leurs technologies et les liens disponibles. Les deux captures RiskSim et les deux exports PediAppend sont visibles simultanément, avec leurs légendes. Les neuf scènes illustrées sont intégrées dans la page et s’animent seulement dans la zone visible ; une commande de pause reste disponible. Le portrait, les trois médailles, les descriptions complètes du parcours et les quatre groupes de compétences restent accessibles sans dépliage. Les cartes se développent naturellement en hauteur, sans texte tronqué ni défilement interne.

Les anciens liens vers les sections sont conservés. Les projets peuvent aussi être atteints directement avec `#projet/<identifiant>`. Les anciens liens `#fiche/about` et `#fiche/skills` conduisent aux sections correspondantes, maintenant affichées dans la page. Le thème clair est le choix initial ; un bouton permet le thème sombre, mémorisé localement si disponible. Les préférences de réduction des animations sont respectées.

La mise en page des présentations complètes se trouve dans `src/expanded.css`, importé après les styles des cartes et du défilement vertical. Sur mobile, visuels et textes suivent une seule colonne ; les galeries restent entièrement déployées.

## Pages illustrées et transitions

Les projets sont présentés comme de grandes pages numérotées. Le titre précède les visuels, désormais sur toute la largeur, puis les paragraphes complets et les résultats. Les captures RiskSim et les graphiques PediAppend gardent leur ratio et restent tous visibles. Sur ordinateur, les scènes passent de 420 px à environ 66 % de la hauteur de fenêtre ; elles occupent la largeur intérieure de la page.

`src/pages.css` ajoute une arrivée en perspective liée à la progression du défilement, une ombre de feuille, une barre de lecture et un en-tête de projet collant. Les animations CSS liées au défilement sont activées via `@supports` ; les autres navigateurs reçoivent une animation d’entrée à l’intersection. Aucun gestionnaire ne capture la molette, aucune hauteur de page n’est verrouillée, et aucun paragraphe n’est masqué. Le mode mouvement réduit désactive ces effets.

Les animations de signal et les balayages sont décoratifs, ne représentent pas de mesures et suivent la même commande de pause que l’image. Les animations hors champ sont suspendues. Tous les liens vers les projets, le thème et les 41 paragraphes restent disponibles.

## Ajustements des présentations RiskSim et PediAppend

RiskSim commence par la problématique et les quatre paragraphes de présentation. Les deux captures sont ensuite regroupées dans une section dédiée, côte à côte sur ordinateur et l’une après l’autre sur mobile. La carte compacte de l’accueil présente également le texte avant sa capture.

PediAppend montre désormais deux vues de son interface Flask, rendues à partir des templates du dépôt source : le formulaire de démographie et l’étape des symptômes. Aucune donnée patient ou prédiction n’est affichée. Les visuels SHAP/ROC sont conservés dans les assets ; la galerie privilégie l’interface. Voir `docs/pediappend-captures.md` pour la provenance.

## Occupation de l’écran

Le conteneur utilise la largeur disponible avec 16 px de marge de chaque côté sur ordinateur, sans plafond à 1 540 px. Les cartes de l’accueil occupent la hauteur de la fenêtre sous les 88 px du menu, avec 16 px de marge au-dessus et en dessous. Une hauteur minimale préserve la lisibilité sur les écrans courts. Sur mobile, la présentation remplit la première fenêtre, puis les autres cartes suivent le défilement vertical. Les images bénéficient de la largeur disponible ; les paragraphes gardent leur limite de longueur de ligne. Le patch d’animations de Claude est conservé.
