# Portfolio — Hounlete Koffi Rudolf

Portfolio personnel d'un élève ingénieur à l'École Centrale Casablanca (profil data engineering / ML / développement).

🔗 **Site live :** https://rudolf-hounlete-portfolio.vercel.app

![aperçu](docs/preview.png)
<!-- TODO: à confirmer par Rudolf — ajouter une capture d'écran à docs/preview.png -->

## Stack technique

Site statique, sans dépendance d'exécution ni build :

- **HTML** sémantique (un seul fichier `index.html`)
- **CSS** « maison » : design system à base de variables (couleurs, échelle typographique, rythme d'espacement 4/8 px, rayons et ombres), mode clair/sombre, responsive mobile-first
- **JavaScript** vanilla : thème clair/sombre (respect de `prefers-color-scheme` + persistance), navigation et section active, apparitions au scroll, rendu des certifications depuis une structure de données
- **Polices** : JetBrains Mono + Space Grotesk (Google Fonts)

## Déploiement

Hébergé sur **Vercel** en statique. Tout pousse depuis la racine du dépôt ; aucune étape de build n'est nécessaire.

## Prévisualisation locale

```bash
# Depuis la racine du dépôt
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Structure

```
.
├── index.html   # page unique (HTML + CSS + JS inline)
└── README.md
```
