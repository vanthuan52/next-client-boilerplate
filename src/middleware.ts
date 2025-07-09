import createMiddleware from 'next-intl/middleware';
import { routing } from './packages/i18n';

export default createMiddleware(routing);

export const config = {
  matcher:
    '/((?!api|trpc|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
};
