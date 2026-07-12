# Mon Assistant Kiné — Landing Page

## Première installation sur un nouveau PC

Si ce dossier est vide (pas de `node_modules`, pas de `app/`), exécute ces étapes dans l'ordre :

1. Cloner le repo GitHub :
   ```
   git clone https://github.com/Sylvain-bot/mak-landing.git .
   ```
2. Installer les dépendances :
   ```
   npm install
   ```
3. Créer le fichier `.env.local` à la racine avec :
   ```
   BREVO_API_KEY=<demander la valeur à Sylvain ou la récupérer dans Vercel → Settings → Environment Variables>
   ```
4. Lancer le serveur de développement :
   ```
   npm run dev
   ```
   → Ouvre http://localhost:3000

**Credentials :**
- GitHub : compte `Sylvain-bot` — push sur `main` déclenche un déploiement Vercel automatique
- Vercel : https://vercel.com — projet `mak-landing`, déploie depuis la branche `main`
- Brevo : pour l'API email (clé dans `.env.local`)

---

## Contexte du projet

**Site :** https://www.monassistantkine.fr
**Repo :** https://github.com/Sylvain-bot/mak-landing
**Stack :** Next.js 16 App Router · TypeScript · Tailwind CSS · Framer Motion
**Hébergement :** Vercel (déploiement auto depuis `main`)

**Produit :** SaaS IA pour kinésithérapeutes libéraux français
**Fondateurs :** 2 kinésithérapeutes D.E. exerçant en libéral
**App :** https://app.monassistantkine.fr

---

## Structure du projet

```
app/                          → Pages (App Router Next.js)
  page.tsx                    → Homepage /
  bio/page.tsx                → Page à propos
  blog/                       → Blog
  fonctionnalites/            → Pages détail par fonctionnalité
  comparatif-outils-ia-kine/  → Page comparatif SEO
  replay/page.tsx             → Replay live de lancement
  tarifs/page.tsx             → Page tarifs

components/
  Hero.tsx                    → Section hero (vidéo + texte + stats)
  ToolsShowcase.tsx           → Section "Ce que ça fait" (5 onglets avec vidéos)
  MultiDevice.tsx             → Section "Disponible partout"
  TestimonialsCarousel.tsx    → Carrousel témoignages (flèches gauche/droite)
  Pricing.tsx                 → Section tarifs
  FAQ.tsx                     → FAQ accordéon
  CtaFinal.tsx                → CTA bas de page
  Footer.tsx                  → Footer (icônes Facebook + Instagram)
  Navbar.tsx                  → Navigation

public/
  video-bilan2.mp4            → Vidéo démo onglet Bilans
  copilote-video.mp4          → Vidéo démo onglet Copilote
  prog-suivi.mp4              → Vidéo démo onglet Suivi patient
  admini.mp4                  → Vidéo démo onglet Admin
  contrat.mp4                 → Vidéo démo onglet Contrats
  test-hero4.mp4              → Vidéo hero (animation téléphone)
  new_se-removebg-preview.png → Image section MultiDevice (fond supprimé)
  logo-mak.webp               → Logo

lib/
  claims.ts                   → Constantes CTA_SIGNUP_URL, prix, textes clés
  schemas/                    → Schemas JSON-LD pour SEO
```

---

## Conventions de code

- Pas de commentaires sauf si le pourquoi est non-évident
- **Couleurs :** teal `#3899aa`, dark `#0f172a`, light bg `#f0f9fa`, border `#d4ecea`
- **Animations :** Framer Motion — `ScrollReveal` pour les entrées scroll, `useInView` pour les stats
- **CTA signup :** toujours utiliser `CTA_SIGNUP_URL` depuis `@/lib/claims` (jamais hardcoder l'URL)
- **Vidéos :** H.264 obligatoire — H.265 (iPhone/Xbox Game Bar par défaut) = écran noir sur Chrome. Convertir via HandBrake ou VLC avant d'intégrer.
- **Images sans fond :** utiliser la version `-removebg` ou `mix-blend-mode: multiply` sur fond blanc

---

## État actuel du site (juillet 2026)

**Homepage (`/`) :**
- Hero : vidéo `test-hero4.mp4` animée + texte + stats (3 min / 2 min / 4h/sem)
- Témoignages : carrousel avec flèches
- ToolsShowcase : 5 onglets (Bilans / Copilote / Suivi patient / Admin / Contrats) chacun avec vidéo pleine hauteur en colonne droite
- MultiDevice : section "Sur tous tes appareils" avec image flottante animée
- "Ce qui est inclus" : liste bullet points
- Pricing : offre Pionnier 19€/mois + grille standard
- FAQ · CTA final · Footer

**Déploiement :**
Tout push sur `main` → déploiement automatique Vercel en ~2 minutes.

---

## Réseaux sociaux

- Facebook : https://www.facebook.com/profile.php?id=61577301783605
- Instagram : https://www.instagram.com/monassistantkine.fr/
