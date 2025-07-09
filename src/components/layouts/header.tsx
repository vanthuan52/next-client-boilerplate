import React from 'react';

import { useTranslations } from 'next-intl';
import { Link, TRANSLATION_FILES } from '@/packages/i18n';

import Logo from '@/components/logo';
import ThemeSwitch from '@/components/effects/theme-switch';
import LocaleSwitch from '@/components/locale-switch';
import { Button } from '@/components/ui/button';
import Container from '../ui/container';

const Header = () => {
  const t = useTranslations(TRANSLATION_FILES.COMMON);

  const navItems = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 font-body w-full bg-background/80 backdrop-blur-md drop-shadow-xs">
      <Container className="py-3.5 flex justify-between">
        <Logo />

        <nav className="hidden md:flex items-center ml-8 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-1.5">
          <ThemeSwitch />
          <LocaleSwitch />
          <Button asChild className="ml-2">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </Container>
      <div></div>
    </header>
  );
};

export default Header;
