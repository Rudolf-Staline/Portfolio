# Horizontal — adaptation du portfolio

Référence choisie par Rudolf : **Horizontal**, Justin Farrugia.

- Modèle : https://www.framer.com/marketplace/templates/horizontal/
- Démonstration : https://horizontal.framer.website/

La composition reprend les caractéristiques visibles du modèle choisi : police Figtree, cartes blanches arrondies à bordure discrète, portrait compact et groupes de liens en bento. À la demande de Rudolf, le parcours utilise désormais le défilement vertical natif du document, avec les projets disposés en grille. Le contenu reste celui du portfolio étudiant, avec ses onze projets et ses trois médailles de bronze.

L’implémentation React et CSS est écrite dans ce dépôt. Ce n’est pas un export du projet Framer. Aucun code compilé, visuel de démonstration ou contenu personnel du modèle n’est repris. La sphère décorative est produite en SVG dans le composant React. Les illustrations et les captures sont les assets déjà présents dans le portfolio.

La molette, le pavé tactile et les touches de navigation conservent le comportement natif du navigateur. Aucun gestionnaire ne détourne le défilement ou le clavier pour déplacer la page latéralement. Les liens du menu atteignent les sections verticales, avec un espace réservé à l’en-tête. Le pied de page permet de revenir en haut. La page derrière une fiche ouverte est immobilisée jusqu’à sa fermeture.

Les onze projets ont une carte et une fiche native accessible au clavier. Les textes de `src/data/projectStories.ts`, les preuves et les limites documentées restent inchangés. Les captures RiskSim et les exports PediAppend restent distincts des illustrations créées par IA. Les scènes animées, les commandes de pause, le zoom et les galeries restent disponibles dans les fiches.

Les anciens liens vers les sections sont conservés. Les projets peuvent aussi s’ouvrir avec `#projet/<identifiant>`. Le thème clair est le choix initial ; un bouton permet le thème sombre, mémorisé localement si disponible. Les préférences de réduction des animations sont respectées.
