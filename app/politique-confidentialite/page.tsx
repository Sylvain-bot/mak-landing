import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Mon Assistant Kiné",
  description: "Politique de confidentialité de Mon Assistant Kiné : données collectées, traitement par IA, partage, sécurité, conservation et droits RGPD.",
  alternates: { canonical: "https://www.monassistantkine.fr/politique-confidentialite" },
  openGraph: {
    title: "Politique de confidentialité — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/politique-confidentialite",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalLayout title="Politique de confidentialité" lastUpdated="7 juin 2026 — Version 3.3">
      <h2>Responsable du traitement</h2>
      <p>
        <strong>SAS Mon Assistant Kiné</strong>
        <br />
        Siège social : 7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
        <br />
        SIRET : 38936059900017
        <br />
        Email : monassistantkine.team@gmail.com
      </p>
      <p>
        La plateforme agit comme <strong>Responsable de Traitement</strong> pour les données du
        kinésithérapeute et comme <strong>Sous-traitant</strong> pour les données patients,
        conformément à l&apos;article 28 du RGPD.
      </p>

      <h2>Délégué à la protection des données (DPO)</h2>
      <ul>
        <li>Nom : Valentin JEAN</li>
        <li>Email : monassistantkine@gmail.com</li>
        <li>Désignation CNIL : 31/07/2025</li>
      </ul>

      <h2>Principes fondamentaux</h2>
      <p>
        Mon Assistant Kiné protège les données conformément au RGPD et aux exigences du secteur
        sanitaire, autour de six principes clés :
      </p>
      <ul>
        <li><strong>Transparence</strong> — information claire sur l&apos;utilisation des données</li>
        <li><strong>Minimisation</strong> — collecte limitée aux données nécessaires</li>
        <li><strong>Sécurité</strong> — chiffrement renforcé</li>
        <li><strong>Pseudonymisation</strong> — données patients pseudonymisées avant transmission à l&apos;IA</li>
        <li><strong>Contrôle</strong> — maîtrise par l&apos;utilisateur de ses données</li>
        <li><strong>Conformité HDS</strong> — hébergement certifié HDS sur Clever Cloud (France)</li>
      </ul>

      <h2>Données collectées</h2>

      <h3>1. Données du kinésithérapeute</h3>
      <p>
        Identité (nom, prénom, email), données professionnelles (numéro RPPS, adresse cabinet),
        données de compte (mot de passe chiffré, préférences), données d&apos;abonnement (plan
        choisi, historique paiement) et, pour le module Contrats, civilité, date et lieu de
        naissance, département de l&apos;Ordre, numéro d&apos;inscription à l&apos;Ordre, numéro
        URSSAF et adresse de domicile.
      </p>
      <p>
        Finalité : authentification, facturation, personnalisation, rédaction des contrats de
        remplacement et d&apos;assistanat libéral. Base légale : exécution du contrat
        (article 6.1.b du RGPD).
      </p>

      <h3>2. Données patients</h3>
      <p>
        Le service traite les données patients en qualité de Sous-traitant selon l&apos;article 28
        du RGPD. Le kinésithérapeute demeure Responsable de Traitement. Les conditions détaillées
        figurent dans le Contrat de Sous-traitance (DPA).
      </p>

      <h3>3. Données techniques</h3>
      <p>
        Données de connexion (adresse IP anonymisée, horodatage), navigation (pages visitées,
        durée de session), appareil (type de navigateur, système d&apos;exploitation) et
        performances (temps de réponse, erreurs techniques).
      </p>
      <p>
        Finalité : sécurité, amélioration du service, support technique. Base légale : intérêts
        légitimes (article 6.1.f du RGPD).
      </p>

      <h3>4. Données du module Contrats</h3>
      <p>
        Le service agit en qualité de Sous-traitant pour ces données selon l&apos;article 28 du
        RGPD, pour le compte du kinésithérapeute initiateur.
      </p>
      <p>
        <strong>Carnet d&apos;adresses kinés</strong> — prénom, nom, email, téléphone et notes
        concernant les confrères. Finalité : identification des destinataires de contrats. Base
        légale : intérêt légitime (article 6.1.f du RGPD). Le confrère est informé à l&apos;envoi
        de la première invitation et peut exercer ses droits d&apos;opposition ou de suppression
        auprès du kinésithérapeute initiateur ou directement auprès de Mon Assistant Kiné.
      </p>
      <p>
        <strong>Contenu du contrat et signataire</strong> — état civil des signataires (civilité,
        date et lieu de naissance, département de l&apos;Ordre, numéro d&apos;inscription à
        l&apos;Ordre, numéro URSSAF, adresses), conditions du contrat (dates, taux de
        rétrocession, indemnités, lieu de signature) et PDF final scellé du contrat signé.
        Finalité : rédaction, signature, archivage et déclaration du contrat au Conseil
        départemental de l&apos;Ordre. Base légale : exécution du contrat (article 6.1.b du
        RGPD) et obligation légale (article 6.1.c du RGPD, article R.4321-128 du Code de la
        santé publique).
      </p>
      <p>
        <strong>Preuves de signature</strong> — texte de signature et mention « Lu et approuvé »,
        horodatage, adresse IP et user-agent de chaque signataire, empreinte cryptographique
        SHA-256 du PDF final, journal d&apos;audit du contrat. Finalité : force probante de la
        signature électronique (règlement eIDAS, articles 1366-1367 du Code civil).
      </p>
      <p>
        <strong>Signataire en mode invité</strong> — un kinésithérapeute peut signer sans compte
        Mon Assistant Kiné. Les données d&apos;état civil sont conservées avec le contrat selon
        les durées légales. Le signataire invité peut exercer ses droits RGPD directement auprès
        de Mon Assistant Kiné avec l&apos;identifiant du contrat.
      </p>

      <h2>Utilisation des données</h2>
      <h3>Traitement par intelligence artificielle</h3>
      <p>
        Toutes les données patients transmises aux systèmes d&apos;IA (OpenAI, Mistral AI) font
        l&apos;objet d&apos;une pseudonymisation rigoureuse préalable : suppression des noms,
        prénoms, adresses et identifiants directs ; seules les informations strictement
        nécessaires sont transmises ; aucune donnée directement identifiante ne figure dans les
        prompts IA ; les données ne sont pas utilisées pour l&apos;entraînement des modèles ni
        stockées au-delà du traitement.
      </p>
      <p>
        La pseudonymisation n&apos;est pas une anonymisation au sens du RGPD : les données
        pseudonymisées restent des données personnelles.
      </p>
      <h3>Finalités du traitement</h3>
      <ul>
        <li>Service principal : gestion de la pratique professionnelle des kinésithérapeutes</li>
        <li>Assistance professionnelle : assistant IA et rédaction de bilans</li>
        <li>Suivi thérapeutique : historique des séances, évaluation des progrès</li>
        <li>Communication : chat sécurisé kiné-patient</li>
        <li>Module Contrats : rédaction, signature électronique, archivage, déclaration au CDO</li>
        <li>Facturation : gestion des abonnements et paiements</li>
        <li>Amélioration : analyse statistique anonymisée (optionnelle)</li>
        <li>Support : assistance technique et maintenance</li>
        <li>Conformité : respect des obligations légales</li>
      </ul>

      <h2>Partage des données</h2>
      <p>
        Les données sont partagées uniquement avec les destinataires strictement nécessaires,
        selon le principe de minimisation :
      </p>
      <table>
        <thead>
          <tr>
            <th>Destinataire</th>
            <th>Données concernées</th>
            <th>Finalité</th>
            <th>Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>OpenAI</td><td>Données patients pseudonymisées</td><td>Génération IA</td><td>Contrat + DPA</td></tr>
          <tr><td>Mistral AI</td><td>Données patients pseudonymisées</td><td>Génération IA</td><td>Contrat + DPA</td></tr>
          <tr><td>Stripe</td><td>Données de facturation</td><td>Paiements</td><td>Contrat</td></tr>
          <tr><td>Clever Cloud</td><td>Bases de données et serveurs applicatifs</td><td>Infrastructure HDS (France)</td><td>Contrat</td></tr>
          <tr><td>Vercel</td><td>Frontend statique uniquement</td><td>Interface web</td><td>Contrat</td></tr>
          <tr><td>Firebase (Google)</td><td>Données d&apos;authentification</td><td>Connexion sécurisée</td><td>Contrat</td></tr>
          <tr><td>Google Cloud Storage</td><td>Fichiers utilisateurs (avatars, GIFs d&apos;exercices, PDFs de contrats signés)</td><td>Stockage privé chiffré</td><td>Contrat</td></tr>
          <tr><td>Brevo (Sib SA, France)</td><td>Email, nom des signataires, PDF du contrat en pièce jointe</td><td>Envoi des invitations à signer et déclaration au CDO</td><td>Contrat</td></tr>
          <tr><td>Conseils départementaux de l&apos;Ordre des MK</td><td>Contrat signé complet (état civil, n° RPPS, n° ordinal, conditions)</td><td>Déclaration déontologique (article R.4321-128 du Code de la santé publique)</td><td>Obligation légale</td></tr>
        </tbody>
      </table>
      <p>Les données ne sont jamais vendues, louées, ni partagées à des fins commerciales ou publicitaires.</p>

      <h2>Sécurité et protection</h2>
      <h3>Mesures techniques</h3>
      <ul>
        <li>Chiffrement HTTPS/TLS pour tous les échanges</li>
        <li>Authentification Firebase avec tokens JWT sécurisés</li>
        <li>Hébergement certifié HDS (Clever Cloud, France)</li>
        <li>Accès restreint selon le principe du moindre privilège</li>
        <li>Surveillance, logs de sécurité et détection d&apos;intrusion</li>
        <li>Sauvegardes chiffrées quotidiennes</li>
        <li>Rate limiting contre les attaques par déni de service</li>
      </ul>
      <h3>Mesures organisationnelles</h3>
      <ul>
        <li>Formation du personnel à la protection des données</li>
        <li>Accès contrôlé avec identification unique par utilisateur</li>
        <li>Audits et révisions régulières des procédures</li>
        <li>Procédure de notification d&apos;incident sous 72h</li>
      </ul>

      <h2>Conservation des données</h2>
      <table>
        <thead>
          <tr><th>Type de données</th><th>Durée de conservation</th><th>Fondement</th></tr>
        </thead>
        <tbody>
          <tr><td>Compte kinésithérapeute</td><td>Durée de l&apos;abonnement + 3 ans</td><td>Obligations comptables</td></tr>
          <tr><td>Données patients</td><td>20 ans après la dernière consultation</td><td>Code de la santé publique (art. R.1112-7)</td></tr>
          <tr><td>Programmes d&apos;exercices</td><td>Durée du traitement + 20 ans</td><td>Dossier médical</td></tr>
          <tr><td>Historique de chat</td><td>Durée du programme + 20 ans</td><td>Suivi thérapeutique</td></tr>
          <tr><td>Données de facturation</td><td>10 ans</td><td>Code de commerce</td></tr>
          <tr><td>Logs techniques</td><td>1 an</td><td>Sécurité du système</td></tr>
          <tr><td>Cookies</td><td>13 mois maximum</td><td>CNIL</td></tr>
          <tr><td>Contrat signé (PDF + métadonnées)</td><td>10 ans après la fin du contrat</td><td>Prescription civile (art. 2224 Code civil) et obligation déontologique</td></tr>
          <tr><td>Preuves de signature (IP, user-agent, empreinte, journal d&apos;audit)</td><td>Identique au contrat signé</td><td>Force probante (eIDAS, art. 1366-1367 Code civil)</td></tr>
          <tr><td>Carnet d&apos;adresses kinés</td><td>Durée du compte du kinésithérapeute initiateur</td><td>Intérêt légitime</td></tr>
        </tbody>
      </table>
      <p>
        Le système procède automatiquement à l&apos;archivage des programmes terminés après 30
        jours d&apos;inactivité, à la pseudonymisation progressive des données anciennes, à la
        suppression définitive selon les délais légaux, avec notification préalable avant
        suppression.
      </p>

      <h2>Vos droits RGPD</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
      <ul>
        <li><strong>Droit d&apos;accès</strong> (article 15) — obtenir une copie de vos données</li>
        <li><strong>Droit de rectification</strong> (article 16) — corriger des données inexactes</li>
        <li><strong>Droit à l&apos;effacement</strong> (article 17) — suppression sous conditions</li>
        <li><strong>Droit à la limitation</strong> (article 18) — restreindre certains traitements</li>
        <li><strong>Droit à la portabilité</strong> (article 20) — récupérer vos données dans un format standard</li>
        <li><strong>Droit d&apos;opposition</strong> (article 21) — vous opposer à certains traitements</li>
        <li><strong>Droit de retrait du consentement</strong> — révoquer votre accord à tout moment</li>
      </ul>
      <p>
        Pour exercer ces droits, écrivez à monassistantkine@gmail.com avec pour objet « Demande
        d&apos;exercice de droits RGPD », en indiquant votre nom, prénom et email de compte, la
        nature de votre demande et, si nécessaire, un justificatif d&apos;identité. Délai de
        réponse : 1 mois maximum.
      </p>
      <p>
        Vous disposez également du droit de déposer une réclamation auprès de la CNIL — 3 Place
        de Fontenoy, TSA 80715, 75334 Paris Cedex 07 — www.cnil.fr.
      </p>

      <h2>Cookies et traceurs</h2>
      <p>
        Mon Assistant Kiné utilise des cookies strictement nécessaires au fonctionnement de la
        plateforme, ainsi qu&apos;un cookie de mesure d&apos;audience soumis à consentement
        explicite :
      </p>
      <table>
        <thead>
          <tr><th>Cookie</th><th>Finalité</th><th>Durée</th><th>Obligatoire</th></tr>
        </thead>
        <tbody>
          <tr><td>Auth Firebase</td><td>Authentification utilisateur</td><td>Session</td><td>Oui</td></tr>
          <tr><td>Stripe Session</td><td>Paiement sécurisé</td><td>24h</td><td>Oui (paiement)</td></tr>
          <tr><td>Theme</td><td>Préférence visuelle</td><td>1 an</td><td>Non</td></tr>
          <tr><td>cookie_consent</td><td>Mémorise le choix sur les cookies de mesure d&apos;audience</td><td>6 mois</td><td>Non</td></tr>
          <tr><td>_ga, _ga_*</td><td>Mesure d&apos;audience (Google Analytics 4) — déposés uniquement après consentement</td><td>13 mois</td><td>Non — soumis à consentement</td></tr>
        </tbody>
      </table>
      <p>
        <strong>Mesure d&apos;audience — Google Analytics 4 :</strong> sous-traitant Google
        Ireland Limited. Données collectées : identifiant client GA, pages vues, durée de
        session, événement d&apos;inscription, adresse IP anonymisée. Base légale : consentement
        (article 6.1.a du RGPD). Durée de conservation : 13 mois. Les données sont susceptibles
        d&apos;être transférées aux États-Unis dans le cadre du Data Privacy Framework (décision
        d&apos;adéquation de la Commission européenne du 10 juillet 2023). Mesures de
        protection : anonymisation de l&apos;IP, désactivation du partage avec Google Ads,
        absence de profilage publicitaire. Le consentement peut être retiré à tout moment via le
        lien « Gérer mes cookies » en bas de page.
      </p>
      <p>
        Mon Assistant Kiné n&apos;utilise pas de cookies publicitaires, de traceurs de réseaux
        sociaux, ni de cookies de profilage commercial, et ne partage pas les données GA4 avec
        Google Ads ou des annonceurs tiers.
      </p>

      <h2>Transferts internationaux</h2>
      <p>
        Les données sont hébergées en France : bases de données et serveurs applicatifs sur
        Clever Cloud (certifié HDS), fichiers utilisateurs sur Google Cloud Storage (région
        europe-west9, Paris). Le traitement IA est réalisé par Mistral AI, hébergé dans
        l&apos;Union européenne. OpenAI (États-Unis) est utilisé uniquement pour le traitement
        IA, avec des données pseudonymisées.
      </p>
      <p>
        Garanties pour les transferts vers les États-Unis : pseudonymisation systématique,
        Clauses Contractuelles Types (CCT), cadre d&apos;adéquation EU-US Data Privacy Framework
        (10 juillet 2023), minimisation des données transmises, et rétention des données
        désactivée sur le compte API OpenAI (zero data retention). Le détail des sous-traitants
        ultérieurs et des garanties associées est disponible dans le Contrat de Sous-traitance
        (DPA).
      </p>

      <h2>Mineurs</h2>
      <p>
        Le service est destiné exclusivement aux professionnels de santé diplômés. Pour les
        patients mineurs, le consentement des parents ou tuteurs légaux est requis, dans le
        respect de l&apos;article 8 du RGPD pour les mineurs de moins de 16 ans, avec une
        protection renforcée des données sensibles et un accès limité aux fonctionnalités de
        chat.
      </p>

      <h2>Évolutions de la politique</h2>
      <p>
        Cette politique peut être mise à jour pour refléter les évolutions réglementaires,
        améliorer la transparence ou intégrer de nouvelles fonctionnalités. Toute modification
        substantielle sera notifiée par email.
      </p>

      <h2>Contact et support</h2>
      <p>
        DPO : monassistantkine@gmail.com
        <br />
        Support : monassistantkine.team@gmail.com
        <br />
        Adresse : 7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
      </p>
      <p>
        Engagement de réponse : demandes RGPD — 72h pour l&apos;accusé de réception, 1 mois pour
        la réponse complète. Support général : 48h ouvrées.
      </p>
    </LegalLayout>
  );
}
