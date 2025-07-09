import { defineRouting } from 'next-intl/routing';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './constants/language';

export const routing = defineRouting({
  locales: SUPPORTED_LANGUAGES.map((l) => l.value),
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'always',
});
