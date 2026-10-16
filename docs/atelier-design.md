# Refonte Atelier

Le portfolio utilise une composition éditoriale claire, une typographie Manrope auto-hébergée et un accent cobalt. Variance 8, mouvement 5, densité 4. L'identité RH, les ancres historiques, les liens externes et les données de projet restent disponibles.

## Structure

Accueil avec portrait original, distinctions, projets détaillés, compétitions, parcours, formation, compétences et contact. Les onze projets apparaissent une seule fois. RiskSim et PediAppend utilisent des captures réelles, agrandissables au clavier dans une boîte de dialogue native. Les autres images sont des illustrations conceptuelles, identifiées comme telles.

Les styles actifs sont regroupés dans `src/atelier.css`. Les anciens fichiers CSS sont conservés pour référence mais ne sont plus importés. Aucune nouvelle dépendance runtime.

## Accessibilité et mouvement

Navigation par ancres, lien d'évitement, focus visible, thème système avec préférence persistée, fermeture de la galerie par Échap, restauration native du focus, animations réduites selon la préférence du système. Les transitions d'entrée utilisent IntersectionObserver ; aucun suivi du scroll en état React.

## Visuel généré

`public/atelier-wave.webp` : sculpture conceptuelle, produite avec l'outil intégré de génération d'images. Prompt : photographie éditoriale d'une sculpture en fines feuilles d'aluminium anodisé cobalt formant une onde continue, surface claire, lumière naturelle, sans texte ni écran. Il ne s'agit pas d'un résultat de simulation. Compression WebP à qualité 86.

## Vérification

`npm run build` vérifie les types et produit le bundle Vite. Les contrôles de navigateur portent sur les ancres, les images, l'absence de débordement horizontal, le mode sombre et la boîte de dialogue aux tailles desktop et mobile.

## Seconde passe

L'ouverture utilise désormais la sculpture bleue, avec un accès au portrait et au parcours. Les captures principales sont disposées à des échelles différentes. Les résumés et résultats de chaque projet sont visibles immédiatement ; les récits techniques complets restent accessibles dans des éléments `details` natifs. Les compétitions sont présentées en lignes avec classement, résumé, liens et illustration. Les résumés sont centralisés dans `src/data/projectBriefs.ts`.

Contrôles : quatre largeurs de 320 à 1440 px, aucune ancre ni image cassée, aucune erreur JavaScript, dialogue d'image et ouverture des notes au clavier vérifiés.
