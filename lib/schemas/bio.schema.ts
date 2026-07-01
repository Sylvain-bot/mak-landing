// ⚠️ REMPLIR CES 4 VALEURS AVANT DE DÉPLOYER
export const FOUNDER_1_NAME = "Sylvain"
export const FOUNDER_1_LINKEDIN = "https://www.linkedin.com/in/baux-sylvain-638206410/"
export const FOUNDER_2_NAME = "Valentin"
export const FOUNDER_2_LINKEDIN = ""

export const bioSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.monassistantkine.fr/bio#webpage",
      "name": "À propos — Mon Assistant Kiné",
      "description": "Découvrez Mon Assistant Kiné : deux kinésithérapeutes diplômés d'État qui ont créé l'IA pour transformer la pratique clinique des kinés libéraux.",
      "url": "https://www.monassistantkine.fr/bio",
      "isPartOf": { "@id": "https://www.monassistantkine.fr/#organization" },
    },
    {
      "@type": "Organization",
      "@id": "https://www.monassistantkine.fr/#organization",
      "name": "Mon Assistant Kiné",
      "url": "https://www.monassistantkine.fr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monassistantkine.fr/logo-mak.webp",
      },
      "description": "Éditeur de l'assistant IA pour kinésithérapeutes, fondé par deux kinésithérapeutes diplômés d'État exerçant en libéral en France.",
      "foundingDate": "2026",
      "founder": [
        {
          "@type": "Person",
          "@id": "https://www.monassistantkine.fr/bio#founder1",
          "name": FOUNDER_1_NAME,
          "jobTitle": "Kinésithérapeute D.E. & Co-fondateur",
          "knowsAbout": ["Kinésithérapie", "Raisonnement clinique", "Intelligence artificielle en santé"],
          "worksFor": { "@id": "https://www.monassistantkine.fr/#organization" },
          "sameAs": [FOUNDER_1_LINKEDIN],
        },
        {
          "@type": "Person",
          "@id": "https://www.monassistantkine.fr/bio#founder2",
          "name": FOUNDER_2_NAME,
          "jobTitle": "Kinésithérapeute D.E. & Co-fondateur",
          "knowsAbout": ["Kinésithérapie", "Raisonnement clinique", "Intelligence artificielle en santé"],
          "worksFor": { "@id": "https://www.monassistantkine.fr/#organization" },
          "sameAs": [FOUNDER_2_LINKEDIN],
        },
      ],
    },
  ],
}
