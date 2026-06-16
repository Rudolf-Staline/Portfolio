# Portfolio — Rudolf Hounlete

Portfolio personnel d'un élève ingénieur à l'École Centrale Casablanca
(profil data engineering / ML / développement).

🔗 **Site live :** https://rudolf-hounlete-portfolio.vercel.app

## Stack

- **Vite + React + TypeScript** — application single-page, navigation par ancres.
- **Tailwind CSS** — design system par tokens (CSS variables) avec thème clair/sombre.
- **Polices** : Space Grotesk (titres), Inter (corps), JetBrains Mono (labels/code).
- **Déploiement** : Vercel (preset Vite, `vercel.json`).

## Contenu = source de vérité

Tout le contenu vit dans `src/data/` (fichiers typés), séparé du markup.
**Modifier un projet ou une certif = éditer la donnée, pas un composant.**

| Fichier | Contenu |
|---------|---------|
| `src/data/profile.ts` | Identité, à propos, contact (email, GitHub, LinkedIn, CV) |
| `src/data/projects.ts` | Les 4 projets (titre, tagline, bullets, stack, liens Code/Démo) |
| `src/data/skills.ts` | Compétences regroupées |
| `src/data/education.ts` | Formation |
| `src/data/certifications.ts` | Certifications & langues |
| `src/data/nav.ts` | Sections de navigation |
| `src/data/types.ts` | Types partagés |

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build de production -> dist/
npm run preview    # prévisualiser le build -> http://localhost:4173
```

## TODO (à compléter par Rudolf)

- [ ] **LinkedIn** : renseigner l'URL dans `src/data/profile.ts` (`contact.linkedin`).
- [ ] **CV PDF** : déposer le PDF dans `public/` puis pointer `contact.cv`
      (ex. `'/cv-rudolf-hounlete.pdf'`).
- [ ] **Projet 02 — Feux rouges** : ajouter le lien repo quand le projet est
      publié (`projects.ts`, projet `02`).
- [ ] **Démos** : ajouter les URLs de démo si disponibles (`projects.ts`).

## Liens repos confirmés

| # | Projet | Repo |
|---|--------|------|
| 01 | Aide à la décision clinique | `Rudolf-Staline/Coding-week-project` |
| 02 | Feux rouges intelligents | projet en cours (lien à venir) |
| 03 | Plateforme d'analyse Forex | `Rudolf-Staline/forex-supervised-scanner` |
| 04 | Clarté (Android) | `Rudolf-Staline/Clarte` |

## Historique

L'ancien site statique est conservé dans [`legacy/index.html`](legacy/index.html).
