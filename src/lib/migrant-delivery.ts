const LOCALE_MAP: Record<string, string> = {
  pl: 'pl-PL',
  nl: 'nl-NL',
  fr: 'fr-FR',
  de: 'de-DE',
  en: 'en-GB',
};

/**
 * Formats a Trunkrs delivery event Date for display in the checkout form.
 * e.g. "niedziela, 13 kwietnia" / "Sunday, 13 April"
 */
export function formatDeliveryDate(date: Date, locale: string): string {
  return date.toLocaleDateString(LOCALE_MAP[locale] ?? 'en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
