# CV de Rudolf Hounlete

`content.json` contient les informations et les 14 projets du portfolio. `build_visual_cv.py`
produit le PDF graphique à trois pages. `build_cv.py` produit la version texte
Word modifiable, avec le portrait original conservé dans
`public/images/portrait.webp`. Les styles utilisent Arial et Georgia, afin de
faciliter la reprise du fichier sous Word.

## Reconstruction

1. Modifier les faits et les contributions dans `content.json`.
2. Exécuter `build_cv.py` avec le runtime Python principal et `python-docx`.
3. Rendre le DOCX avec le script `render_docx.py` du skill documents et son option
   `--emit_pdf` ; placer ce rendu temporaire hors du dépôt.
4. Examiner toutes les pages, vérifier la photo, les 14 titres, les liens et les
   ruptures de page. La version actuelle compte trois pages, sans projet coupé.
5. Pour le PDF graphique, exécuter `build_visual_cv.py` puis rendre et examiner
   ses trois pages. Ce PDF et la version Word reprennent les mêmes informations,
   avec des mises en page distinctes. Ne pas remplacer le PDF graphique par
   l’export de la version Word.

Le bouton du portfolio pointe toujours vers le PDF. Les titres des projets
renvoient aux dépôts ou classements publics lorsqu’ils sont disponibles.

## Points factuels à préserver

- RiskSim est un travail en binôme : Daniel Awaga a porté le moteur Python ;
  Rudolf a pris en charge le registre Excel, l’interface, les visualisations,
  l’analyse de sensibilité, la distribution Windows et sa documentation.
- Le Dossier Jaune est un prototype en cours ; BioHub est une baseline V0.
- Les classements et médailles sont distincts des résultats d’expériences locales.
- Les données du Churn Dashboard sont synthétiques et ses facteurs ne sont pas
  des explications causales ; PediAppend n’a pas de validation clinique.
- Le verdict négatif du backtest Forex est un résultat documenté.
- Ne pas réintroduire les projets exclus ni transformer les contributions en
  gains commerciaux, adoption client ou résultats non mesurés.
