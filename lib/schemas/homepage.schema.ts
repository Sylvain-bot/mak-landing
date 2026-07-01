export const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.monassistantkine.fr/#software",
      "name": "Mon Assistant Kiné",
      "alternateName": "MAK",
      "description": "Assistant IA conçu exclusivement pour les kinésithérapeutes libéraux. Génère des bilans cliniques en 3 minutes, détecte les drapeaux rouges en temps réel et donne accès à plus de 56 000 ressources scientifiques validées.",
      "applicationCategory": "HealthcareApplication",
      "applicationSubCategory": "Clinical Decision Support",
      "operatingSystem": "Web",
      "url": "https://www.monassistantkine.fr",
      "inLanguage": "fr-FR",
      "availableLanguage": "French",
      "offers": {
        "@type": "Offer",
        "name": "Offre Pionnier",
        "price": "19",
        "priceCurrency": "EUR",
        "description": "Offre réservée aux 100 premiers inscrits — tarif garanti à vie",
      },
      "featureList": [
        "Génération de bilans cliniques en 3 minutes",
        "Détection des drapeaux rouges en temps réel",
        "Accès à 56 000+ ressources scientifiques (dont Cleland)",
        "Dictée vocale",
        "Export PDF",
        "Chatbot patient entre les séances",
        "Modèles personnalisables",
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "Kinésithérapeutes libéraux",
        "geographicArea": { "@type": "Country", "name": "France" },
      },
      "creator": { "@id": "https://www.monassistantkine.fr/#organization" },
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
      "description": "Éditeur de l'assistant IA pour kinésithérapeutes, fondé par deux kinésithérapeutes diplômés d'État exerçant en libéral.",
      "foundingDate": "2024",
      "inLanguage": "fr-FR",
      "areaServed": "FR",
      "sameAs": [],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce que Mon Assistant Kiné ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mon Assistant Kiné est un assistant IA conçu exclusivement pour les kinésithérapeutes libéraux. Il génère des bilans cliniques en 3 minutes, détecte les drapeaux rouges en temps réel et donne accès à plus de 56 000 ressources scientifiques validées, dont les ouvrages de Cleland.",
          },
        },
        {
          "@type": "Question",
          "name": "Comment Mon Assistant Kiné réduit-il le temps de bilan ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L'IA guide le kinésithérapeute à travers un processus structuré de raisonnement clinique. En intégrant les données du patient, elle génère un bilan complet en 3 minutes au lieu de 18 à 25 minutes en moyenne.",
          },
        },
        {
          "@type": "Question",
          "name": "Mon Assistant Kiné est-il conforme au RGPD ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mon Assistant Kiné est conçu pour respecter les exigences RGPD applicables aux professionnels de santé en France. Les données des patients ne sont jamais utilisées pour entraîner des modèles IA tiers. Hébergement en Europe.",
          },
        },
        {
          "@type": "Question",
          "name": "Quel est le prix de Mon Assistant Kiné ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "L'offre Pionnier est disponible à 19 €/mois (au lieu de 49 €) pour les 100 premiers inscrits, avec garantie à vie du tarif. Un accès gratuit est disponible pour tester la plateforme.",
          },
        },
        {
          "@type": "Question",
          "name": "Pour quel type de kinésithérapeutes est conçu Mon Assistant Kiné ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mon Assistant Kiné est conçu pour les kinésithérapeutes libéraux souhaitant allier rigueur clinique et efficacité administrative, sans sacrifier la qualité des soins.",
          },
        },
      ],
    },
  ],
}
