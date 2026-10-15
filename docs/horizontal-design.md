# Horizontal — adaptation du portfolio

Référence choisie par Rudolf : **Horizontal**, Justin Farrugia.

- Modèle : https://www.framer.com/marketplace/templates/horizontal/
- Démonstration : https://horizontal.framer.website/

La composition reprend les caractéristiques visibles du modèle choisi : police Figtree, cartes blanches arrondies à bordure discrète, portrait compact, groupes de liens en bento, parcours horizontal centré. Le contenu est celui du portfolio étudiant de Rudolf, avec ses onze projets et ses trois médailles de bronze.

L’implémentation React et CSS est écrite dans ce dépôt. Ce n’est pas un export du projet Framer. Aucun code compilé, visuel de démonstration ou contenu personnel du modèle n’est repris. La sphère décorative est produite en SVG dans le composant React. Les illustrations et les captures sont les assets déjà présents dans le portfolio.

Sur ordinateur, la molette verticale déplace le ruban horizontal. Le pavé tactile, les touches fléchées, Page précédente/suivante et les boutons de navigation restent disponibles. Sur téléphone, les cartes se lisent verticalement.

Les onze projets ont une carte et une fiche native accessible au clavier. Les textes de `src/data/projectStories.ts`, les preuves et les limites documentées restent inchangés. Les captures RiskSim et les exports PediAppend restent distincts des illustrations créées par IA. Les scènes animées, les commandes de pause, le zoom et les galeries restent disponibles dans les fiches.

Les anciens liens vers les sections sont conservés. Les projets peuvent aussi s’ouvrir avec `#projet/<identifiant>`. Le thème clair est le choix initial ; un bouton permet le thème sombre, mémorisé localement si disponible. Les préférences de réduction des animations sont respectées.
