import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { DEFAULT_OG_IMAGE, DEFAULT_TWITTER } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU) | Mon Assistant Kiné",
  description: "Conditions Générales d'Utilisation de Mon Assistant Kiné : accès, abonnements, obligations, module Contrats, propriété intellectuelle et résiliation.",
  alternates: { canonical: "https://www.monassistantkine.fr/cgu" },
  openGraph: {
    title: "Conditions Générales d'Utilisation — Mon Assistant Kiné",
    url: "https://www.monassistantkine.fr/cgu",
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: DEFAULT_TWITTER,
};

export default function CguPage() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" lastUpdated="7 juin 2026 — Version 3.2">
      <h2>Champ d&apos;application</h2>
      <p>
        Les présentes Conditions Générales d&apos;Utilisation définissent les conditions
        d&apos;accès et d&apos;utilisation de la plateforme Mon Assistant Kiné, proposée par la
        SAS du même nom. Elles s&apos;appliquent à tout utilisateur disposant d&apos;un compte
        professionnel.
      </p>
      <p>
        Ces CGU complètent les Conditions Générales de Vente pour les aspects commerciaux, la{" "}
        <a href="/politique-confidentialite">Politique de Confidentialité</a> pour la protection
        des données du kinésithérapeute, et le Contrat de Sous-traitance (DPA) pour le traitement
        des données patients.
      </p>

      <h2>1. Informations générales</h2>
      <h3>1.1 Éditeur</h3>
      <p>
        <strong>Mon Assistant Kiné (SAS)</strong>
        <br />
        SIRET : 38936059900017
        <br />
        Siège social : 7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
        <br />
        Président : Valentin JEAN
        <br />
        Directeur Général : Sylvain BAUX
        <br />
        Email : monassistantkine.team@gmail.com
      </p>

      <h2>2. Objet et acceptation</h2>
      <h3>2.1 Objet</h3>
      <p>
        Les CGU régissent l&apos;accès et l&apos;utilisation de la plateforme Mon Assistant
        Kiné, service destiné aux kinésithérapeutes pour l&apos;aide à la pratique
        professionnelle et le suivi de leurs patients via une intelligence artificielle
        conversationnelle.
      </p>
      <h3>2.2 Acceptation</h3>
      <p>
        L&apos;acceptation des présentes CGU, de la Politique de Confidentialité et du Contrat
        de Sous-traitance (DPA) est requise formellement lors de l&apos;inscription via des
        cases à cocher distinctes. Un horodatage est conservé comme preuve pour chaque document.
        L&apos;utilisation de la plateforme implique l&apos;acceptation pleine et entière de ces
        conditions. Si vous n&apos;acceptez pas ces conditions, vous ne devez pas utiliser le
        service.
      </p>

      <h2>3. Description du service</h2>
      <h3>3.1 Fonctionnalités principales</h3>
      <ul>
        <li>Interface kinésithérapeute : gestion des patients, création de programmes d&apos;exercices</li>
        <li>Génération de liens sécurisés : accès temporaire pour les patients</li>
        <li>Assistant IA professionnel, avec quota d&apos;utilisation quotidien selon le plan d&apos;abonnement</li>
        <li>Intégration WhatsApp : envoi de liens de programme</li>
        <li>Module Contrats : rédaction assistée, signature électronique simple et archivage des contrats de remplacement et d&apos;assistanat libéral, avec aide à la déclaration au Conseil départemental de l&apos;Ordre</li>
      </ul>

      <h3>3.2 Assistants IA disponibles</h3>
      <ul>
        <li><strong>Assistant IA kiné</strong> — chat unique destiné au kinésithérapeute, qui adapte automatiquement son registre à la question posée (conversationnel, recherche bibliographique ou analyse clinique), le diagnostic restant de la responsabilité exclusive du kinésithérapeute</li>
        <li><strong>IA de rédaction de bilans</strong> — assistance à la rédaction de bilans kinésithérapiques structurés, disponible selon le plan d&apos;abonnement</li>
        <li><strong>Module administratif</strong> — génération assistée de courriers et modèles de documents pour le cabinet, disponible selon le plan d&apos;abonnement</li>
        <li><strong>IA Patient</strong> — assistant accompagnateur pour les patients sur le programme de rééducation prescrit par leur kinésithérapeute (données pseudonymisées)</li>
      </ul>
      <p>
        <strong>Quota d&apos;utilisation :</strong> l&apos;assistant IA kiné est inclus dans tous
        les comptes, y compris gratuits. Son usage est régulé par un quota quotidien, mesuré en
        tokens, qui se renouvelle chaque jour et dont le volume varie selon le plan
        d&apos;abonnement. L&apos;utilisateur est informé lorsque son quota est atteint ;
        l&apos;accès à l&apos;assistant reprend le jour suivant, sans incidence sur les autres
        fonctionnalités.
      </p>
      <p>
        Toutes les données transmises aux assistants IA font l&apos;objet d&apos;une
        pseudonymisation rigoureuse. Aucune donnée directement identifiante (nom, prénom,
        adresse) n&apos;est communiquée aux systèmes d&apos;intelligence artificielle.
      </p>

      <h3>3.3 Public cible</h3>
      <p>Le service est exclusivement destiné aux kinésithérapeutes diplômés disposant d&apos;un numéro RPPS valide.</p>

      <h3>3.4 Évolution du service</h3>
      <p>
        Mon Assistant Kiné se réserve le droit de faire évoluer, modifier ou interrompre tout ou
        partie du service à tout moment, avec un préavis de 30 jours pour les modifications
        substantielles.
      </p>

      <h2>4. Conditions d&apos;accès et inscription</h2>
      <h3>4.1 Conditions d&apos;éligibilité</h3>
      <ul>
        <li>Être kinésithérapeute diplômé</li>
        <li>Disposer d&apos;un numéro RPPS valide</li>
        <li>Être majeur et capable juridiquement</li>
        <li>Accepter les présentes CGU, la Politique de Confidentialité et le Contrat de Sous-traitance (DPA)</li>
      </ul>
      <h3>4.2 Processus d&apos;inscription</h3>
      <ul>
        <li>Création de compte via Firebase Authentication</li>
        <li>Vérification des informations professionnelles</li>
        <li>Accès gratuit aux fonctionnalités de base</li>
        <li>Souscription optionnelle d&apos;un abonnement pour les fonctionnalités avancées</li>
      </ul>
      <h3>4.3 Véracité des informations</h3>
      <p>
        Vous vous engagez à fournir des informations exactes, complètes et à jour. Toute
        information erronée peut entraîner la suspension ou la résiliation de votre compte.
      </p>

      <h2>5. Plans d&apos;abonnement et tarification</h2>
      <h3>5.1 Usage gratuit</h3>
      <p>Fonctionnalités gratuites disponibles :</p>
      <ul>
        <li>Gestion illimitée des patients</li>
        <li>Création d&apos;exercices personnalisés</li>
        <li>Assistant IA kiné en usage découverte (quota quotidien réduit)</li>
        <li>Tableaux de bord et statistiques de base</li>
        <li>Module Contrats (rédaction, signature électronique, archivage et aide à la déclaration au CDO)</li>
        <li>Support par email</li>
      </ul>
      <p>Limitations : pas d&apos;accès aux programmes avec IA ni aux fonctionnalités avancées (rédaction de bilans, module administratif).</p>

      <h3>5.2 Plans d&apos;abonnement payants</h3>
      <table>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Prix TTC/mois</th>
            <th>Programmes avec IA</th>
            <th>Assistant IA (quota quotidien)</th>
            <th>Rédaction bilan</th>
            <th>Module administratif</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Découverte</td><td>9€</td><td>1 programme maximum</td><td>Usage de référence</td><td>—</td><td>—</td></tr>
          <tr><td>Pratique</td><td>29€</td><td>5 programmes maximum</td><td>3× l&apos;usage de référence</td><td>Incluse</td><td>—</td></tr>
          <tr><td>Pionnier</td><td>19€</td><td>Programmes illimités</td><td>10× l&apos;usage de référence</td><td>Incluse</td><td>Inclus</td></tr>
          <tr><td>Expert</td><td>49€</td><td>Programmes illimités</td><td>10× l&apos;usage de référence</td><td>Incluse</td><td>Inclus</td></tr>
        </tbody>
      </table>
      <p>
        <strong>Plan Pionnier — offre limitée :</strong> le plan Pionnier est limité aux 100
        premiers souscripteurs. Il s&apos;agit d&apos;une offre promotionnelle permettant
        d&apos;accéder aux fonctionnalités du plan Expert à un tarif préférentiel.
      </p>

      <h3>5.3 Modalités de paiement</h3>
      <ul>
        <li>Paiement exclusivement par carte bancaire via Stripe</li>
        <li>Prélèvement automatique le même jour chaque mois</li>
        <li>TVA applicable selon la réglementation en vigueur</li>
        <li>Facturation détaillée dans les Conditions Générales de Vente</li>
      </ul>

      <h3>5.4 Défaut de paiement</h3>
      <p>En cas d&apos;échec de paiement :</p>
      <ul>
        <li>Suspension immédiate de l&apos;accès aux fonctionnalités premium</li>
        <li>Notification par email avec délai de régularisation de 7 jours</li>
        <li>Résiliation définitive du compte passé ce délai</li>
        <li>Maintien de l&apos;accès aux fonctionnalités gratuites</li>
      </ul>

      <h2>6. Obligations et responsabilités</h2>
      <h3>6.1 Obligations du kinésithérapeute</h3>
      <p><strong>Utilisation professionnelle :</strong></p>
      <ul>
        <li>Utiliser le service dans le cadre exclusif de votre pratique professionnelle</li>
        <li>Respecter la déontologie de la profession de kinésithérapeute</li>
        <li>Valider la pertinence thérapeutique de tous les programmes créés</li>
      </ul>
      <p><strong>Sécurité du compte :</strong></p>
      <ul>
        <li>Maintenir la confidentialité de vos identifiants de connexion</li>
        <li>Signaler immédiatement tout usage non autorisé de votre compte</li>
        <li>Ne pas partager votre accès avec des tiers</li>
      </ul>
      <p><strong>Gestion des patients :</strong></p>
      <ul>
        <li>Obtenir le consentement éclairé de vos patients avant utilisation du service</li>
        <li>Vous assurer de la pertinence thérapeutique des programmes créés</li>
        <li>Assurer le suivi kinésithérapique approprié de vos patients</li>
      </ul>

      <h3>6.2 Obligations de Mon Assistant Kiné</h3>
      <ul>
        <li>Fournir l&apos;accès au service conformément aux fonctionnalités décrites</li>
        <li>Maintenir la sécurité et la confidentialité des données</li>
        <li>Assurer la pseudonymisation des données transmises à l&apos;IA</li>
        <li>Respecter les engagements de disponibilité selon les moyens techniques disponibles</li>
      </ul>

      <h3>6.3 Limitations de responsabilité</h3>
      <p>Mon Assistant Kiné ne saurait être tenu responsable :</p>
      <ul>
        <li>Des décisions thérapeutiques prises par le kinésithérapeute</li>
        <li>De l&apos;adéquation thérapeutique des programmes créés par le kinésithérapeute via la plateforme</li>
        <li>Des réponses et contenus générés par les assistants IA, qui constituent une aide à la décision et non un avis médical</li>
        <li>Du non-respect par les patients de leurs programmes</li>
        <li>Des conséquences thérapeutiques liées à l&apos;utilisation du service</li>
        <li>Des interruptions de service, pannes techniques ou dysfonctionnements</li>
        <li>De la perte de données due à des causes externes (panne internet, etc.)</li>
      </ul>
      <p>La responsabilité de Mon Assistant Kiné est limitée au montant de l&apos;abonnement mensuel en cours.</p>

      <h2>7. Utilisation acceptable</h2>
      <h3>7.1 Interdictions strictes</h3>
      <p>Il est formellement interdit de :</p>
      <ul>
        <li>Partager votre compte avec d&apos;autres praticiens ou personnes</li>
        <li>Vendre, céder ou transmettre les données patients à des tiers</li>
        <li>Utiliser le service à des fins commerciales autres que votre pratique</li>
        <li>Détourner l&apos;usage du chatbot pour des finalités non thérapeutiques</li>
        <li>Créer de faux profils patients ou programmes fictifs</li>
        <li>Utiliser des informations patients à des fins de recherche sans autorisation</li>
        <li>Signer un contrat sous une fausse identité ou pour le compte d&apos;un tiers, ce qui constitue un faux en écriture (article 441-1 du Code pénal)</li>
        <li>Utiliser le carnet d&apos;adresses kinés à des fins de prospection commerciale ou pour constituer un fichier cédé à des tiers</li>
        <li>Saisir les coordonnées d&apos;un confrère dans le carnet d&apos;adresses sans motif professionnel légitime</li>
        <li>Interférer avec le bon fonctionnement de la plateforme</li>
      </ul>
      <p>
        Usage interdit pour les patients : les patients n&apos;ont aucun accès direct à
        l&apos;interface professionnelle. Ils ne doivent en aucun cas utiliser l&apos;application
        pour poser un diagnostic ou modifier eux-mêmes un programme.
      </p>

      <h3>7.2 Utilisation des assistants IA</h3>
      <ul>
        <li>Les assistants ne doivent être utilisés que dans le cadre thérapeutique prévu</li>
        <li>Toute tentative de manipulation ou détournement est interdite</li>
        <li>L&apos;IA ne remplace en aucun cas le jugement thérapeutique du kinésithérapeute</li>
        <li>Le kinésithérapeute reste responsable de toutes les décisions thérapeutiques</li>
      </ul>

      <h3>7.3 Sanctions</h3>
      <ul>
        <li>1er manquement : avertissement par email</li>
        <li>Manquement grave ou répété : suspension temporaire du compte</li>
        <li>Manquement majeur : résiliation immédiate sans remboursement</li>
      </ul>

      <h2>8. Module Contrats</h2>
      <p>
        Le Module Contrats permet aux kinésithérapeutes de rédiger, signer électroniquement,
        archiver et déclarer au Conseil départemental de l&apos;Ordre (CDO) leurs contrats de
        remplacement et d&apos;assistanat libéral. Il est accessible à tous les utilisateurs,
        gratuits comme payants.
      </p>

      <h3>8.1 Signature électronique</h3>
      <p>
        La signature proposée par la plateforme est une signature électronique simple au sens du
        règlement (UE) n° 910/2014 (eIDAS) et des articles 1366 et 1367 du Code civil. Elle
        n&apos;est ni avancée, ni qualifiée. Elle est recevable comme moyen de preuve, étant
        entendu que sa force probante peut, le cas échéant, être appréciée par le juge.
      </p>
      <p>
        Mon Assistant Kiné agit en qualité de prestataire technique fournissant l&apos;outil de
        signature. La société n&apos;est pas un prestataire de services de confiance qualifié au
        sens d&apos;eIDAS.
      </p>
      <p>Pour chaque signature, les éléments de preuve suivants sont collectés et conservés avec le contrat :</p>
      <ul>
        <li>Identité déclarée du signataire (prénom, nom, e-mail) et, le cas échéant, identifiants du compte Mon Assistant Kiné rattaché</li>
        <li>Texte de signature saisi (« Prénom Nom ») et mention manuscrite équivalente (« Lu et approuvé »)</li>
        <li>Horodatage de la signature</li>
        <li>Adresse IP et type de navigateur du signataire (preuve de connexion)</li>
        <li>Journal d&apos;audit retraçant les étapes clés (envoi de l&apos;invitation, identification du destinataire, signatures successives, déclaration au CDO)</li>
      </ul>
      <p>
        En signant, le signataire s&apos;engage sur la sincérité de son identité et déclare avoir
        pris connaissance de l&apos;intégralité du contrat. Il reconnaît que toute signature
        falsifiée, faite sous une identité d&apos;emprunt ou pour le compte d&apos;un tiers sans
        pouvoir constitue un faux en écriture au sens de l&apos;article 441-1 du Code pénal.
      </p>
      <p>
        <strong>Signature en tant qu&apos;invité :</strong> un signataire peut signer sans
        disposer d&apos;un compte Mon Assistant Kiné. Dans ce cas, l&apos;acceptation des
        présentes CGU et de la Politique de Confidentialité, limitée au périmètre de la
        signature et de la conservation du contrat, est requise de manière formelle avant la
        signature.
      </p>

      <h3>8.2 Déclaration au Conseil départemental de l&apos;Ordre</h3>
      <p>
        Conformément à l&apos;article R.4321-128 du Code de la santé publique, le
        kinésithérapeute titulaire est tenu de communiquer son contrat de remplacement ou
        d&apos;assistanat libéral au Conseil départemental de l&apos;Ordre dont il dépend dans le
        mois qui suit la signature.
      </p>
      <p>
        La plateforme propose une fonction d&apos;envoi automatisé du contrat signé au CDO. Le
        titulaire doit valider l&apos;adresse du destinataire avant chaque envoi.
      </p>
      <p>
        <strong>Responsabilité du kiné :</strong> la fonction d&apos;envoi est un outil
        d&apos;aide. La responsabilité légale de la déclaration au CDO, ainsi que la vérification
        de sa bonne réception, incombent exclusivement au kinésithérapeute titulaire. Mon
        Assistant Kiné conserve la trace de l&apos;envoi pour audit mais ne se substitue en aucun
        cas à l&apos;obligation déontologique du praticien.
      </p>

      <h3>8.3 Conservation et accès au contrat signé</h3>
      <p>
        Une fois signé par les deux parties, le contrat est scellé et stocké de manière
        sécurisée. Il reste accessible aux deux signataires depuis leur interface respective, y
        compris :
      </p>
      <ul>
        <li>Pour un signataire ayant signé en invité, via une demande adressée à Mon Assistant Kiné</li>
        <li>Après la fin de l&apos;abonnement payant du kiné initiateur (l&apos;accès aux contrats déjà signés est maintenu sur le compte gratuit)</li>
        <li>Après suppression du compte, dans les limites des obligations légales</li>
      </ul>
      <p>
        Les durées de conservation sont précisées dans la Politique de Confidentialité. Elles
        tiennent compte de la force probante du contrat, des délais de prescription civile et des
        obligations déontologiques applicables.
      </p>

      <h2>9. Propriété intellectuelle</h2>
      <h3>9.1 Propriété des programmes et exercices</h3>
      <ul>
        <li>Les programmes et exercices créés par le kinésithérapeute demeurent sa propriété intellectuelle exclusive</li>
        <li>Le kinésithérapeute assume l&apos;entière responsabilité du contenu thérapeutique qu&apos;il crée</li>
        <li>Par l&apos;utilisation du service, le kinésithérapeute autorise Mon Assistant Kiné à utiliser ces contenus dans le cadre strict du fonctionnement de la plateforme</li>
      </ul>
      <h3>9.2 Propriété de la plateforme</h3>
      <ul>
        <li>La plateforme, son code source, son design et ses fonctionnalités sont la propriété exclusive de Mon Assistant Kiné</li>
        <li>Toute reproduction, copie ou utilisation non autorisée est interdite</li>
      </ul>
      <h3>9.3 Licence d&apos;utilisation</h3>
      <p>
        Mon Assistant Kiné accorde au kinésithérapeute une licence d&apos;utilisation non
        exclusive, non cessible et résiliable de la plateforme, strictement limitée à
        l&apos;usage professionnel prévu.
      </p>

      <h2>10. Protection des données</h2>
      <h3>10.1 Données du kinésithérapeute</h3>
      <p>
        Mon Assistant Kiné agit en qualité de Responsable de Traitement pour les données propres
        du kinésithérapeute (compte, facturation, données techniques). Le détail de ce
        traitement est décrit dans la Politique de Confidentialité.
      </p>
      <h3>10.2 Données patients</h3>
      <p>
        Mon Assistant Kiné agit en qualité de Sous-traitant au sens de l&apos;article 28 du RGPD
        pour le traitement des données patients saisies par le kinésithérapeute, lequel demeure
        Responsable de Traitement de ces données. Les données patients sont hébergées en France
        sur une infrastructure certifiée HDS (Clever Cloud). Les données transmises aux outils
        d&apos;intelligence artificielle font l&apos;objet d&apos;une pseudonymisation rigoureuse
        préalable.
      </p>
      <p>
        Les obligations respectives des parties sont détaillées dans le Contrat de Sous-traitance
        (DPA), qui complète les présentes CGU.
      </p>
      <h3>10.3 Droits RGPD</h3>
      <p>
        Les kinésithérapeutes disposent de tous les droits prévus par le RGPD, détaillés dans la
        Politique de Confidentialité. Pour les droits des patients, le kinésithérapeute est
        l&apos;interlocuteur principal en sa qualité de Responsable de Traitement, avec
        l&apos;assistance de Mon Assistant Kiné conformément au DPA.
      </p>

      <h2>11. Résiliation</h2>
      <h3>11.1 Résiliation par le kinésithérapeute</h3>
      <ul>
        <li>Résiliation libre possible à tout moment sans préavis ; l&apos;accès aux fonctionnalités payantes est maintenu jusqu&apos;à la fin de la période de facturation en cours</li>
        <li>À l&apos;issue de la période de facturation, retour automatique aux fonctionnalités gratuites</li>
        <li>Les patients gardent l&apos;accès jusqu&apos;à la fin naturelle de leur programme</li>
      </ul>
      <h3>11.2 Résiliation par Mon Assistant Kiné</h3>
      <p>Motifs de résiliation :</p>
      <ul>
        <li>Non-paiement après mise en demeure</li>
        <li>Violation grave des présentes CGU</li>
        <li>Utilisation frauduleuse ou illégale du service</li>
        <li>Perte de qualité professionnelle (radiation de l&apos;Ordre, etc.)</li>
      </ul>
      <h3>11.3 Effets de la résiliation</h3>
      <ul>
        <li>Suspension des fonctionnalités payantes à l&apos;issue de la période de facturation en cours</li>
        <li>Maintien des fonctionnalités gratuites</li>
        <li>Restitution ou suppression des données patients conformément au DPA</li>
        <li>Les patients gardent l&apos;accès jusqu&apos;à la fin naturelle de leur programme</li>
        <li>Les contrats déjà signés restent stockés et accessibles aux deux signataires pendant toute la durée légale de conservation, afin de préserver leur force probante et de répondre aux obligations déontologiques</li>
      </ul>

      <h2>12. Support et assistance</h2>
      <p>
        Contact support : monassistantkine.team@gmail.com (support technique, questions
        d&apos;utilisation, signalement de problèmes).
      </p>
      <ul>
        <li>Support disponible en français uniquement</li>
        <li>Assistance limitée aux questions techniques et d&apos;utilisation</li>
        <li>Délai de réponse : 48h ouvrées pour les utilisateurs gratuits</li>
        <li>Support prioritaire (24h) pour les plans payants Pratique, Pionnier et Expert</li>
      </ul>

      <h2>13. Disponibilité du service</h2>
      <ul>
        <li>Mon Assistant Kiné s&apos;efforce d&apos;assurer la meilleure continuité possible</li>
        <li>Le service peut être interrompu pour maintenance ou mise à jour</li>
        <li>Objectif de disponibilité : 99% sur une base mensuelle (hors maintenances programmées)</li>
        <li>Maintenance programmée notifiée par email lorsque possible ; maintenance d&apos;urgence sans préavis en cas de problème de sécurité ; fenêtre de maintenance de préférence entre 2h et 6h du matin</li>
      </ul>

      <h2>14. Modification des CGU</h2>
      <p>
        Mon Assistant Kiné se réserve le droit de modifier les présentes CGU à tout moment pour
        s&apos;adapter aux évolutions légales et réglementaires, améliorer le service et ses
        fonctionnalités, ou clarifier certaines dispositions. Toute modification substantielle
        sera notifiée par email et via la plateforme ; l&apos;acceptation explicite des nouvelles
        versions sera requise lors de la prochaine connexion pour continuer à utiliser le
        service.
      </p>

      <h2>15. Dispositions générales</h2>
      <p>Les présentes CGU sont soumises au droit français.</p>
      <p>
        En cas de litige, les tribunaux de Coutances (50200) seront seuls compétents, sauf pour
        les consommateurs qui peuvent saisir les tribunaux de leur domicile.
      </p>
      <p>
        Si une clause des présentes CGU était déclarée nulle ou non avenue, cela n&apos;affecterait
        pas la validité des autres dispositions.
      </p>
      <p>
        Mon Assistant Kiné ne pourra être tenu responsable d&apos;un manquement à ses obligations
        en cas de force majeure au sens du Code civil (catastrophe naturelle, cyberattaque,
        indisponibilité réseau indépendante de notre volonté, pandémie, décision gouvernementale,
        etc.).
      </p>
      <p>
        Les présentes CGU, ainsi que les Conditions Générales de Vente, la Politique de
        Confidentialité et le Contrat de Sous-traitance (DPA), constituent l&apos;intégralité de
        l&apos;accord entre les parties.
      </p>

      <h2>Contact</h2>
      <p>
        monassistantkine.team@gmail.com
        <br />
        7 Rue des Filatures, 50300 Saint-Senier-sous-Avranches
      </p>
    </LegalLayout>
  );
}
