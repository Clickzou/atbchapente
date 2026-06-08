# ATB Charpente — Site Next.js

Refonte du site [atb-charpente.fr](https://atb-charpente.fr) (anciennement WordPress/Elementor) en **Next.js + Tailwind CSS**.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- Images optimisées via `next/image`
- Déploiement cible : **Vercel** (domaine `atb-charpente.fr`)

## Démarrage

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Structure

```
src/
├─ app/
│  ├─ layout.tsx            # layout global (Header + Footer, SEO)
│  ├─ page.tsx              # accueil
│  ├─ [service]/page.tsx    # pages services (/charpente, /isolation, …)
│  ├─ realisations/         # galerie photos
│  ├─ blog/                 # blog (articles à importer)
│  ├─ contact/              # formulaire de contact
│  ├─ api/contact/          # endpoint d'envoi (à brancher sur Resend)
│  ├─ sitemap.ts / robots.ts
│  └─ mentions-legales/, politique-de-confidentialite/
├─ components/              # Header, Footer, ContactForm
└─ lib/site.ts             # config centrale (nav, services, communes, contact)
```

## À faire

- [ ] Importer le contenu réel depuis l'export WordPress (`.wpress`)
- [ ] Importer les articles de blog + mettre en place les redirections 301
- [ ] Brancher l'envoi d'email du formulaire (Resend — voir `.env.example`)
- [ ] Confirmer coordonnées, adresse, mentions légales, liste des communes
