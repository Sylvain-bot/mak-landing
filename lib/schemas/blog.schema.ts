export const blogSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://www.monassistantkine.fr/blog#blog",
      "name": "Blog Mon Assistant Kiné",
      "description": "Ressources cliniques et pratiques pour kinésithérapeutes libéraux : IA clinique, bibliographie, bilans, pratique libérale. Rédigé par des kinésithérapeutes diplômés d'État.",
      "url": "https://www.monassistantkine.fr/blog",
      "inLanguage": "fr-FR",
      "publisher": { "@id": "https://www.monassistantkine.fr/#organization" },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.monassistantkine.fr" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.monassistantkine.fr/blog" },
      ],
    },
  ],
}
