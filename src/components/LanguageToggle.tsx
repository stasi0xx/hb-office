'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { routing } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';

const LANGUAGE_NAMES: Record<string, string> = {
  pl: 'Polski',
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  ro: 'Română',
  hu: 'Magyar',
  bg: 'Български',
  cs: 'Čeština',
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
};

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const locales = routing.locales as string[];

  const switchLocale = (next: string) => {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Pills — widoczne od md w górę */}
      <div
        className={`hidden md:flex items-center rounded-full border-2 border-[#E8967A] px-2 py-0.5 transition-opacity ${isPending ? 'opacity-50' : ''}`}
      >
        {locales.map((loc, i) => (
          <div key={loc} className="flex items-center">
            {i > 0 && <span className="mx-0.5 text-sm opacity-30">·</span>}
            <button
              onClick={() => switchLocale(loc)}
              disabled={isPending || locale === loc}
              className={`px-1 text-sm font-bold transition-opacity ${
                locale === loc
                  ? 'text-[#E8967A] opacity-100'
                  : 'text-[#E8967A] opacity-40 hover:opacity-70'
              }`}
            >
              {loc.toUpperCase()}
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown — widoczny tylko na małych ekranach */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-full border-2 border-[#E8967A] px-3 py-1 text-sm font-bold text-[#E8967A] transition-all hover:bg-[#E8967A] hover:text-white disabled:opacity-50"
        >
          <span>{locale.toUpperCase()}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-[#E8967A]/20 bg-white py-1 shadow-lg">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                disabled={isPending}
                className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-[#FDF6EC] ${
                  locale === loc
                    ? 'font-bold text-[#E8967A]'
                    : 'font-medium text-[#1B4332]'
                }`}
              >
                {LANGUAGE_NAMES[loc] ?? loc.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
