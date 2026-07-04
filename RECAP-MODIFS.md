# RECAP-MODIFS — Audit Conversion (branche `audit-conversion`)

> Généré le 04/07/2026. Ces modifications sont **locales uniquement**, pas encore poussées ni déployées.

---

## Nouveaux fichiers

### `lib/claims.ts`
Centralise toutes les constantes marketing. Toute correction de chiffres se fait ICI uniquement.

| Constante | Valeur |
|---|---|
| `APP_URL` | `https://app.monassistantkine.fr` |
| `BILAN_TIME` | `3 minutes` |
| `ADMIN_TIME` | `2 minutes` |
| `TIME_SAVED_DAY` | `45 minutes par jour` |
| `TIME_SAVED_WEEK` | `4 heures par semaine` |
| `STUDY_COUNT` | `56 000+` |
| `PRICE_PIONNIER` | `19` |
| `CTA_MAIN` | `Tester sur mon prochain bilan — gratuit, sans CB` |
| `COMPLIANCE_CLAIM` | `RGPD · Données de santé hébergées en France` |
| `GUARANTEE_TEXT` | Garantie remboursement 45 min (voir fichier) |

---

## Modifications par fichier

### `components/Hero.tsx`
| Avant | Après |
|---|---|
| Badge : `"Offre Pionnier — Pour les 100 premiers · Lancé le 22/04/2026"` | `"Offre Pionnier — 100 places · Conçu par 2 kinés D.E."` |
| H1 : `"L'assistant IA des kinésithérapeutes — Bilans en 3 minutes"` | **`"Récupère 45 minutes par jour au cabinet."`** |
| Sous-titre : générique | Bilans 3 min, courriers 2 min, WhatsApp, 56 000+ études |
| CTA URL : `monassistantkine.vercel.app/signup` | `https://app.monassistantkine.fr/signup` (via `CTA_SIGNUP_URL`) |
| CTA texte : `"Créer mon compte gratuitement"` | `"Tester sur mon prochain bilan — gratuit, sans CB"` |
| TRUST badges : `["Sans carte bancaire", ...]` | Inclut `COMPLIANCE_CLAIM` |

### `app/page.tsx`
| Avant | Après |
|---|---|
| title : `"Mon Assistant Kiné — L'IA pour kinésithérapeutes"` | `"Mon Assistant Kiné — Récupère 45 min/jour au cabinet \| IA pour Kinésithérapeutes"` |
| description : générique | Bilans 3 min, admin 2 min, WhatsApp, copilote 56 000+ |
| Section conformité : `"HDS"` mentionné | Remplacé par `COMPLIANCE_CLAIM` (RGPD uniquement) |

### `components/Pricing.tsx`
| Avant | Après |
|---|---|
| Grille 4 plans côte à côte | **Deux étages** : bloc Pionnier en vedette (dark) + grille standard en dessous |
| Plan `"Déclic"` | Renommé `"Découverte"` |
| Aucune garantie | Bloc garantie remboursement sous le CTA |
| URLs : `vercel.app/signup` | `app.monassistantkine.fr/signup` |
| Label post-100 : absent | `"Après les 100 premiers inscrits"` visible |

### `app/tarifs/page.tsx`
| Avant | Après |
|---|---|
| Même structure que Pricing.tsx | Deux étages identiques + FAQ enrichie |
| FAQ : 5 questions | + `"Que se passe-t-il après les 100 premiers ?"` et ROI 45 min/19€ |
| URLs : `vercel.app` | `app.monassistantkine.fr` |

### `components/FAQ.tsx`
| Avant | Après |
|---|---|
| Réponse ROI : vague | ROI détaillé : 45 min/jour × 22 jours = ~16h/mois, à 19€/mois |
| Mention `"HDS"` | Supprimée — RGPD uniquement |

### `components/CtaFinal.tsx`
| Avant | Après |
|---|---|
| H2 : `"Ton prochain bilan en 3 minutes..."` | `"Récupère 45 minutes par jour. Dès ton prochain bilan."` |
| CTA texte : `"Créer mon compte gratuitement"` | `CTA_MAIN` |
| URL : `vercel.app/signup` | `CTA_SIGNUP_URL` |
| Aucune garantie | Bloc garantie remboursement avec icône Shield |
| Trust badges : `"HDS"` inclus | Remplacé par `"Conçu par deux kinés libéraux D.E."` + RGPD |

### `components/Navbar.tsx`
| Avant | Après |
|---|---|
| URLs login/signup : `vercel.app` | `app.monassistantkine.fr` |
| Bouton CTA : `"Créer mon compte"` | `"Tester gratuitement"` |
| Nav items : Fonctionnalités, Tarifs, Blog, Comparatif | + `"Contrats gratuits"` avec badge vert |

### `components/Footer.tsx`
| Avant | Après |
|---|---|
| Logo seul | + `"Conçu par deux kinésithérapeutes D.E. libéraux"` |
| Liens légaux seuls | + Section fonctionnalités (FEATURES_NAV exportée) |
| Copyright seul | + Note `"RGPD · Données hébergées en France"` |

### `components/Features.tsx`
Ajout sous le titre de section : `"Pose ta question comme à un confrère — réponse sourcée en 30 secondes."`

### `components/FeatureNav.tsx`
Bilans : `"en 5 minutes"` → `"en 3 minutes"`

### `components/Testimonials.tsx`
Ajout commentaire `{/* TODO-FONDATEUR */}` sur le besoin de vrais témoignages (voir TODO-FONDATEUR.md).

### `components/Results.tsx`
`"2h/semaine"` → `"45 minutes par jour"`

### `components/DemoVideo.tsx`
`"2h/semaine"` → `"45 minutes par jour"` / URL `vercel.app` → `app.monassistantkine.fr`

### `components/blog/BlogCta.tsx`
`"2h/semaine"` → `"4 heures par semaine"`

### `components/ContratSection.tsx`
URL `vercel.app` → `app.monassistantkine.fr`

### `app/fonctionnalites/contrats-remplacement/page.tsx`
Ajout d'une section cross-sell avant le CTA final : `"Pendant que ton remplaçant signe, découvre ce que MAK fait d'autre"`

### `app/fonctionnalites/documentation-bilan-kine/page.tsx`
`"5 minutes"` → `"3 minutes"` dans le schema JSON-LD, les STATS et le H1 de page

### `app/cgu/page.tsx`
Plan `"Déclic"` → `"Découverte"`

### 14 fichiers — remplacement global `vercel.app` → `app.monassistantkine.fr`
`app/bio/page.tsx`, `app/biomerci/page.tsx`, `app/comparatif-outils-ia-kine/page.tsx`, `app/equipe/page.tsx`, `app/fonctionnalites/aide-decision-clinique/page.tsx`, `app/fonctionnalites/contrats-remplacement/page.tsx`, `app/fonctionnalites/documentation-bilan-kine/page.tsx`, `app/fonctionnalites/gestion-administrative/page.tsx`, `app/fonctionnalites/suivi-patient/page.tsx`, `app/replay/page.tsx`, `components/ContratSection.tsx`, `components/DemoVideo.tsx`, `components/Navbar.tsx`, `components/Results.tsx`

### 5 fichiers — remplacement `"2h/semaine"` → `"45 minutes par jour"`
`app/bio/page.tsx`, `components/blog/BlogCta.tsx`, `components/DemoVideo.tsx`, `components/Results.tsx`

---

## Note technique — build local

Le build `npm run build` échoue sur `supabaseUrl is required` lors de la collecte des données de pages API. C'est un problème **pré-existant** : le `.env.local` local ne contient pas les variables Supabase (configurées uniquement sur Vercel). La compilation TypeScript réussit (`✓ Compiled`, `✓ TypeScript`). Ce n'est pas lié à nos changements. Le dev server (`npm run dev`) fonctionne normalement.
