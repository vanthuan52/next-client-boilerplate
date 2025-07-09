import { useCallback } from 'react';
import { Locale } from 'next-intl';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import NProgress from 'nprogress';
import { useRouter as useIntlRouter } from '@/packages/i18n';
import { isSameURL } from '../utils/is-same-url';

export default function useRouter() {
  const router = useIntlRouter();

  const progress = useCallback((href: string) => {
    const currentURL = new URL(location.href);
    const targetURL = new URL(href, location.href);

    if (isSameURL(targetURL, currentURL)) return;

    NProgress.start();
  }, []);

  return {
    ...router,
    push: (href: string, options?: NavigateOptions & { locale?: Locale }) => {
      progress(href);
      router.push(href, options);
    },
    replace: (
      href: string,
      options?: NavigateOptions & { locale?: Locale }
    ) => {
      progress(href);
      router.replace(href, options);
    },
  };
}
