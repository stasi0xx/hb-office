// Delivery zones — update this list when the owner provides exact coverage details.
// Each entry can include neighbourhoods or districts within a city.
export interface DeliveryZone {
  // canonical Polish city name (used for matching)
  city: string;
  // alternative names / spellings to match against user input
  aliases: string[];
  available: boolean;
  note?: { pl: string; en: string };
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    city: 'Warszawa',
    aliases: ['Warsaw', 'warszawy', 'warszawie', 'warsaw'],
    available: true,
    note: {
      pl: 'Dowozimy do biur w całej Warszawie.',
      en: 'We deliver to offices across Warsaw.',
    },
  },
  // ── Remaining cities: owner to confirm exact zone coverage ──
  // {
  //   city: 'Kraków',
  //   aliases: ['Krakow', 'Cracow', 'krakow', 'cracow', 'krakowie'],
  //   available: true,
  // },
  // {
  //   city: 'Wrocław',
  //   aliases: ['Wroclaw', 'wroclaw', 'wrocławiu'],
  //   available: true,
  // },
  // {
  //   city: 'Poznań',
  //   aliases: ['Poznan', 'poznan', 'poznaniu'],
  //   available: true,
  // },
  // {
  //   city: 'Gdańsk',
  //   aliases: ['Gdansk', 'gdansk', 'gdańsku'],
  //   available: true,
  // },
  // {
  //   city: 'Łódź',
  //   aliases: ['Lodz', 'lodz', 'łodzi'],
  //   available: true,
  // },
  // {
  //   city: 'Katowice',
  //   aliases: ['katowice', 'katowicach'],
  //   available: true,
  // },
];

export function checkDelivery(cityInput: string): {
  available: boolean;
  city?: string;
  note?: { pl: string; en: string };
} {
  const normalised = cityInput.toLowerCase().trim();

  for (const zone of DELIVERY_ZONES) {
    const allNames = [zone.city.toLowerCase(), ...zone.aliases.map((a) => a.toLowerCase())];
    if (allNames.some((name) => normalised.includes(name) || name.includes(normalised))) {
      return { available: zone.available, city: zone.city, note: zone.note };
    }
  }

  return { available: false };
}
