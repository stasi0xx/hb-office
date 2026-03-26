import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { headers } from 'next/headers';
import Header from '@/components/Header';
import CookieConsent from '@/components/CookieConsent';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'pl' | 'en')) {
    notFound();
  }

  const messages = await getMessages();
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') ?? '';
  const isKonto = /\/(pl|en)\/konto/.test(pathname);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {!isKonto && <Header />}
      {children}
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
