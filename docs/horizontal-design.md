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
