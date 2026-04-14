import FooterSection from '@/components/FooterSection';
import { Link } from '@/i18n/navigation';

type Locale = 'nl' | 'en' | 'fr' | 'de';

interface PrivacyContent {
  metaTitle: string;
  metaDescription: string;
  backLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  version: string;
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
}

const CONTACT = {
  phone: '+31 682 595 605',
  phoneHref: 'tel:+31682595605',
  emailInfo: 'info@foodmarkt.com',
  address: 'Blankenstein 265, 7943 PG Meppel, Nederland',
  kvk: '78333490',
  vat: 'NL861353730B01',
  domain: 'office.hongigebeer.nl',
  apAuthority: 'https://autoriteitpersoonsgegevens.nl',
};

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[#ed8788] hover:underline font-semibold">
    {children}
  </a>
);
const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-[#ed8788] hover:underline font-semibold" target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function getContent(locale: Locale): PrivacyContent {
  if (locale === 'nl') {
    return {
      metaTitle: 'Privacybeleid – Hongerige Beer',
      metaDescription: 'Privacybeleid van Foodmarkt BV (Hongerige Beer) – hoe wij uw persoonsgegevens verwerken conform de AVG.',
      backLabel: 'Startpagina',
      pageTitle: 'Privacybeleid',
      pageSubtitle: 'Verwerking en bescherming van persoonsgegevens\nFoodmarkt BV · Hongerige Beer',
      version: 'Versie: april 2026 · Foodmarkt BV · KVK 78333490',
      sections: [
        {
          title: '1. Verwerkingsverantwoordelijke',
          content: (
            <>
              <p>De verwerkingsverantwoordelijke voor uw persoonsgegevens is:</p>
              <ul className="list-none pl-0 space-y-1 not-prose mt-3">
                <li><strong>Foodmarkt BV</strong> (handelend onder de naam Hongerige Beer)</li>
                <li>{CONTACT.address}</li>
                <li>KVK: <strong>{CONTACT.kvk}</strong></li>
                <li>BTW: <strong>{CONTACT.vat}</strong></li>
                <li>E-mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                <li>Telefoon: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
              </ul>
              <p className="mt-3">
                Foodmarkt BV verwerkt uw persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR) en de Uitvoeringswet Algemene verordening gegevensbescherming (UAVG). Wij beschermen uw gegevens met passende technische en organisatorische maatregelen.
              </p>
            </>
          ),
        },
        {
          title: '2. Welke gegevens verzamelen wij',
          content: (
            <>
              <p>Bij het plaatsen van een bestelling of aanmaken van een account verwerken wij onder meer:</p>
              <ul className="list-[lower-alpha] pl-5 space-y-1 mt-2">
                <li>voor- en achternaam</li>
                <li>e-mailadres</li>
                <li>telefoonnummer</li>
                <li>bezorg- en factuuradres</li>
                <li>bedrijfsnaam en BTW-nummer (voor zakelijke klanten)</li>
                <li>betaalgegevens (verwerkt via Stripe – wij slaan geen volledige kaartgegevens op)</li>
                <li>bestelgeschiedenis</li>
                <li>communicatiegegevens (e-mail, supportberichten)</li>
              </ul>
            </>
          ),
        },
        {
          title: '3. Doeleinden en grondslagen van verwerking',
          content: (
            <ul className="list-[lower-alpha] pl-5 space-y-2">
              <li><strong>Uitvoering van de overeenkomst</strong> (art. 6 lid 1 sub b AVG) – verwerking van bestellingen, bezorging, facturatie en klantenservice.</li>
              <li><strong>Wettelijke verplichting</strong> (art. 6 lid 1 sub c AVG) – bewaren van boekhoudkundige documenten conform de fiscale bewaarplicht (7 jaar).</li>
              <li><strong>Gerechtvaardigd belang</strong> (art. 6 lid 1 sub f AVG) – beveiliging van de website, fraudepreventie, verbetering van onze diensten en directe marketing aan bestaande klanten.</li>
              <li><strong>Toestemming</strong> (art. 6 lid 1 sub a AVG) – verzending van nieuwsbrieven en commerciële e-mails. U kunt uw toestemming te allen tijde intrekken.</li>
            </ul>
          ),
        },
        {
          title: '4. Ontvangers van uw gegevens',
          content: (
            <>
              <p>Uw gegevens kunnen worden gedeeld met de volgende categorieën ontvangers:</p>
              <ul className="list-[lower-roman] pl-5 space-y-1 mt-2">
                <li><strong>Stripe, Inc.</strong> – verwerking van online betalingen (creditcard, iDEAL)</li>
                <li><strong>Supabase, Inc.</strong> – databasediensten en gebruikersauthenticatie</li>
                <li><strong>Resend, Inc.</strong> – verzending van transactionele e-mails</li>
                <li><strong>PostHog, Inc.</strong> – productanalyse en gebruiksstatistieken</li>
                <li><strong>Functional Software, Inc. (Sentry)</strong> – monitoring van applicatiefouten</li>
                <li>Bezorgpartners en logistieke dienstverleners</li>
                <li>Accountants- en belastingadvieskantoren</li>
                <li>Bevoegde overheidsinstanties (op wettelijke grondslag)</li>
              </ul>
            </>
          ),
        },
        {
          title: '5. Doorgifte buiten de EER',
          content: (
            <p>
              Sommige van bovengenoemde verwerkers (o.a. Stripe, Supabase, PostHog, Sentry, Resend) zijn gevestigd buiten de Europese Economische Ruimte (EER), met name in de Verenigde Staten. De doorgifte vindt plaats op basis van door de Europese Commissie goedgekeurde standaard contractsbepalingen (SCC) of het Data Privacy Framework (DPF). Meer informatie is verkrijgbaar via <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.
            </p>
          ),
        },
        {
          title: '6. Bewaartermijnen',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Bestellings- en klantgegevens: zolang de overeenkomst loopt en daarna tot het verstrijken van de verjaringstermijn voor vorderingen (maximaal 5 jaar na het laatste contact).</li>
              <li>Financiële en boekhoudkundige gegevens: 7 jaar conform de fiscale bewaarplicht.</li>
              <li>Marketinggegevens (op basis van toestemming): tot intrekking van de toestemming.</li>
            </ul>
          ),
        },
        {
          title: '7. Uw rechten',
          content: (
            <>
              <p>Op grond van de AVG heeft u de volgende rechten:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Recht op inzage</strong> – u kunt een kopie opvragen van de persoonsgegevens die wij van u verwerken.</li>
                <li><strong>Recht op rectificatie</strong> – u kunt onjuiste of onvolledige gegevens laten corrigeren.</li>
                <li><strong>Recht op verwijdering</strong> ("recht op vergetelheid") – u kunt verzoeken uw gegevens te verwijderen, voor zover geen wettelijke bewaarplicht van toepassing is.</li>
                <li><strong>Recht op beperking</strong> – u kunt de verwerking tijdelijk laten beperken.</li>
                <li><strong>Recht op overdraagbaarheid</strong> – u kunt uw gegevens in een gestructureerd, veelgebruikt formaat ontvangen.</li>
                <li><strong>Recht van bezwaar</strong> – u kunt bezwaar maken tegen verwerking op grond van gerechtvaardigd belang of directe marketing.</li>
                <li><strong>Recht op intrekking van toestemming</strong> – eerder gegeven toestemming kan te allen tijde worden ingetrokken.</li>
              </ul>
              <p className="mt-3">
                Verzoeken kunt u indienen via <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>. Wij reageren binnen 1 maand (verlengbaar met 2 maanden bij complexe verzoeken).
              </p>
              <p className="mt-2">
                U heeft tevens het recht een klacht in te dienen bij de <strong>Autoriteit Persoonsgegevens</strong>: <Ext href={CONTACT.apAuthority}>autoriteitpersoonsgegevens.nl</Ext>.
              </p>
            </>
          ),
        },
        {
          title: '8. Cookies en trackingtechnologieën',
          content: (
            <>
              <p>Wij maken gebruik van cookies en vergelijkbare technologieën:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Technische (noodzakelijke) cookies</strong> – nodig voor het functioneren van de website (sessie, winkelwagen, authenticatie via Supabase, betaling via Stripe). Geen toestemming vereist.</li>
                <li><strong>Analytische cookies</strong> – PostHog en Sentry voor gebruiksstatistieken en foutopsporing. Worden geanonimiseerd verwerkt waar mogelijk.</li>
                <li><strong>Functionele cookies</strong> – onthouden uw taalvoorkeur en andere instellingen.</li>
                <li><strong>Marketingcookies</strong> – alleen geplaatst na uw uitdrukkelijke toestemming.</li>
              </ul>
              <p className="mt-3">
                U kunt uw cookievoorkeuren te allen tijde aanpassen via de cookiebanner of de instellingen van uw browser.
              </p>
            </>
          ),
        },
        {
          title: '9. Beveiliging',
          content: (
            <p>
              Foodmarkt BV treft passende technische en organisatorische maatregelen ter bescherming van uw persoonsgegevens, waaronder versleuteld datatransport (HTTPS/TLS), beperkte toegangsrechten en periodieke beveiligingsbeoordelingen. In geval van een datalek dat uw rechten ernstig bedreigt, worden u en de Autoriteit Persoonsgegevens zo spoedig mogelijk geïnformeerd.
            </p>
          ),
        },
        {
          title: '10. Nieuwsbrief',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Met uw toestemming sturen wij u commerciële e-mails en nieuwsbrieven over ons aanbod.</li>
              <li>U kunt zich te allen tijde afmelden via de afmeldlink onderaan elke e-mail of door contact op te nemen via <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
            </ul>
          ),
        },
        {
          title: '11. Wijzigingen in dit beleid',
          content: (
            <p>
              Wij behouden ons het recht voor dit privacybeleid te allen tijde aan te passen. Wezenlijke wijzigingen worden op de website bekendgemaakt en, indien van toepassing, per e-mail aan bestaande klanten gecommuniceerd. De datum van de laatste herziening staat onderaan dit document.
            </p>
          ),
        },
        {
          title: '12. Contact',
          content: (
            <p>
              Voor vragen over dit privacybeleid of over de verwerking van uw persoonsgegevens kunt u contact opnemen via{' '}
              <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> of per post: Foodmarkt BV, {CONTACT.address}.
            </p>
          ),
        },
      ],
    };
  }

  if (locale === 'fr') {
    return {
      metaTitle: 'Politique de confidentialité – Hongerige Beer',
      metaDescription: 'Politique de confidentialité de Foodmarkt BV (Hongerige Beer) – traitement de vos données personnelles conformément au RGPD.',
      backLabel: 'Accueil',
      pageTitle: 'Politique de confidentialité',
      pageSubtitle: 'Traitement et protection des données personnelles\nFoodmarkt BV · Hongerige Beer',
      version: 'Version : avril 2026 · Foodmarkt BV · KVK 78333490',
      sections: [
        {
          title: '1. Responsable du traitement',
          content: (
            <>
              <p>Le responsable du traitement de vos données personnelles est :</p>
              <ul className="list-none pl-0 space-y-1 not-prose mt-3">
                <li><strong>Foodmarkt BV</strong> (agissant sous le nom Hongerige Beer)</li>
                <li>{CONTACT.address}</li>
                <li>KVK : <strong>{CONTACT.kvk}</strong></li>
                <li>TVA : <strong>{CONTACT.vat}</strong></li>
                <li>E-mail : <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                <li>Téléphone : <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
              </ul>
              <p className="mt-3">
                Foodmarkt BV traite vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi néerlandaise d'application (UAVG). Nous protégeons vos données par des mesures techniques et organisationnelles appropriées.
              </p>
            </>
          ),
        },
        {
          title: '2. Données collectées',
          content: (
            <>
              <p>Lors de la passation d'une commande ou de la création d'un compte, nous traitons notamment :</p>
              <ul className="list-[lower-alpha] pl-5 space-y-1 mt-2">
                <li>nom et prénom</li>
                <li>adresse e-mail</li>
                <li>numéro de téléphone</li>
                <li>adresse de livraison et de facturation</li>
                <li>nom de la société et numéro de TVA (pour les clients professionnels)</li>
                <li>données de paiement (traitées via Stripe – nous ne stockons pas les données complètes de carte)</li>
                <li>historique des commandes</li>
                <li>données de communication (e-mails, messages d'assistance)</li>
              </ul>
            </>
          ),
        },
        {
          title: '3. Finalités et bases légales du traitement',
          content: (
            <ul className="list-[lower-alpha] pl-5 space-y-2">
              <li><strong>Exécution du contrat</strong> (art. 6 §1 b RGPD) – traitement des commandes, livraison, facturation et service client.</li>
              <li><strong>Obligation légale</strong> (art. 6 §1 c RGPD) – conservation des documents comptables conformément à l'obligation de conservation fiscale (7 ans).</li>
              <li><strong>Intérêt légitime</strong> (art. 6 §1 f RGPD) – sécurité du site, prévention de la fraude, amélioration de nos services et marketing direct auprès des clients existants.</li>
              <li><strong>Consentement</strong> (art. 6 §1 a RGPD) – envoi de newsletters et d'e-mails commerciaux. Vous pouvez retirer votre consentement à tout moment.</li>
            </ul>
          ),
        },
        {
          title: '4. Destinataires de vos données',
          content: (
            <>
              <p>Vos données peuvent être partagées avec les catégories de destinataires suivantes :</p>
              <ul className="list-[lower-roman] pl-5 space-y-1 mt-2">
                <li><strong>Stripe, Inc.</strong> – traitement des paiements en ligne (carte, iDEAL)</li>
                <li><strong>Supabase, Inc.</strong> – services de base de données et authentification</li>
                <li><strong>Resend, Inc.</strong> – envoi d'e-mails transactionnels</li>
                <li><strong>PostHog, Inc.</strong> – analyse produit et statistiques d'utilisation</li>
                <li><strong>Functional Software, Inc. (Sentry)</strong> – surveillance des erreurs applicatives</li>
                <li>Partenaires de livraison et prestataires logistiques</li>
                <li>Cabinets comptables et fiscaux</li>
                <li>Autorités compétentes (sur base légale)</li>
              </ul>
            </>
          ),
        },
        {
          title: '5. Transferts hors EEE',
          content: (
            <p>
              Certains des sous-traitants mentionnés (notamment Stripe, Supabase, PostHog, Sentry, Resend) sont établis en dehors de l'Espace Économique Européen (EEE), notamment aux États-Unis. Ces transferts s'effectuent sur la base des clauses contractuelles types (CCT) approuvées par la Commission européenne ou du cadre Data Privacy Framework (DPF). Pour plus d'informations, contactez-nous à <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.
            </p>
          ),
        },
        {
          title: '6. Durées de conservation',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Données de commande et client : pendant la durée du contrat, puis jusqu'à l'expiration du délai de prescription des créances (maximum 5 ans après le dernier contact).</li>
              <li>Documents financiers et comptables : 7 ans conformément à l'obligation légale de conservation fiscale.</li>
              <li>Données marketing (sur base du consentement) : jusqu'au retrait du consentement.</li>
            </ul>
          ),
        },
        {
          title: '7. Vos droits',
          content: (
            <>
              <p>En vertu du RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Droit d'accès</strong> – vous pouvez demander une copie des données personnelles que nous traitons vous concernant.</li>
                <li><strong>Droit de rectification</strong> – vous pouvez faire corriger des données inexactes ou incomplètes.</li>
                <li><strong>Droit à l'effacement</strong> (« droit à l'oubli ») – vous pouvez demander la suppression de vos données, dans la mesure où aucune obligation légale de conservation ne s'applique.</li>
                <li><strong>Droit à la limitation du traitement</strong> – vous pouvez demander la limitation temporaire du traitement.</li>
                <li><strong>Droit à la portabilité</strong> – vous pouvez recevoir vos données dans un format structuré et couramment utilisé.</li>
                <li><strong>Droit d'opposition</strong> – vous pouvez vous opposer au traitement fondé sur l'intérêt légitime ou à des fins de marketing direct.</li>
                <li><strong>Droit de retrait du consentement</strong> – tout consentement préalablement donné peut être retiré à tout moment.</li>
              </ul>
              <p className="mt-3">
                Pour exercer vos droits, contactez-nous à <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>. Nous répondrons dans un délai d'1 mois (prolongeable de 2 mois pour les demandes complexes).
              </p>
              <p className="mt-2">
                Vous avez également le droit d'introduire une réclamation auprès de l'<strong>Autoriteit Persoonsgegevens</strong> (autorité de contrôle néerlandaise) : <Ext href={CONTACT.apAuthority}>autoriteitpersoonsgegevens.nl</Ext>.
              </p>
            </>
          ),
        },
        {
          title: '8. Cookies et technologies de suivi',
          content: (
            <>
              <p>Nous utilisons des cookies et technologies similaires :</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Cookies techniques (nécessaires)</strong> – indispensables au fonctionnement du site (session, panier, authentification via Supabase, paiement via Stripe). Aucun consentement requis.</li>
                <li><strong>Cookies analytiques</strong> – PostHog et Sentry pour les statistiques d'utilisation et la détection des erreurs. Anonymisés dans la mesure du possible.</li>
                <li><strong>Cookies fonctionnels</strong> – mémorisent vos préférences de langue et autres paramètres.</li>
                <li><strong>Cookies marketing</strong> – uniquement déposés avec votre consentement explicite.</li>
              </ul>
              <p className="mt-3">
                Vous pouvez modifier vos préférences en matière de cookies à tout moment via la bannière de cookies ou les paramètres de votre navigateur.
              </p>
            </>
          ),
        },
        {
          title: '9. Sécurité',
          content: (
            <p>
              Foodmarkt BV met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles, notamment le chiffrement des transferts (HTTPS/TLS), des droits d'accès restreints et des évaluations de sécurité régulières. En cas de violation de données présentant un risque élevé pour vos droits, vous serez informé dans les meilleurs délais, ainsi que l'Autoriteit Persoonsgegevens.
            </p>
          ),
        },
        {
          title: '10. Newsletter',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Avec votre consentement, nous vous envoyons des e-mails commerciaux et des newsletters sur nos offres.</li>
              <li>Vous pouvez vous désabonner à tout moment via le lien de désinscription en bas de chaque e-mail ou en nous contactant à <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
            </ul>
          ),
        },
        {
          title: '11. Modifications de cette politique',
          content: (
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications substantielles seront annoncées sur le site et, le cas échéant, communiquées par e-mail aux clients existants. La date de la dernière révision figure en bas de ce document.
            </p>
          ),
        },
        {
          title: '12. Contact',
          content: (
            <p>
              Pour toute question relative à cette politique ou au traitement de vos données, contactez-nous à{' '}
              <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> ou par courrier : Foodmarkt BV, {CONTACT.address}.
            </p>
          ),
        },
      ],
    };
  }

  if (locale === 'de') {
    return {
      metaTitle: 'Datenschutzerklärung – Hongerige Beer',
      metaDescription: 'Datenschutzerklärung der Foodmarkt BV (Hongerige Beer) – Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO.',
      backLabel: 'Startseite',
      pageTitle: 'Datenschutzerklärung',
      pageSubtitle: 'Verarbeitung und Schutz personenbezogener Daten\nFoodmarkt BV · Hongerige Beer',
      version: 'Version: April 2026 · Foodmarkt BV · KVK 78333490',
      sections: [
        {
          title: '1. Verantwortlicher',
          content: (
            <>
              <p>Verantwortlicher für die Verarbeitung Ihrer personenbezogenen Daten ist:</p>
              <ul className="list-none pl-0 space-y-1 not-prose mt-3">
                <li><strong>Foodmarkt BV</strong> (handelnd unter dem Namen Hongerige Beer)</li>
                <li>{CONTACT.address}</li>
                <li>Handelsregister (KVK): <strong>{CONTACT.kvk}</strong></li>
                <li>USt-IdNr.: <strong>{CONTACT.vat}</strong></li>
                <li>E-Mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                <li>Telefon: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
              </ul>
              <p className="mt-3">
                Foodmarkt BV verarbeitet Ihre personenbezogenen Daten im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und dem niederländischen Ausführungsgesetz (UAVG). Wir schützen Ihre Daten durch angemessene technische und organisatorische Maßnahmen.
              </p>
            </>
          ),
        },
        {
          title: '2. Erhobene Daten',
          content: (
            <>
              <p>Bei der Bestellung oder Kontoerstellung verarbeiten wir unter anderem:</p>
              <ul className="list-[lower-alpha] pl-5 space-y-1 mt-2">
                <li>Vor- und Nachname</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Liefer- und Rechnungsadresse</li>
                <li>Firmenname und USt-IdNr. (für Geschäftskunden)</li>
                <li>Zahlungsdaten (verarbeitet über Stripe – vollständige Kartendaten werden nicht gespeichert)</li>
                <li>Bestellhistorie</li>
                <li>Kommunikationsdaten (E-Mails, Support-Nachrichten)</li>
              </ul>
            </>
          ),
        },
        {
          title: '3. Zwecke und Rechtsgrundlagen der Verarbeitung',
          content: (
            <ul className="list-[lower-alpha] pl-5 space-y-2">
              <li><strong>Vertragserfüllung</strong> (Art. 6 Abs. 1 lit. b DSGVO) – Bearbeitung von Bestellungen, Lieferung, Rechnungsstellung und Kundendienst.</li>
              <li><strong>Rechtliche Verpflichtung</strong> (Art. 6 Abs. 1 lit. c DSGVO) – Aufbewahrung von Buchhaltungsunterlagen gemäß steuerrechtlicher Aufbewahrungspflicht (7 Jahre).</li>
              <li><strong>Berechtigtes Interesse</strong> (Art. 6 Abs. 1 lit. f DSGVO) – Website-Sicherheit, Betrugsprävention, Serviceverbesserung und Direktmarketing gegenüber Bestandskunden.</li>
              <li><strong>Einwilligung</strong> (Art. 6 Abs. 1 lit. a DSGVO) – Versand von Newslettern und kommerziellen E-Mails. Ihre Einwilligung kann jederzeit widerrufen werden.</li>
            </ul>
          ),
        },
        {
          title: '4. Empfänger Ihrer Daten',
          content: (
            <>
              <p>Ihre Daten können an folgende Kategorien von Empfängern weitergegeben werden:</p>
              <ul className="list-[lower-roman] pl-5 space-y-1 mt-2">
                <li><strong>Stripe, Inc.</strong> – Verarbeitung von Online-Zahlungen (Karte, iDEAL)</li>
                <li><strong>Supabase, Inc.</strong> – Datenbankdienste und Benutzerauthentifizierung</li>
                <li><strong>Resend, Inc.</strong> – Versand transaktionaler E-Mails</li>
                <li><strong>PostHog, Inc.</strong> – Produktanalyse und Nutzungsstatistiken</li>
                <li><strong>Functional Software, Inc. (Sentry)</strong> – Überwachung von Anwendungsfehlern</li>
                <li>Lieferpartner und Logistikdienstleister</li>
                <li>Steuer- und Buchhaltungskanzleien</li>
                <li>Zuständige Behörden (auf gesetzlicher Grundlage)</li>
              </ul>
            </>
          ),
        },
        {
          title: '5. Datenübermittlung außerhalb des EWR',
          content: (
            <p>
              Einige der oben genannten Auftragsverarbeiter (u. a. Stripe, Supabase, PostHog, Sentry, Resend) sind außerhalb des Europäischen Wirtschaftsraums (EWR) ansässig, insbesondere in den USA. Die Übermittlung erfolgt auf Grundlage der von der Europäischen Kommission genehmigten Standardvertragsklauseln (SCC) oder des Data Privacy Framework (DPF). Weitere Informationen erhalten Sie unter <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.
            </p>
          ),
        },
        {
          title: '6. Speicherdauer',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Bestell- und Kundendaten: für die Dauer des Vertragsverhältnisses und danach bis zum Ablauf der Verjährungsfrist für Forderungen (maximal 5 Jahre nach dem letzten Kontakt).</li>
              <li>Finanz- und Buchhaltungsunterlagen: 7 Jahre gemäß steuerrechtlicher Aufbewahrungspflicht.</li>
              <li>Marketingdaten (auf Einwilligungsbasis): bis zum Widerruf der Einwilligung.</li>
            </ul>
          ),
        },
        {
          title: '7. Ihre Rechte',
          content: (
            <>
              <p>Gemäß DSGVO stehen Ihnen folgende Rechte zu:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Auskunftsrecht</strong> – Sie können eine Kopie der über Sie verarbeiteten Daten anfordern.</li>
                <li><strong>Berichtigungsrecht</strong> – Sie können die Korrektur unrichtiger oder unvollständiger Daten verlangen.</li>
                <li><strong>Recht auf Löschung</strong> („Recht auf Vergessenwerden") – Sie können die Löschung Ihrer Daten beantragen, soweit keine gesetzliche Aufbewahrungspflicht entgegensteht.</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung</strong> – Sie können eine vorübergehende Einschränkung der Verarbeitung verlangen.</li>
                <li><strong>Recht auf Datenübertragbarkeit</strong> – Sie können Ihre Daten in einem strukturierten, gängigen Format erhalten.</li>
                <li><strong>Widerspruchsrecht</strong> – Sie können der Verarbeitung auf Grundlage berechtigter Interessen oder zu Direktmarketingzwecken widersprechen.</li>
                <li><strong>Widerrufsrecht</strong> – eine erteilte Einwilligung kann jederzeit widerrufen werden.</li>
              </ul>
              <p className="mt-3">
                Anfragen richten Sie bitte an <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>. Wir antworten innerhalb von 1 Monat (verlängerbar um 2 Monate bei komplexen Anfragen).
              </p>
              <p className="mt-2">
                Sie haben außerdem das Recht, eine Beschwerde bei der <strong>Autoriteit Persoonsgegevens</strong> (niederländische Datenschutzbehörde) einzureichen: <Ext href={CONTACT.apAuthority}>autoriteitpersoonsgegevens.nl</Ext>.
              </p>
            </>
          ),
        },
        {
          title: '8. Cookies und Tracking-Technologien',
          content: (
            <>
              <p>Wir verwenden Cookies und ähnliche Technologien:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Technische (notwendige) Cookies</strong> – für den Betrieb der Website erforderlich (Session, Warenkorb, Authentifizierung via Supabase, Zahlung via Stripe). Keine Einwilligung erforderlich.</li>
                <li><strong>Analytische Cookies</strong> – PostHog und Sentry für Nutzungsstatistiken und Fehlererkennung. Soweit möglich anonymisiert.</li>
                <li><strong>Funktionale Cookies</strong> – speichern Ihre Spracheinstellung und andere Präferenzen.</li>
                <li><strong>Marketing-Cookies</strong> – nur nach Ihrer ausdrücklichen Einwilligung gesetzt.</li>
              </ul>
              <p className="mt-3">
                Sie können Ihre Cookie-Einstellungen jederzeit über das Cookie-Banner oder die Einstellungen Ihres Browsers anpassen.
              </p>
            </>
          ),
        },
        {
          title: '9. Sicherheit',
          content: (
            <p>
              Foodmarkt BV trifft angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer personenbezogenen Daten, darunter verschlüsselte Datenübertragung (HTTPS/TLS), eingeschränkte Zugriffsrechte und regelmäßige Sicherheitsbewertungen. Im Falle einer Datenpanne, die ein hohes Risiko für Ihre Rechte darstellt, werden Sie und die Autoriteit Persoonsgegevens unverzüglich informiert.
            </p>
          ),
        },
        {
          title: '10. Newsletter',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Mit Ihrer Einwilligung senden wir Ihnen kommerzielle E-Mails und Newsletter zu unserem Angebot.</li>
              <li>Sie können sich jederzeit über den Abmeldelink am Ende jeder E-Mail oder per Kontaktaufnahme unter <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> abmelden.</li>
            </ul>
          ),
        },
        {
          title: '11. Änderungen dieser Erklärung',
          content: (
            <p>
              Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern. Wesentliche Änderungen werden auf der Website bekannt gegeben und gegebenenfalls per E-Mail an Bestandskunden kommuniziert. Das Datum der letzten Überarbeitung steht am Ende dieses Dokuments.
            </p>
          ),
        },
        {
          title: '12. Kontakt',
          content: (
            <p>
              Bei Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung Ihrer personenbezogenen Daten wenden Sie sich bitte an{' '}
              <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> oder per Post: Foodmarkt BV, {CONTACT.address}.
            </p>
          ),
        },
      ],
    };
  }

  // Default: English
  return {
    metaTitle: 'Privacy Policy – Hongerige Beer',
    metaDescription: 'Privacy Policy of Foodmarkt BV (Hongerige Beer) – how we process your personal data in accordance with the GDPR.',
    backLabel: 'Home',
    pageTitle: 'Privacy Policy',
    pageSubtitle: 'Processing and Protection of Personal Data\nFoodmarkt BV · Hongerige Beer',
    version: 'Version: April 2026 · Foodmarkt BV · KVK 78333490',
    sections: [
      {
        title: '1. Data Controller',
        content: (
          <>
            <p>The data controller for your personal data is:</p>
            <ul className="list-none pl-0 space-y-1 not-prose mt-3">
              <li><strong>Foodmarkt BV</strong> (trading as Hongerige Beer)</li>
              <li>{CONTACT.address}</li>
              <li>Chamber of Commerce (KVK): <strong>{CONTACT.kvk}</strong></li>
              <li>VAT: <strong>{CONTACT.vat}</strong></li>
              <li>E-mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
              <li>Phone: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
            </ul>
            <p className="mt-3">
              Foodmarkt BV processes your personal data in accordance with the General Data Protection Regulation (GDPR) and the Dutch Implementation Act (UAVG). We protect your data with appropriate technical and organisational measures.
            </p>
          </>
        ),
      },
      {
        title: '2. Data We Collect',
        content: (
          <>
            <p>When placing an order or creating an account, we process the following data:</p>
            <ul className="list-[lower-alpha] pl-5 space-y-1 mt-2">
              <li>first and last name</li>
              <li>e-mail address</li>
              <li>telephone number</li>
              <li>delivery and billing address</li>
              <li>company name and VAT number (for business customers)</li>
              <li>payment details (processed via Stripe – we do not store full card data)</li>
              <li>order history</li>
              <li>communication data (e-mails, support messages)</li>
            </ul>
          </>
        ),
      },
      {
        title: '3. Purposes and Legal Bases for Processing',
        content: (
          <ul className="list-[lower-alpha] pl-5 space-y-2">
            <li><strong>Performance of a contract</strong> (Art. 6(1)(b) GDPR) – processing orders, delivery, invoicing and customer service.</li>
            <li><strong>Legal obligation</strong> (Art. 6(1)(c) GDPR) – retaining accounting records in accordance with the statutory tax retention obligation (7 years).</li>
            <li><strong>Legitimate interest</strong> (Art. 6(1)(f) GDPR) – website security, fraud prevention, service improvement and direct marketing to existing customers.</li>
            <li><strong>Consent</strong> (Art. 6(1)(a) GDPR) – sending newsletters and commercial e-mails. You may withdraw your consent at any time.</li>
          </ul>
        ),
      },
      {
        title: '4. Recipients of Your Data',
        content: (
          <>
            <p>Your data may be shared with the following categories of recipients:</p>
            <ul className="list-[lower-roman] pl-5 space-y-1 mt-2">
              <li><strong>Stripe, Inc.</strong> – processing online payments (card, iDEAL)</li>
              <li><strong>Supabase, Inc.</strong> – database services and user authentication</li>
              <li><strong>Resend, Inc.</strong> – sending transactional e-mails</li>
              <li><strong>PostHog, Inc.</strong> – product analytics and usage statistics</li>
              <li><strong>Functional Software, Inc. (Sentry)</strong> – application error monitoring</li>
              <li>Delivery partners and logistics providers</li>
              <li>Accounting and tax advisory firms</li>
              <li>Competent authorities (on a legal basis)</li>
            </ul>
          </>
        ),
      },
      {
        title: '5. Transfers Outside the EEA',
        content: (
          <p>
            Some of the processors listed above (including Stripe, Supabase, PostHog, Sentry, Resend) are based outside the European Economic Area (EEA), in particular in the United States. Such transfers are carried out on the basis of Standard Contractual Clauses (SCCs) approved by the European Commission or the Data Privacy Framework (DPF). For further information, contact us at <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.
          </p>
        ),
      },
      {
        title: '6. Retention Periods',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Order and customer data: for the duration of the contract and thereafter until the expiry of the limitation period for claims (maximum 5 years after the last contact).</li>
            <li>Financial and accounting records: 7 years in accordance with the statutory tax retention obligation.</li>
            <li>Marketing data (based on consent): until withdrawal of consent.</li>
          </ul>
        ),
      },
      {
        title: '7. Your Rights',
        content: (
          <>
            <p>Under the GDPR you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Right of access</strong> – you may request a copy of the personal data we process about you.</li>
              <li><strong>Right to rectification</strong> – you may have inaccurate or incomplete data corrected.</li>
              <li><strong>Right to erasure</strong> ("right to be forgotten") – you may request deletion of your data where no legal retention obligation applies.</li>
              <li><strong>Right to restriction of processing</strong> – you may request a temporary restriction of processing.</li>
              <li><strong>Right to data portability</strong> – you may receive your data in a structured, commonly used format.</li>
              <li><strong>Right to object</strong> – you may object to processing based on legitimate interests or to direct marketing.</li>
              <li><strong>Right to withdraw consent</strong> – any previously given consent may be withdrawn at any time.</li>
            </ul>
            <p className="mt-3">
              Requests should be submitted to <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>. We will respond within 1 month (extendable by 2 months for complex requests).
            </p>
            <p className="mt-2">
              You also have the right to lodge a complaint with the <strong>Autoriteit Persoonsgegevens</strong> (Dutch data protection authority): <Ext href={CONTACT.apAuthority}>autoriteitpersoonsgegevens.nl</Ext>.
            </p>
          </>
        ),
      },
      {
        title: '8. Cookies and Tracking Technologies',
        content: (
          <>
            <p>We use cookies and similar technologies:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Technical (necessary) cookies</strong> – required for the website to function (session, cart, authentication via Supabase, payment via Stripe). No consent required.</li>
              <li><strong>Analytical cookies</strong> – PostHog and Sentry for usage statistics and error detection. Anonymised where possible.</li>
              <li><strong>Functional cookies</strong> – remember your language preference and other settings.</li>
              <li><strong>Marketing cookies</strong> – only placed with your explicit consent.</li>
            </ul>
            <p className="mt-3">
              You may change your cookie preferences at any time via the cookie banner or your browser settings.
            </p>
          </>
        ),
      },
      {
        title: '9. Security',
        content: (
          <p>
            Foodmarkt BV implements appropriate technical and organisational measures to protect your personal data, including encrypted data transfer (HTTPS/TLS), restricted access rights and regular security assessments. In the event of a data breach posing a high risk to your rights, you and the Autoriteit Persoonsgegevens will be notified without undue delay.
          </p>
        ),
      },
      {
        title: '10. Newsletter',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>With your consent, we send you commercial e-mails and newsletters about our offering.</li>
            <li>You may unsubscribe at any time via the unsubscribe link at the bottom of any e-mail or by contacting us at <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
          </ul>
        ),
      },
      {
        title: '11. Changes to this Policy',
        content: (
          <p>
            We reserve the right to amend this Privacy Policy at any time. Material changes will be announced on the website and, where applicable, communicated by e-mail to existing customers. The date of the last revision appears at the bottom of this document.
          </p>
        ),
      },
      {
        title: '12. Contact',
        content: (
          <p>
            For any questions about this Privacy Policy or the processing of your personal data, please contact us at{' '}
            <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> or by post: Foodmarkt BV, {CONTACT.address}.
          </p>
        ),
      },
    ],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent((locale as Locale) ?? 'en');
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const content = getContent((locale as Locale) ?? 'en');
  const [subtitle1, subtitle2] = content.pageSubtitle.split('\n');

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      <div className="h-16" />
      <section className="bg-[#1B4332] px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 text-xs font-semibold uppercase tracking-widest mb-10 hover:text-white/70 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {content.backLabel}
          </Link>
          <h1 className="font-heading font-black text-3xl md:text-5xl text-white mb-4">
            {content.pageTitle}
          </h1>
          <p className="text-[#ed8788] text-sm md:text-base font-bold uppercase tracking-widest leading-relaxed">
            {subtitle1}<br />{subtitle2}
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-6 text-[#1B4332]/80 leading-relaxed text-sm md:text-base">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl md:text-2xl font-black text-[#1B4332] mt-10 mb-4">
                {section.title}
              </h2>
              {section.content}
            </div>
          ))}

          <p className="mt-10 text-xs text-[#1B4332]/50">
            {content.version}
          </p>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
