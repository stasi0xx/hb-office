import { defineRouting } from 'next-intl/routing';
import { getSiteConfig } from '../config/sites';

const site = getSiteConfig();

export const routing = defineRouting({
  locales: site.locales as [string, ...string[]],
  defaultLocale: site.defaultLocale,
});
