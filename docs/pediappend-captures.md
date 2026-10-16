# Vues de l’interface PediAppend

Source : `Rudolf-Staline/Coding-week-project`, commit `e694542c0e04ea18965f4bc8af6c06047353c007`.

Les deux vues sont rendues à partir de `app/templates/diagnosis.html`, du layout `base.html` et des feuilles de style du dépôt. Elles présentent le formulaire de démographie et l’étape des symptômes. Les formulaires restent vides ; aucun modèle n’est chargé, aucun patient ni résultat n’est inventé.

Les pages statiques de préparation sous `public/projects/pediappend-preview/` sont inertes, sans backend ni script applicatif. Elles servent uniquement à documenter l’interface. Les légendes des captures précisent qu’il s’agit d’un rendu des templates du prototype académique.

Les graphiques SHAP et ROC existants restent dans les assets et le dépôt du projet. La galerie du portfolio met désormais en avant l’interface.

## Révision de la galerie

La galerie associe maintenant la capture de l’étape Symptômes au graphique original `reports/images/shap_summary_bar.png`, déjà présent dans les assets du portfolio. Le graphique montre l’importance SHAP moyenne globale ; il ne représente pas une explication individuelle. La capture de démographie est conservée comme asset mais retirée de la galerie pour éviter deux vues de saisie similaires. Aucun résultat clinique ni score n’a été ajouté.
