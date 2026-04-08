export interface FAQItem {
  question: { pl: string; en: string };
  answer: { pl: string; en: string };
}

export const FAQ: FAQItem[] = [
  {
    question: {
      pl: 'Jak wcześnie trzeba zamówić?',
      en: 'How far in advance do I need to order?',
    },
    answer: {
      pl: 'Zamówienia przyjmujemy z 4-dniowym wyprzedzeniem do godziny 10:00. Na przykład, zamawiając w czwartek przed 10:00, paczkę otrzymasz w poniedziałek rano. Zamawiając w piątek — we wtorek. Dostawy realizujemy od poniedziałku do piątku w godzinach: 8:00–10:00.',
      en: 'Orders must be placed 4 days in advance before 10:00 AM. For example, if you order on Thursday before 10:00 AM, you will receive your food on Monday morning. Deliveries are made Monday to Friday between 8:00 and 10:00 AM.',
    },
  },
  {
    question: {
      pl: 'W jakich godzinach jest dostawa?',
      en: 'What are the delivery hours?',
    },
    answer: {
      pl: 'Dostarczamy między 8:00 a 10:00, żebyś miał jedzenie zanim zacznie się prawdziwy dzień w pracy.',
      en: 'We deliver between 8:00 and 10:00, so you have food before the real workday begins.',
    },
  },
  {
    question: {
      pl: 'Co z alergenami?',
      en: 'What about allergens?',
    },
    answer: {
      pl: 'Przy każdym daniu znajdziesz informację o głównych składnikach. W przypadku poważnych alergii skontaktuj się z nami bezpośrednio: biuro@glodnyniedzwiedz.pl lub +48 732 999 072.',
      en: 'Each dish includes information about its main ingredients. For serious allergies, contact us directly: biuro@glodnyniedzwiedz.pl or +48 732 999 072.',
    },
  },
  {
    question: {
      pl: 'Czy mogę zamówić dla całego biura?',
      en: 'Can I order for the whole office?',
    },
    answer: {
      pl: 'Tak! Napisz lub zadzwoń — chętnie omówimy zamówienia grupowe i specjalne warunki dla Twojego biura. Mamy też specjalną ofertę dla firm: do 450 zł/pracownika miesięcznie zwolnione z ZUS.',
      en: 'Absolutely! Write or call us — we are happy to discuss group orders and special terms for your office. We also have a dedicated B2B offer: up to 450 PLN/employee per month, tax-exempt.',
    },
  },
  {
    question: {
      pl: 'Jak często zmienia się menu?',
      en: 'How often does the menu change?',
    },
    answer: {
      pl: 'Menu zmienia się co tydzień. Zawsze masz coś nowego do odkrycia — od tradycyjnych polskich dań po sushi i kuchnie świata.',
      en: 'The menu changes every week. There is always something new to discover — from traditional Polish dishes to sushi and world cuisines.',
    },
  },
  {
    question: {
      pl: 'Skąd pochodzą składniki?',
      en: 'Where do the ingredients come from?',
    },
    answer: {
      pl: 'Używamy wyłącznie składników z certyfikatem INAO (Francuski Narodowy Instytut Pochodzenia i Jakości). Składniki trafiają do nas prosto z farm, nie z mroźni.',
      en: 'We use only INAO-certified ingredients (French National Institute of Origin and Quality). Ingredients come straight from farms, not freezers.',
    },
  },
  {
    question: {
      pl: 'Czy jedzenie jest świeże?',
      en: 'Is the food fresh?',
    },
    answer: {
      pl: 'Tak — każde danie trafia do Ciebie w ciągu 24 godzin od wyprodukowania. Zero sztucznych konserwantów, zero mrożonek.',
      en: 'Yes — every meal reaches you within 24 hours of being made. Zero artificial preservatives, zero frozen food.',
    },
  },
  {
    question: {
      pl: 'Czy macie opcje wegetariańskie?',
      en: 'Do you have vegetarian options?',
    },
    answer: {
      pl: 'Tak, w każdym tygodniowym menu znajdziesz dania wegetariańskie — sałatki, dania główne bez mięsa, wrapy wege i inne. Zapytaj mnie o konkretny dzień, a podpowiem co jest dostępne.',
      en: 'Yes, every weekly menu includes vegetarian options — salads, meatless mains, veggie wraps and more. Ask me about a specific day and I will tell you what is available.',
    },
  },
  {
    question: {
      pl: 'Jak płacić za zamówienie?',
      en: 'How do I pay for my order?',
    },
    answer: {
      pl: 'Płatności obsługujemy przez Stripe — możesz zapłacić kartą lub BLIK-iem. Przy zamówieniu online otrzymujesz 5% rabatu.',
      en: 'Payments are handled via Stripe — you can pay by card or BLIK. Online orders get a 5% discount.',
    },
  },
  {
    question: {
      pl: 'Czy mogę anulować zamówienie?',
      en: 'Can I cancel my order?',
    },
    answer: {
      pl: 'Zamówienia możesz anulować do godziny 14:00 w dniu składania zamówienia (4 dni przed dostawą). Skontaktuj się z nami: biuro@glodnyniedzwiedz.pl lub +48 732 999 072.',
      en: 'You can cancel orders until 14:00 on the day the order is placed (4 days before delivery). Contact us: biuro@glodnyniedzwiedz.pl or +48 732 999 072.',
    },
  },
];
