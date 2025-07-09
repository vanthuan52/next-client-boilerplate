import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { Language } from './types';
import { TRANSLATION_FILES } from './constants';

type TranslationMessages = Partial<Record<TRANSLATION_FILES, unknown>>;

async function loadTranslations(
  locale: Language
): Promise<TranslationMessages> {
  const messages = await Promise.all(
    Object.values(TRANSLATION_FILES).map(async (value) => {
      try {
        const translation = await import(
          `../../../translations/${locale}/${value}.json`
        );
        return { [value]: translation.default };
      } catch {
        console.warn(`Missing translation file: ${value}.json for ${locale}`);
        return {};
      }
    })
  );

  return Object.assign({}, ...messages);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await loadTranslations(locale)) as TranslationMessages,
  };
});
