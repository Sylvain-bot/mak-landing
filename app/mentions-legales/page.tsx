import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentions légales | Mon Assistant Kiné",
  description: "Mentions légales de Mon Assistant Kiné : éditeur, hébergement, propriété intellectuelle, données personnelles et contact.",
  alternates: { canonical: "https://www.monassistantkine.fr/mentions-legales" },
  openGraph: {
    title: "Mentions légales — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/mentions-legales",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout title="Mentions légales" lastUpdated="29 avril 2026">
      <h2>Éditeur du site / de l&apos;application</h2>
      <p>Mon Assistant Kiné est édité par :</p>
      <p>
        <strong>SAS Mon Assistant Kiné</strong>
        <br />
        Siège social : 7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
        <br />
        SIRET : 38936059900017
        <br />
        Capital social : 1 000 euros
        <br />
        Responsable de publication : Valentin JEAN
        <br />
        Contact : monassistantkine.team@gmail.com
      </p>
      <p>
        L&apos;application cible les masseurs-kinésithérapeutes diplômés en tant que service
        d&apos;aide professionnelle et n&apos;a pas vocation à délivrer de diagnostic médical.
      </p>

      <h2>Hébergement</h2>
      <h3>Infrastructure technique</h3>
      <ul>
        <li>Frontend : Vercel Inc.</li>
        <li>Backend &amp; base de données : Clever Cloud SAS, 3 Rue de l&apos;Allier, 44000 Nantes, France (certifié HDS)</li>
        <li>Conformité HDS : données hébergées en France sur infrastructure certifiée</li>
      </ul>

      <h2>Délégué à la protection des données (DPO)</h2>
      <ul>
        <li>Nom : Valentin JEAN</li>
        <li>Email : monassistantkine@gmail.com</li>
        <li>Enregistrement CNIL : 31/07/2025</li>
      </ul>

      <h2>Propriété intellectuelle</h2>
      <p>
        Le contenu, les marques, logos, textes et interfaces demeurent la propriété exclusive
        de la SAS Mon Assistant Kiné. Toute reproduction ou utilisation sans autorisation est
        interdite.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement des données personnelles est encadré par la{" "}
        <a href="/politique-confidentialite">Politique de confidentialité</a>. Les principes
        appliqués sont les suivants :
      </p>
      <ul>
        <li>Traitement fondé sur le consentement explicite du professionnel</li>
        <li>Absence de transmission à des tiers non autorisés</li>
        <li>Pseudonymisation des données transmises à l&apos;IA</li>
        <li>Conservation sécurisée selon les durées légales</li>
      </ul>

      <h2>Cookies</h2>
      <ul>
        <li>Cookies fonctionnels strictement nécessaires</li>
        <li>Cookies de paiement Stripe</li>
        <li>Cookies d&apos;audience Google Analytics 4 (consentement explicite requis)</li>
        <li>Absence de cookies publicitaires</li>
      </ul>

      <h2>Conditions d&apos;utilisation</h2>
      <p>L&apos;utilisation du service requiert l&apos;acceptation des :</p>
      <ul>
        <li><a href="/cgu">Conditions Générales d&apos;Utilisation (CGU)</a></li>
        <li>Conditions Générales de Vente (CGV)</li>
        <li><a href="/politique-confidentialite">Politique de Confidentialité</a></li>
        <li>Contrat de Sous-traitance (DPA)</li>
      </ul>

      <h2>Responsabilité</h2>
      <ul>
        <li>Mon Assistant Kiné constitue un outil d&apos;assistance</li>
        <li>La responsabilité thérapeutique reste entièrement celle du kinésithérapeute</li>
        <li>L&apos;IA ne pose aucun diagnostic</li>
        <li>Une validation par le professionnel est obligatoire avant toute utilisation patient</li>
      </ul>

      <h2>Droit applicable et juridiction</h2>
      <ul>
        <li>Droit applicable : droit français</li>
        <li>Juridiction compétente : tribunaux de Coutances (50200), sauf consommateurs</li>
      </ul>

      <h2>Contact et réclamations</h2>
      <p>
        monassistantkine.team@gmail.com
        <br />
        7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
        <br />
        Délai de traitement : lundi-vendredi, 48h ouvrées
      </p>

      <h2>Médiateur de la consommation</h2>
      <p>
        Centre de médiation et d&apos;arbitrage de Paris (CMAP)
        <br />
        39 avenue Franklin D. Roosevelt, 75008 Paris
      </p>
    </LegalLayout>
  );
}
