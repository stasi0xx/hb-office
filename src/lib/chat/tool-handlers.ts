import menuData from '@/data/menu.json';
import { checkDelivery } from './delivery-zones';
import type { MenuData } from './types';

const menu = menuData as MenuData;

function parseMenuDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.').map(Number);
  return new Date(year, month - 1, day);
}

function getAvailableDates(): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allDates = Object.keys(menu);
  const upcoming = allDates.filter((d) => parseMenuDate(d) >= today);

  // If no upcoming dates, fall back to all available dates
  return upcoming.length > 0 ? upcoming : allDates;
}

function formatMenuForClaude(dates: string[], categoryFilter?: string): string {
  const lines: string[] = [];

  for (const date of dates) {
    const dayMenu = menu[date];
    const dayLines: string[] = [];

    for (const [category, dishes] of Object.entries(dayMenu)) {
      if (categoryFilter && category !== categoryFilter) continue;

      dayLines.push(`  ${category}:`);
      for (const dish of dishes) {
        dayLines.push(`    • ${dish.nazwa} — ${dish.cena}`);
      }
    }

    if (dayLines.length > 0) {
      lines.push(`${date}:`);
      lines.push(...dayLines);
      lines.push('');
    }
  }

  return lines.join('\n').trim();
}

function handleSearchMenu(preferences: string, category?: string, date?: string): string {
  let datesToSearch: string[];

  if (date) {
    datesToSearch = Object.keys(menu).filter((d) => d === date);
    if (datesToSearch.length === 0) {
      return `Brak menu na datę ${date}. Dostępne daty: ${Object.keys(menu).join(', ')}.`;
    }
  } else {
    datesToSearch = getAvailableDates();
  }

  const formatted = formatMenuForClaude(datesToSearch, category);

  if (!formatted) {
    return 'Nie znaleziono dań spełniających podane kryteria.';
  }

  const isUpcoming =
    datesToSearch.some((d) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parseMenuDate(d) >= today;
    });

  const header = isUpcoming
    ? `Dostępne menu (nadchodzące dni, filtr: "${preferences}"):\n\n`
    : `Dostępne menu (najnowsze opublikowane dni — menu na nadchodzący tydzień może jeszcze nie być gotowe, filtr: "${preferences}"):\n\n`;

  return header + formatted;
}

function handleCheckDelivery(city: string): string {
  const result = checkDelivery(city);

  if (result.available && result.city) {
    const note = result.note?.pl ?? `Dowozimy do ${result.city}.`;
    return `DOSTAWA DOSTĘPNA: ${note} Zamówienia przyjmujemy min. 1 dzień wcześniej, dostawa 08:00–10:00.`;
  }

  return (
    `DOSTAWA NIEDOSTĘPNA do "${city}". ` +
    `Aktualnie dowozimy do wybranych miast. ` +
    `Skontaktuj się z nami, żeby sprawdzić czy Twoja lokalizacja jest w zasięgu: ` +
    `biuro@glodnyniedzwiedz.pl lub +48 732 999 072.`
  );
}

export function handleToolCall(name: string, input: Record<string, string>): string {
  if (name === 'search_menu') {
    return handleSearchMenu(input.preferences, input.category, input.date);
  }
  if (name === 'check_delivery') {
    return handleCheckDelivery(input.city);
  }
  return 'Nieznane narzędzie.';
}
