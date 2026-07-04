# TODO-FONDATEUR — Actions humaines requises avant déploiement

> Ces items ne peuvent pas être complétés par l'IA. Chaque point nécessite ta validation.

---

## 🔴 BLOQUANT — À faire avant tout déploiement

### 1. Vérifier la garantie remboursement (`lib/claims.ts`)

```
GUARANTEE_TEXT = "Garantie 45 minutes : si tu ne récupères pas au moins 2 heures
ta première semaine d'abonnement, on te rembourse ton mois. Un mail suffit."
```

**Questions :**
- Cette garantie est-elle opérationnellement faisable ? (comment vérifier ?)
- Faut-il la limiter dans le temps (ex : "dans les 7 premiers jours") ?
- Avez-vous le process de remboursement en place ?

Si non, **commenter la ligne** dans `lib/claims.ts` avant deploy, ou remplacer par "Satisfait ou remboursé — contactez-nous".

---

### 2. Confirmer la comptabilité RGPD / Hébergement France (`lib/claims.ts`)

```
COMPLIANCE_CLAIM = "RGPD · Données de santé hébergées en France"
```

**Questions :**
- L'hébergement est-il réellement en France (pas simplement en Europe) ?
- Avez-vous un DPA (Data Processing Agreement) en place avec votre hébergeur ?
- Si hébergement en UE mais pas France spécifiquement → changer en `"RGPD · Données hébergées en Europe"`
- Si HDS (Hébergeur de Données de Santé) est certifié → alors tu peux ajouter `"· HDS"` (mais seulement si vous avez le certificat en main)

---

### 3. Compteur de places Pionnier — activer ou masquer

Dans `components/Pricing.tsx` et `app/tarifs/page.tsx`, le compteur de places restantes est **masqué** (feature flag commenté). Pour l'activer :
- Vérifier que vous avez une source de données fiable pour le nombre de places restantes
- Activer le compteur uniquement quand vous pouvez garantir la mise à jour en temps réel
- **Ne jamais afficher un chiffre inventé**

---

## 🟠 IMPORTANT — Contenu à valider/compléter

### 4. Témoignages (`components/Testimonials.tsx`)

Les témoignages actuels (Amandine S., Pierre L., Marion D., Clément B.) sont des données de bêta-test. **Avant de les garder en production :**
- Confirmer que ces personnes ont réellement dit ces phrases
- Obtenir leur accord écrit pour les utiliser publiquement avec leur prénom + ville
- Idéalement : ajouter une photo de profil pour chaque témoignage
- Idéalement : ajouter un résultat chiffré ("j'ai récupéré 40 min/jour")

Si ces témoignages ne sont pas vérifiables → les remplacer par un placeholder jusqu'à avoir de vrais retours.

---

### 5. Nombre de places Pionnier

Partout dans le site : `"100 places"` est affiché. 

**Questions :**
- Est-ce le bon nombre ? (100 inscrits au tarif 19€ ?  ou 100 premiers utilisateurs tous plans confondus ?)
- Si le nombre change (ex : déjà 30 vendus → "70 places restantes"), mettre à jour `components/Hero.tsx` et `components/Pricing.tsx`

---

### 6. Prix "après les 100 premiers" (`components/Pricing.tsx`)

Le plan Découverte à 9€ est présenté comme plan post-Pionnier. Est-ce correct ?
- Le plan Expert à 49€ remplace-t-il le plan Pionnier à 19€ après les 100 premiers ?
- La grille de 3 plans (Découverte/Pratique/Expert) est-elle la grille définitive ?

---

### 7. Contrats gratuits — titre dans la navbar

Ajouté dans la navbar desktop : **"Contrats gratuits"** → `/fonctionnalites/contrats-remplacement`.

Valider que cette fonctionnalité est bien 100% gratuite sans condition d'abonnement (actuellement affiché comme tel).

---

## 🔵 UTILE — À faire dès que possible

### 8. LinkedIn des fondateurs (`bio.schema.ts`)

Si tu as créé la page `schemas/bio.schema.ts` (tâches SEO CLAUDE.md), remplir :
```ts
const FOUNDER_1_NAME = "Prénom Nom Fondateur 1"    // ← à remplir
const FOUNDER_1_LINKEDIN = "https://linkedin.com/in/xxx"  // ← à remplir
const FOUNDER_2_NAME = "Prénom Nom Fondateur 2"    // ← à remplir
const FOUNDER_2_LINKEDIN = "https://linkedin.com/in/xxx"  // ← à remplir
```

---

### 9. Photo fondateurs page `/bio`

La page `/bio` mentionne les fondateurs. Ajouter :
- Photo professionnelle de chaque fondateur (ou photo au cabinet)
- Prénom + Nom complet
- Lien LinkedIn profil

---

### 10. Section "Notre histoire" page `/bio`

La page bio a des placeholders de contenu. Rédiger :
- Pourquoi vous avez créé MAK (3-5 phrases personnelles)
- Votre parcours kiné (année diplôme, type de patientèle, cabinet)
- Ce qui vous a convaincu que l'IA pouvait vraiment aider

---

## Résumé rapide

| # | Item | Urgence | Bloquant deploy ? |
|---|---|---|---|
| 1 | Valider garantie remboursement | 🔴 | Oui si pas de process |
| 2 | Confirmer hébergement France + RGPD | 🔴 | Oui |
| 3 | Compteur places Pionnier | 🟠 | Non (masqué) |
| 4 | Vérifier témoignages bêta | 🟠 | Non (mais risque légal) |
| 5 | Nombre de places exact | 🟠 | Non |
| 6 | Grille tarifaire post-100 | 🟠 | Non |
| 7 | Contrats gratuits confirmé | 🟠 | Non |
| 8 | LinkedIn fondateurs | 🔵 | Non |
| 9 | Photos fondateurs | 🔵 | Non |
| 10 | Contenu histoire page bio | 🔵 | Non |
