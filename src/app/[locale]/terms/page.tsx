import FooterSection from '@/components/FooterSection';
import { Link } from '@/i18n/navigation';

type Locale = 'nl' | 'en' | 'fr' | 'de';

interface TermsContent {
  metaTitle: string;
  metaDescription: string;
  backLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  version: string;
  articles: {
    title: string;
    content: React.ReactNode;
  }[];
}

const CONTACT = {
  phone: '+31 682 595 605',
  phoneHref: 'tel:+31682595605',
  emailInfo: 'info@foodmarkt.com',
  emailOrder: 'order@foodmarkt.com',
  address: 'Blankenstein 265, 7943 PG Meppel, Nederland',
  kvk: '78333490',
  vat: 'NL861353730B01',
  domain: 'office.hongigebeer.nl',
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

const CompanyBlock = ({ kvkLabel, vatLabel, phoneLabel, emailLabel }: {
  kvkLabel: string; vatLabel: string; phoneLabel: string; emailLabel: string;
}) => (
  <ul className="list-none pl-0 space-y-1 not-prose">
    <li><strong>Foodmarkt BV</strong> (Hongerige Beer)</li>
    <li>{CONTACT.address}</li>
    <li>{kvkLabel}: <strong>{CONTACT.kvk}</strong></li>
    <li>{vatLabel}: <strong>{CONTACT.vat}</strong></li>
    <li>{phoneLabel}: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
    <li>{emailLabel}: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> / <A href={`mailto:${CONTACT.emailOrder}`}>{CONTACT.emailOrder}</A></li>
  </ul>
);

function getContent(locale: Locale): TermsContent {
  if (locale === 'nl') {
    return {
      metaTitle: 'Algemene Voorwaarden – Hongerige Beer',
      metaDescription: 'Algemene Voorwaarden voor online bestellingen via office.hongigebeer.nl, geëxploiteerd door Foodmarkt BV.',
      backLabel: 'Startpagina',
      pageTitle: 'Algemene Voorwaarden',
      pageSubtitle: 'Algemene Voorwaarden voor Online Bestellingen\nHongerige Beer · office.hongigebeer.nl',
      version: 'Versie: april 2026 · Foodmarkt BV · KVK 78333490',
      articles: [
        {
          title: 'Artikel 1 – Identiteit van de ondernemer',
          content: (
            <>
              <p>De webshop op <strong>office.hongigebeer.nl</strong> wordt geëxploiteerd door:</p>
              <CompanyBlock
                kvkLabel="Kamer van Koophandel (KVK)"
                vatLabel="BTW-identificatienummer"
                phoneLabel="Telefoon"
                emailLabel="E-mail"
              />
            </>
          ),
        },
        {
          title: 'Artikel 2 – Toepasselijkheid',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Deze Algemene Voorwaarden ("<strong>Voorwaarden</strong>") zijn van toepassing op elk aanbod van Foodmarkt BV en op elke op afstand gesloten overeenkomst tussen Foodmarkt BV en een klant ("<strong>Klant</strong>") via <strong>office.hongigebeer.nl</strong>.</li>
              <li>Voordat een overeenkomst op afstand wordt gesloten, wordt de tekst van deze Voorwaarden aan de Klant beschikbaar gesteld. Indien dit redelijkerwijs niet mogelijk is, zal worden aangegeven waar de Voorwaarden zijn in te zien en dat ze op verzoek kosteloos worden toegezonden.</li>
              <li>Afwijkingen van deze Voorwaarden zijn uitsluitend geldig indien schriftelijk overeengekomen.</li>
              <li>Op deze Voorwaarden is Nederlands recht van toepassing (Burgerlijk Wetboek, Boek 6, Titel 5, Afdeling 2b – overeenkomsten op afstand).</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 3 – Het aanbod',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Het weekmenu (maaltijden, snacks en dranken) wordt op de website gepubliceerd en regelmatig bijgewerkt. Aanbiedingen gelden zolang de voorraad strekt.</li>
              <li>Elk aanbod bevat een voldoende gedetailleerde beschrijving om de Klant in staat te stellen het aanbod goed te beoordelen. Afbeeldingen zijn illustratief en geven geen aanleiding tot claims.</li>
              <li>Alle prijzen zijn vermeld in <strong>euro (EUR)</strong> inclusief het toepasselijke Nederlandse BTW-tarief.</li>
              <li>Per bestelling wordt een bezorgkosten van <strong>€ 5,00</strong> in rekening gebracht, duidelijk zichtbaar vóór de betaling.</li>
              <li>Foodmarkt BV is niet gebonden aan kennelijke fouten of vergissingen in de prijslijst.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 4 – Totstandkoming van de overeenkomst',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>De Klant kan 24 uur per dag, 7 dagen per week bestellingen plaatsen.</li>
              <li>Bestellingen dienen <strong>minimaal 4 werkdagen</strong> vóór de gewenste leverdatum te worden geplaatst. De exacte deadline wordt bij het selecteren van een leverdatum in de checkout getoond.</li>
              <li>Voor het plaatsen van een bestelling dient de Klant te verstrekken: volledige naam, bedrijfsnaam (optioneel), bezorgadres (Tilburg, Den Bosch of Eindhoven), telefoonnummer en e-mailadres.</li>
              <li>Door op <strong>"Bestellen met betalingsverplichting"</strong> (of gelijkwaardig) te klikken, doet de Klant een rechtens bindend aanbod tot aankoop. De overeenkomst komt tot stand op het moment dat Foodmarkt BV een orderbevestiging per e-mail verzendt.</li>
              <li>Foodmarkt BV behoudt zich het recht voor een bestelling te weigeren – bijvoorbeeld bij uitputting van de voorraad – in welk geval geen kosten in rekening worden gebracht.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 5 – Betaling',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Betaling dient volledig te geschieden op het moment van bestellen. Geaccepteerde betaalmethoden: <strong>creditcard / pinpas</strong> en <strong>iDEAL</strong>, veilig verwerkt via Stripe.</li>
              <li>Contante betaling is niet mogelijk voor online bestellingen.</li>
              <li>Bij niet-betaling of mislukte betaling wordt de bestelling niet verwerkt. Foodmarkt BV kan buitengerechtelijke incassokosten in rekening brengen conform de Wet normering buitengerechtelijke incassokosten (BIK).</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 6 – Levering',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Leveringen vinden plaats op <strong>maandag t/m vrijdag</strong>, doorgaans tussen <strong>08:00 en 10:00</strong> uur, op het door de Klant opgegeven bezorgadres (kantoor of thuisadres binnen het bezorggebied).</li>
              <li>De huidige bezorggebieden zijn: <strong>Tilburg, Den Bosch en Eindhoven</strong>. Foodmarkt BV kan het bezorggebied te allen tijde aanpassen.</li>
              <li>Foodmarkt BV zal alles in het werk stellen om op de overeengekomen datum te leveren. Bij vertraging door overmacht wordt de Klant zo spoedig mogelijk geïnformeerd.</li>
              <li>Het risico van verlies gaat op het moment van levering over op de Klant.</li>
              <li>Indien de Klant niet aanwezig is bij levering, kan Foodmarkt BV de bestelling achterlaten op de opgegeven locatie of bij een receptionist/collega; dit geldt als geldige levering.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 7 – Herroepingsrecht',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Op grond van <strong>artikel 6:230p, onder b, van het Burgerlijk Wetboek</strong> (implementatie van art. 16, onder d, van EU-Richtlijn 2011/83/EU) geldt het herroepingsrecht <strong>niet</strong> voor overeenkomsten die betrekking hebben op de levering van goederen die snel kunnen bederven of een beperkte houdbaarheid hebben. Alle maaltijden en voedingsproducten van Hongerige Beer vallen in deze categorie.</li>
              <li>De Klant kan een bevestigde voedselbestelling derhalve <strong>niet annuleren</strong> op grond van de wettelijke bedenktijd van 14 dagen.</li>
              <li>Deze uitzondering laat de rechten van de Klant bij een non-conform of gebrekkig product onverlet (zie Artikel 8).</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 8 – Conformiteit en klachten',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Foodmarkt BV garandeert dat de producten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties en de redelijke normen van deugdelijkheid en bruikbaarheid (artikel 7:17 BW).</li>
              <li>
                Klachten over een onvolledige bestelling, onjuiste producten of duidelijke kwaliteitsgebreken (bijv. zichtbaar bederf) dienen, gezien de bederfelijke aard van de producten, <strong>binnen 24 uur na levering</strong> te worden gemeld via:
                <ul className="list-[circle] pl-5 mt-2 space-y-1">
                  <li>e-mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                  <li>telefoon: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
                </ul>
              </li>
              <li>De klacht dient te bevatten: een beschrijving van het gebrek, het ordernummer en waar mogelijk een foto die het probleem duidelijk aantoont.</li>
              <li>Foodmarkt BV bevestigt klachten binnen <strong>2 werkdagen</strong> en handelt deze af binnen <strong>14 dagen</strong>. Indien langere afhandeling nodig is, wordt de Klant binnen 14 dagen geïnformeerd.</li>
              <li>Gegronde klachten worden opgelost door een gedeeltelijke of volledige terugbetaling, of herlevering naar keuze van Foodmarkt BV.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 9 – Allergenen en voedingsinformatie',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Allergeninformatie per product wordt vermeld conform EU Verordening nr. 1169/2011 betreffende de verstrekking van voedselinformatie aan consumenten.</li>
              <li>Onze keuken verwerkt producten met alle gangbare allergenen (waaronder gluten, noten, zuivel, eieren, vis, schaaldieren en soja). Kruisbesmetting kan niet volledig worden uitgesloten.</li>
              <li>Klanten met ernstige allergieën dienen vóór de bestelling contact met ons op te nemen via <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 10 – Aansprakelijkheid',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>De aansprakelijkheid van Foodmarkt BV voor directe schade is beperkt tot het totaalbedrag dat de Klant heeft betaald voor de betreffende bestelling.</li>
              <li>Foodmarkt BV is niet aansprakelijk voor indirecte of gevolgschade, waaronder winstderving of gegevensverlies, tenzij de schade het gevolg is van opzet of grove nalatigheid van Foodmarkt BV.</li>
              <li>Aansprakelijkheid voor schade door overmacht – waaronder extreme weersomstandigheden, verkeersverstoringen of leveranciersstops – is uitgesloten.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 11 – Persoonsgegevens',
          content: (
            <p>
              Foodmarkt BV verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG/GDPR). Raadpleeg ons <A href="/privacy-policy">Privacybeleid</A> voor volledige informatie over welke gegevens wij verzamelen, hoe wij deze gebruiken en wat uw rechten zijn.
            </p>
          ),
        },
        {
          title: 'Artikel 12 – Geschillenbeslechting',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Geschillen tussen een Consument en Foodmarkt BV kunnen, mits beide partijen daarmee instemmen, worden voorgelegd aan de <strong>Geschillencommissie</strong> via <Ext href="https://www.degeschillencommissie.nl">www.degeschillencommissie.nl</Ext>.</li>
              <li>Op grond van EU Verordening 524/2013 kunnen consumentengeschillen ook worden ingediend via het Europese ODR-platform: <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext>.</li>
              <li>Op deze Voorwaarden en alle daaruit voortvloeiende geschillen is uitsluitend <strong>Nederlands recht</strong> van toepassing. Geschillen die niet in onderling overleg worden opgelost, worden beslecht door de bevoegde rechter in Nederland.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 13 – Wijzigingen',
          content: (
            <p>
              Foodmarkt BV behoudt zich het recht voor deze Voorwaarden te allen tijde te wijzigen. Wijzigingen treden in werking op de datum van publicatie op de website. Voor lopende bestellingen die vóór de wijzigingsdatum zijn geplaatst, gelden de Voorwaarden die van kracht waren op het moment van bestelling.
            </p>
          ),
        },
      ],
    };
  }

  if (locale === 'fr') {
    return {
      metaTitle: 'Conditions Générales de Vente – Hongerige Beer',
      metaDescription: 'Conditions Générales de Vente pour les commandes en ligne passées via office.hongigebeer.nl, exploité par Foodmarkt BV.',
      backLabel: 'Accueil',
      pageTitle: 'Conditions Générales',
      pageSubtitle: 'Conditions Générales de Vente pour Commandes en Ligne\nHongerige Beer · office.hongigebeer.nl',
      version: 'Version : avril 2026 · Foodmarkt BV · KVK 78333490',
      articles: [
        {
          title: 'Article 1 – Identité du vendeur',
          content: (
            <>
              <p>La boutique en ligne <strong>office.hongigebeer.nl</strong> est exploitée par :</p>
              <CompanyBlock
                kvkLabel="Chambre de commerce (KVK)"
                vatLabel="Numéro de TVA intracommunautaire"
                phoneLabel="Téléphone"
                emailLabel="E-mail"
              />
            </>
          ),
        },
        {
          title: 'Article 2 – Applicabilité',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Les présentes Conditions Générales de Vente (« <strong>CGV</strong> ») s'appliquent à toute offre de Foodmarkt BV et à tout contrat à distance conclu entre Foodmarkt BV et un client (« <strong>Client</strong> ») via <strong>office.hongigebeer.nl</strong>.</li>
              <li>Avant la conclusion d'un contrat à distance, le Client se voit communiquer le texte des présentes CGV. Si cela n'est pas raisonnablement possible, il sera indiqué où les CGV peuvent être consultées et qu'elles seront envoyées gratuitement sur demande.</li>
              <li>Toute dérogation aux présentes CGV n'est valide que si elle a été expressément convenue par écrit.</li>
              <li>Les présentes CGV sont régies par le droit néerlandais (Burgerlijk Wetboek, Livre 6, Titre 5, Section 2b – contrats à distance).</li>
            </ul>
          ),
        },
        {
          title: 'Article 3 – L\'offre',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Le menu hebdomadaire (repas, snacks et boissons) est publié sur le site internet et mis à jour régulièrement. Les offres sont valables dans la limite des stocks disponibles.</li>
              <li>Chaque offre contient une description suffisamment détaillée pour permettre au Client d'évaluer correctement l'offre. Les images sont illustratives et ne donnent lieu à aucune réclamation.</li>
              <li>Tous les prix sont indiqués en <strong>euros (EUR)</strong> et incluent la TVA néerlandaise applicable.</li>
              <li>Des frais de livraison de <strong>5,00 €</strong> par commande sont ajoutés lors du paiement et clairement indiqués avant le règlement.</li>
              <li>Foodmarkt BV n'est pas lié par des erreurs manifestes ou des fautes typographiques dans la liste de prix.</li>
            </ul>
          ),
        },
        {
          title: 'Article 4 – Passation de commande',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Les Clients peuvent passer commande 24h/24, 7j/7.</li>
              <li>Les commandes doivent être passées <strong>au moins 4 jours ouvrés</strong> avant la date de livraison souhaitée. La date limite exacte est affichée lors de la sélection d'une date de livraison dans le panier.</li>
              <li>Pour finaliser une commande, le Client doit fournir : nom complet, nom de l'entreprise (facultatif), adresse de livraison (zones de livraison Tilburg, Den Bosch ou Eindhoven), numéro de téléphone et adresse e-mail.</li>
              <li>En cliquant sur <strong>« Commander avec obligation de paiement »</strong> (ou équivalent), le Client formule une offre d'achat juridiquement contraignante. Le contrat est formé lorsque Foodmarkt BV envoie une confirmation de commande par e-mail.</li>
              <li>Foodmarkt BV se réserve le droit de refuser une commande – par exemple en cas de rupture de stock – auquel cas aucun frais ne sera prélevé.</li>
            </ul>
          ),
        },
        {
          title: 'Article 5 – Paiement',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Le paiement doit être effectué intégralement au moment de la commande. Modes de paiement acceptés : <strong>carte de crédit/débit</strong> et <strong>iDEAL</strong>, traités en toute sécurité via Stripe.</li>
              <li>Le paiement en espèces n'est pas disponible pour les commandes en ligne.</li>
              <li>En cas de non-paiement ou d'échec de paiement, la commande ne sera pas traitée. Foodmarkt BV peut recouvrer les frais d'encaissement auprès du Client conformément à la loi néerlandaise sur la normalisation des frais extrajudiciaires (BIK).</li>
            </ul>
          ),
        },
        {
          title: 'Article 6 – Livraison',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Les livraisons ont lieu du <strong>lundi au vendredi</strong>, généralement entre <strong>08h00 et 10h00</strong>, à l'adresse de livraison indiquée par le Client (bureau ou domicile dans la zone de service).</li>
              <li>Les zones de livraison actuelles sont : <strong>Tilburg, Den Bosch et Eindhoven</strong>. Foodmarkt BV peut modifier la zone de service à tout moment.</li>
              <li>Foodmarkt BV fera tout son possible pour livrer à la date convenue. En cas de retard pour des raisons indépendantes de notre volonté, le Client sera informé dans les plus brefs délais.</li>
              <li>Le risque de perte est transféré au Client au moment de la livraison.</li>
              <li>En l'absence du Client lors de la livraison, Foodmarkt BV peut déposer la commande à l'endroit indiqué ou auprès d'un réceptionniste/collègue ; cela constitue une livraison valide.</li>
            </ul>
          ),
        },
        {
          title: 'Article 7 – Droit de rétractation',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Conformément à <strong>l'article 6:230p, alinéa b, du Code civil néerlandais</strong> (transposant l'art. 16, point d, de la Directive UE 2011/83/UE), le droit de rétractation <strong>ne s'applique pas</strong> aux contrats portant sur la fourniture de biens susceptibles de se détériorer ou de se périmer rapidement. Tous les repas et produits alimentaires vendus par Hongerige Beer entrent dans cette catégorie.</li>
              <li>Par conséquent, le Client <strong>ne peut pas annuler</strong> une commande alimentaire confirmée sur la base du délai de réflexion légal de 14 jours.</li>
              <li>Cette exception ne porte pas atteinte aux droits du Client en cas de produit défectueux ou non conforme (voir Article 8).</li>
            </ul>
          ),
        },
        {
          title: 'Article 8 – Conformité et réclamations',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Foodmarkt BV garantit que les produits sont conformes au contrat, aux spécifications indiquées dans l'offre et aux normes raisonnables de qualité et d'utilisation (article 7:17 BW).</li>
              <li>
                Les réclamations relatives à une commande incomplète, à des produits incorrects ou à des défauts de qualité évidents (ex. : altération visible) doivent être signalées <strong>dans les 24 heures suivant la livraison</strong>, compte tenu du caractère périssable des produits, en contactant :
                <ul className="list-[circle] pl-5 mt-2 space-y-1">
                  <li>e-mail : <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                  <li>téléphone : <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
                </ul>
              </li>
              <li>La réclamation doit inclure : une description du défaut, le numéro de commande et, si possible, une photo illustrant clairement le problème.</li>
              <li>Foodmarkt BV accusera réception des réclamations dans un délai de <strong>2 jours ouvrés</strong> et les traitera dans un délai de <strong>14 jours</strong>. Si un délai de traitement plus long est nécessaire, le Client en sera informé dans les 14 jours.</li>
              <li>Les réclamations fondées seront réglées par un remboursement partiel ou total, ou par une nouvelle livraison, au choix de Foodmarkt BV.</li>
            </ul>
          ),
        },
        {
          title: 'Article 9 – Allergènes et informations nutritionnelles',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Les informations sur les allergènes de chaque produit sont fournies conformément au Règlement UE n° 1169/2011 concernant l'information des consommateurs sur les denrées alimentaires.</li>
              <li>Notre cuisine manipule des produits contenant tous les principaux allergènes (notamment gluten, noix, produits laitiers, œufs, poisson, crustacés et soja). Une contamination croisée ne peut être totalement exclue.</li>
              <li>Les Clients souffrant d'allergies sévères doivent nous contacter directement avant de passer commande à l'adresse <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
            </ul>
          ),
        },
        {
          title: 'Article 10 – Responsabilité',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>La responsabilité de Foodmarkt BV pour les dommages directs est limitée au montant total payé par le Client pour la commande concernée.</li>
              <li>Foodmarkt BV n'est pas responsable des dommages indirects ou consécutifs, y compris la perte de profits ou de données, sauf si le dommage résulte d'une intention ou d'une négligence grave de la part de Foodmarkt BV.</li>
              <li>La responsabilité pour les dommages causés par un cas de force majeure – notamment conditions météorologiques extrêmes, perturbations du trafic ou pénuries de fournisseurs – est exclue.</li>
            </ul>
          ),
        },
        {
          title: 'Article 11 – Données personnelles',
          content: (
            <p>
              Foodmarkt BV traite les données personnelles conformément au Règlement Général sur la Protection des Données (RGPD/AVG). Pour plus d'informations sur les données que nous collectons, leur utilisation et vos droits, veuillez consulter notre <A href="/privacy-policy">Politique de confidentialité</A>.
            </p>
          ),
        },
        {
          title: 'Article 12 – Résolution des litiges',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Les litiges entre un Consommateur et Foodmarkt BV peuvent, sous réserve de l'accord des deux parties, être soumis à la commission d'arbitrage néerlandaise <strong>Geschillencommissie</strong> via <Ext href="https://www.degeschillencommissie.nl">www.degeschillencommissie.nl</Ext>.</li>
              <li>Conformément au Règlement UE 524/2013, les litiges de consommation peuvent également être soumis via la plateforme européenne de règlement en ligne des litiges : <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext>.</li>
              <li>Les présentes CGV et tous les litiges en découlant sont régis exclusivement par le <strong>droit néerlandais</strong>. Les litiges ne pouvant être résolus à l'amiable relèvent de la compétence des tribunaux des Pays-Bas.</li>
            </ul>
          ),
        },
        {
          title: 'Article 13 – Modifications',
          content: (
            <p>
              Foodmarkt BV se réserve le droit de modifier les présentes CGV à tout moment. Les modifications entrent en vigueur à la date de leur publication sur le site internet. Pour les commandes en cours passées avant la date de modification, les CGV en vigueur au moment de la commande s'appliquent.
            </p>
          ),
        },
      ],
    };
  }

  if (locale === 'de') {
    return {
      metaTitle: 'Allgemeine Geschäftsbedingungen – Hongerige Beer',
      metaDescription: 'Allgemeine Geschäftsbedingungen für Online-Bestellungen über office.hongigebeer.nl, betrieben von Foodmarkt BV.',
      backLabel: 'Startseite',
      pageTitle: 'Allgemeine Geschäftsbedingungen',
      pageSubtitle: 'AGB für Online-Bestellungen\nHongerige Beer · office.hongigebeer.nl',
      version: 'Version: April 2026 · Foodmarkt BV · KVK 78333490',
      articles: [
        {
          title: 'Artikel 1 – Identität des Unternehmers',
          content: (
            <>
              <p>Der Online-Shop unter <strong>office.hongigebeer.nl</strong> wird betrieben von:</p>
              <CompanyBlock
                kvkLabel="Handelsregister (KVK)"
                vatLabel="USt-IdNr."
                phoneLabel="Telefon"
                emailLabel="E-Mail"
              />
            </>
          ),
        },
        {
          title: 'Artikel 2 – Geltungsbereich',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Diese Allgemeinen Geschäftsbedingungen („<strong>AGB</strong>") gelten für jedes Angebot von Foodmarkt BV und für jeden auf dem Fernabsatzweg geschlossenen Vertrag zwischen Foodmarkt BV und einem Kunden („<strong>Kunde</strong>") über <strong>office.hongigebeer.nl</strong>.</li>
              <li>Vor Abschluss eines Fernabsatzvertrages wird dem Kunden der Text dieser AGB zugänglich gemacht. Falls dies nicht zumutbar möglich ist, wird darauf hingewiesen, wo die AGB eingesehen werden können, und es wird mitgeteilt, dass sie auf Anfrage kostenlos zugesandt werden.</li>
              <li>Abweichungen von diesen AGB sind nur gültig, wenn sie ausdrücklich schriftlich vereinbart wurden.</li>
              <li>Für diese AGB gilt niederländisches Recht (Burgerlijk Wetboek, Buch 6, Titel 5, Abschnitt 2b – Fernabsatzverträge).</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 3 – Das Angebot',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Das Wochenmenü (Mahlzeiten, Snacks und Getränke) wird auf der Website veröffentlicht und regelmäßig aktualisiert. Angebote gelten solange der Vorrat reicht.</li>
              <li>Jedes Angebot enthält eine hinreichend detaillierte Beschreibung, die dem Kunden eine angemessene Beurteilung des Angebots ermöglicht. Abbildungen sind illustrativ und begründen keine Ansprüche.</li>
              <li>Alle Preise werden in <strong>Euro (EUR)</strong> angegeben und beinhalten die anwendbare niederländische Mehrwertsteuer (BTW).</li>
              <li>Pro Bestellung werden <strong>5,00 €</strong> Lieferkosten erhoben, die vor der Zahlung deutlich ausgewiesen werden.</li>
              <li>Foodmarkt BV ist nicht an offensichtliche Fehler oder Tippfehler in der Preisliste gebunden.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 4 – Bestellvorgang',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Kunden können rund um die Uhr, 7 Tage die Woche bestellen.</li>
              <li>Bestellungen müssen <strong>mindestens 4 Werktage</strong> vor dem gewünschten Lieferdatum aufgegeben werden. Die genaue Frist wird bei der Auswahl eines Lieferdatums im Checkout angezeigt.</li>
              <li>Zur Aufgabe einer Bestellung muss der Kunde folgende Angaben machen: vollständiger Name, Firmenname (optional), Lieferadresse (Liefergebiete Tilburg, Den Bosch oder Eindhoven), Telefonnummer und E-Mail-Adresse.</li>
              <li>Durch Klicken auf <strong>„Zahlungspflichtig bestellen"</strong> (oder gleichwertig) gibt der Kunde ein rechtlich bindendes Kaufangebot ab. Der Vertrag kommt zustande, wenn Foodmarkt BV eine Bestellbestätigung per E-Mail versendet.</li>
              <li>Foodmarkt BV behält sich das Recht vor, eine Bestellung abzulehnen – beispielsweise bei nicht verfügbarem Lagerbestand – wobei in diesem Fall keine Kosten anfallen.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 5 – Zahlung',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Die Zahlung ist zum Zeitpunkt der Bestellung vollständig zu leisten. Akzeptierte Zahlungsmethoden: <strong>Kredit-/Debitkarte</strong> und <strong>iDEAL</strong>, sicher verarbeitet über Stripe.</li>
              <li>Barzahlung ist für Online-Bestellungen nicht möglich.</li>
              <li>Bei Nichtzahlung oder fehlgeschlagener Zahlung wird die Bestellung nicht bearbeitet. Foodmarkt BV kann außergerichtliche Inkassokosten gemäß dem niederländischen Gesetz zur Normierung außergerichtlicher Inkassokosten (BIK) vom Kunden einfordern.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 6 – Lieferung',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Lieferungen erfolgen <strong>montags bis freitags</strong>, in der Regel zwischen <strong>08:00 und 10:00 Uhr</strong>, an die vom Kunden angegebene Lieferadresse (Büro oder Privatadresse im Liefergebiet).</li>
              <li>Die aktuellen Liefergebiete sind: <strong>Tilburg, Den Bosch und Eindhoven</strong>. Foodmarkt BV kann das Liefergebiet jederzeit anpassen.</li>
              <li>Foodmarkt BV wird alle Anstrengungen unternehmen, um zum vereinbarten Termin zu liefern. Bei Verzögerungen aus Gründen außerhalb unserer Kontrolle wird der Kunde so schnell wie möglich informiert.</li>
              <li>Das Verlustrisiko geht zum Zeitpunkt der Lieferung auf den Kunden über.</li>
              <li>Ist der Kunde bei der Lieferung nicht anwesend, kann Foodmarkt BV die Bestellung am angegebenen Ort oder bei einem Empfangsmitarbeiter/Kollegen hinterlassen; dies gilt als ordnungsgemäße Lieferung.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 7 – Widerrufsrecht',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Gemäß <strong>Artikel 6:230p, Buchstabe b, des niederländischen Bürgerlichen Gesetzbuches</strong> (Umsetzung von Art. 16 lit. d der EU-Richtlinie 2011/83/EU) gilt das Widerrufsrecht <strong>nicht</strong> für Verträge über die Lieferung von Waren, die schnell verderben können oder deren Haltbarkeitsdatum bald überschritten ist. Alle von Hongerige Beer verkauften Mahlzeiten und Lebensmittel fallen in diese Kategorie.</li>
              <li>Der Kunde kann eine bestätigte Lebensmittelbestellung daher <strong>nicht</strong> auf der Grundlage der gesetzlichen 14-tägigen Widerrufsfrist stornieren.</li>
              <li>Diese Ausnahme berührt keine Rechte des Kunden bei einem mangelhaften oder nicht vertragsgemäßen Produkt (siehe Artikel 8).</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 8 – Konformität und Beschwerden',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Foodmarkt BV garantiert, dass die Produkte dem Vertrag, den im Angebot genannten Spezifikationen und den angemessenen Standards für Qualität und Verwendbarkeit entsprechen (Artikel 7:17 BW).</li>
              <li>
                Beschwerden über eine unvollständige Bestellung, falsche Produkte oder offensichtliche Qualitätsmängel (z. B. sichtbarer Verderb) müssen angesichts der Verderblichkeit der Waren <strong>innerhalb von 24 Stunden nach Lieferung</strong> gemeldet werden, und zwar über:
                <ul className="list-[circle] pl-5 mt-2 space-y-1">
                  <li>E-Mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                  <li>Telefon: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
                </ul>
              </li>
              <li>Die Beschwerde muss enthalten: eine Beschreibung des Mangels, die Bestellnummer und nach Möglichkeit ein Foto, das das Problem deutlich zeigt.</li>
              <li>Foodmarkt BV bestätigt Beschwerden innerhalb von <strong>2 Werktagen</strong> und bearbeitet diese innerhalb von <strong>14 Tagen</strong>. Falls eine längere Bearbeitungszeit erforderlich ist, wird der Kunde innerhalb von 14 Tagen informiert.</li>
              <li>Berechtigte Beschwerden werden durch eine teilweise oder vollständige Rückerstattung oder durch eine erneute Lieferung nach Wahl von Foodmarkt BV behoben.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 9 – Allergene und Ernährungsinformationen',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Allergeninformationen für jedes Produkt werden gemäß der EU-Verordnung Nr. 1169/2011 über die Information der Verbraucher über Lebensmittel bereitgestellt.</li>
              <li>Unsere Küche verarbeitet Produkte, die alle gängigen Allergene enthalten (darunter Gluten, Nüsse, Milchprodukte, Eier, Fisch, Schalentiere und Soja). Kreuzkontaminationen können nicht vollständig ausgeschlossen werden.</li>
              <li>Kunden mit schweren Allergien sollten uns vor der Bestellung direkt unter <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A> kontaktieren.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 10 – Haftung',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Die Haftung von Foodmarkt BV für direkte Schäden ist auf den Gesamtbetrag begrenzt, den der Kunde für die betreffende Bestellung gezahlt hat.</li>
              <li>Foodmarkt BV haftet nicht für indirekte Schäden oder Folgeschäden, einschließlich Gewinn- oder Datenverluste, es sei denn, der Schaden ist auf Vorsatz oder grobe Fahrlässigkeit seitens Foodmarkt BV zurückzuführen.</li>
              <li>Die Haftung für Schäden durch höhere Gewalt – einschließlich extremer Wetterbedingungen, Verkehrsstörungen oder Lieferantenengpässen – ist ausgeschlossen.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 11 – Personenbezogene Daten',
          content: (
            <p>
              Foodmarkt BV verarbeitet personenbezogene Daten gemäß der Datenschutz-Grundverordnung (DSGVO/AVG). Vollständige Informationen darüber, welche Daten wir erheben, wie wir sie verwenden und welche Rechte Sie haben, finden Sie in unserer <A href="/privacy-policy">Datenschutzerklärung</A>.
            </p>
          ),
        },
        {
          title: 'Artikel 12 – Streitbeilegung',
          content: (
            <ul className="list-disc pl-5 space-y-2">
              <li>Streitigkeiten zwischen einem Verbraucher und Foodmarkt BV können, sofern beide Parteien zustimmen, der niederländischen Schlichtungsstelle <strong>Geschillencommissie</strong> unter <Ext href="https://www.degeschillencommissie.nl">www.degeschillencommissie.nl</Ext> vorgelegt werden.</li>
              <li>Gemäß EU-Verordnung 524/2013 können Verbraucherstreitigkeiten auch über die europäische Online-Streitbeilegungs-Plattform eingereicht werden: <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext>.</li>
              <li>Für diese AGB und alle daraus entstehenden Streitigkeiten gilt ausschließlich <strong>niederländisches Recht</strong>. Streitigkeiten, die nicht einvernehmlich gelöst werden können, fallen in die Zuständigkeit des zuständigen Gerichts in den Niederlanden.</li>
            </ul>
          ),
        },
        {
          title: 'Artikel 13 – Änderungen',
          content: (
            <p>
              Foodmarkt BV behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen treten am Tag ihrer Veröffentlichung auf der Website in Kraft. Für laufende Bestellungen, die vor dem Änderungsdatum aufgegeben wurden, gelten die zum Zeitpunkt der Bestellung gültigen AGB.
            </p>
          ),
        },
      ],
    };
  }

  // Default: English
  return {
    metaTitle: 'Terms & Conditions – Hongerige Beer',
    metaDescription: 'General Terms and Conditions for online orders placed via office.hongigebeer.nl, operated by Foodmarkt BV.',
    backLabel: 'Home',
    pageTitle: 'Terms & Conditions',
    pageSubtitle: 'General Terms and Conditions for Online Orders\nHongerige Beer · office.hongigebeer.nl',
    version: 'Version: April 2026 · Foodmarkt BV · KVK 78333490',
    articles: [
      {
        title: 'Article 1 – Identity of the Trader',
        content: (
          <>
            <p>The online shop at <strong>office.hongigebeer.nl</strong> is operated by:</p>
            <CompanyBlock
              kvkLabel="Chamber of Commerce (KVK)"
              vatLabel="VAT identification number"
              phoneLabel="Phone"
              emailLabel="E-mail"
            />
          </>
        ),
      },
      {
        title: 'Article 2 – Applicability',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>These General Terms and Conditions ("<strong>Terms</strong>") apply to every offer made by Foodmarkt BV and to every distance contract concluded between Foodmarkt BV and a customer ("<strong>Customer</strong>") via <strong>office.hongigebeer.nl</strong>.</li>
            <li>Before a distance contract is concluded, the Customer is given access to these Terms. If this is not reasonably possible, the Customer will be informed where the Terms can be inspected and that they will be sent free of charge on request.</li>
            <li>Deviations from these Terms are only valid if expressly agreed in writing.</li>
            <li>These Terms are governed by Dutch law (Burgerlijk Wetboek, Book 6, Title 5, Section 2b – distance contracts).</li>
          </ul>
        ),
      },
      {
        title: 'Article 3 – The Offer',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>The weekly menu (meals, snacks and beverages) is published on the website and updated regularly. Offers are valid while supplies last.</li>
            <li>Every offer contains a sufficiently detailed description to enable the Customer to properly assess the offer. Images are illustrative and do not give rise to any claims.</li>
            <li>All prices are stated in <strong>euros (EUR)</strong> and include the applicable Dutch VAT (BTW).</li>
            <li>A delivery fee of <strong>€ 5.00</strong> per order is added at checkout and is clearly shown before payment.</li>
            <li>Foodmarkt BV is not bound by obvious errors or typographical mistakes in the price list.</li>
          </ul>
        ),
      },
      {
        title: 'Article 4 – Placing an Order',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Customers may place orders 24 hours a day, 7 days a week.</li>
            <li>Orders must be placed <strong>at least 4 business days</strong> before the desired delivery date. The exact deadline is displayed in the checkout when selecting a delivery date.</li>
            <li>To complete an order the Customer must provide: full name, company name (optional), delivery address (Tilburg, Den Bosch or Eindhoven delivery areas), telephone number and e-mail address.</li>
            <li>By clicking <strong>"Order with obligation to pay"</strong> (or equivalent) the Customer makes a legally binding offer to purchase. The contract is formed when Foodmarkt BV sends an order confirmation by e-mail.</li>
            <li>Foodmarkt BV reserves the right to refuse an order – for example if stock is unavailable – in which case no charges will be made.</li>
          </ul>
        ),
      },
      {
        title: 'Article 5 – Payment',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Payment must be made in full at the time of ordering. Accepted payment methods: <strong>credit / debit card</strong> and <strong>iDEAL</strong>, processed securely via Stripe.</li>
            <li>Cash payment is not available for online orders.</li>
            <li>In the event of non-payment or failed payment, the order will not be processed. Foodmarkt BV may recover any debt-collection costs from the Customer in accordance with the Wet normering buitengerechtelijke incassokosten (BIK).</li>
          </ul>
        ),
      },
      {
        title: 'Article 6 – Delivery',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Deliveries take place <strong>Monday through Friday</strong>, generally between <strong>08:00 and 10:00</strong>, to the delivery address specified by the Customer (office or home address within the service area).</li>
            <li>The current delivery areas are: <strong>Tilburg, Den Bosch and Eindhoven</strong>. Foodmarkt BV may update the service area at any time.</li>
            <li>Foodmarkt BV will make every effort to deliver on the agreed date. If a delivery is delayed for reasons beyond our control, the Customer will be notified as soon as possible.</li>
            <li>Risk of loss passes to the Customer at the moment of delivery.</li>
            <li>If the Customer is not present at delivery, Foodmarkt BV may leave the order at the location specified or with a receptionist/colleague; this constitutes valid delivery.</li>
          </ul>
        ),
      },
      {
        title: 'Article 7 – Right of Withdrawal',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Pursuant to <strong>Article 6:230p, sub b, of the Dutch Civil Code</strong> (implementing Art. 16(d) of EU Directive 2011/83/EU), the right of withdrawal <strong>does not apply</strong> to contracts for the supply of goods that are liable to deteriorate or expire rapidly. All meals and food products sold by Hongerige Beer fall into this category.
            </li>
            <li>Consequently, the Customer <strong>cannot cancel</strong> a confirmed food order on the basis of the statutory 14-day cooling-off period.</li>
            <li>This exception does not affect any rights the Customer may have in the event of a defective or non-conforming product (see Article 8).</li>
          </ul>
        ),
      },
      {
        title: 'Article 8 – Conformity and Complaints',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Foodmarkt BV guarantees that the products conform to the contract, the specifications stated in the offer, and the reasonable standards of soundness and usability (Article 7:17 BW).</li>
            <li>
              Complaints regarding an incomplete order, incorrect products or obvious quality defects (e.g. visible spoilage) must be reported <strong>within 24 hours of delivery</strong>, given the perishable nature of the goods, by:
              <ul className="list-[circle] pl-5 mt-2 space-y-1">
                <li>e-mail: <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A></li>
                <li>phone: <A href={CONTACT.phoneHref}>{CONTACT.phone}</A></li>
              </ul>
            </li>
            <li>The complaint must include: a description of the defect, the order number, and where possible a photograph clearly showing the issue.</li>
            <li>Foodmarkt BV will acknowledge complaints within <strong>2 business days</strong> and handle them within <strong>14 days</strong>. If a longer processing time is required, the Customer will be informed within 14 days.</li>
            <li>Valid complaints will be remedied by a partial or full refund, or redelivery at Foodmarkt BV's choice.</li>
          </ul>
        ),
      },
      {
        title: 'Article 9 – Allergens and Dietary Information',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Allergen information for each product is provided on the product page in accordance with EU Regulation No 1169/2011 on food information to consumers.</li>
            <li>Our kitchen handles products containing all major allergens (including gluten, nuts, dairy, eggs, fish, shellfish and soy). Cross-contamination cannot be fully excluded.</li>
            <li>Customers with severe allergies should contact us directly before ordering at <A href={`mailto:${CONTACT.emailInfo}`}>{CONTACT.emailInfo}</A>.</li>
          </ul>
        ),
      },
      {
        title: 'Article 10 – Liability',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Foodmarkt BV's liability for direct damage is limited to the total amount paid by the Customer for the specific order giving rise to the claim.</li>
            <li>Foodmarkt BV is not liable for indirect or consequential damage, including loss of profit or data, unless the damage results from intent or gross negligence on the part of Foodmarkt BV.</li>
            <li>Liability for damage caused by force majeure – including extreme weather, traffic disruptions or supplier shortages – is excluded.</li>
          </ul>
        ),
      },
      {
        title: 'Article 11 – Personal Data',
        content: (
          <p>
            Foodmarkt BV processes personal data in accordance with the General Data Protection Regulation (GDPR / AVG). For full details on the data we collect, how we use it, and your rights, please refer to our <A href="/privacy-policy">Privacy Policy</A>.
          </p>
        ),
      },
      {
        title: 'Article 12 – Dispute Resolution',
        content: (
          <ul className="list-disc pl-5 space-y-2">
            <li>Disputes between a Consumer and Foodmarkt BV may be submitted to the <strong>Geschillencommissie</strong> (Dutch Disputes Committee) via <Ext href="https://www.degeschillencommissie.nl">www.degeschillencommissie.nl</Ext>, provided both parties consent.</li>
            <li>Pursuant to EU Regulation 524/2013, Consumer disputes may also be submitted via the European Online Dispute Resolution platform: <Ext href="https://ec.europa.eu/consumers/odr">ec.europa.eu/consumers/odr</Ext>.</li>
            <li>These Terms and all disputes arising from them are governed exclusively by <strong>Dutch law</strong>. Disputes that cannot be resolved amicably fall under the jurisdiction of the competent court in the Netherlands.</li>
          </ul>
        ),
      },
      {
        title: 'Article 13 – Amendments',
        content: (
          <p>
            Foodmarkt BV reserves the right to amend these Terms at any time. Amendments take effect on the date of publication on the website. For ongoing orders placed before the amendment date, the Terms in force at the time of order placement apply.
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

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
          {content.articles.map((article) => (
            <div key={article.title}>
              <h2 className="text-xl md:text-2xl font-black text-[#1B4332] mt-10 mb-4">
                {article.title}
              </h2>
              {article.content}
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
