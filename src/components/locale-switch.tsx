'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter, SUPPORTED_LANGUAGES } from '@/packages/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface LocaleSwitchProps {
  hideLabel?: boolean;
}

const LocaleSwitch = ({ hideLabel = true }: LocaleSwitchProps) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(`${pathname}?${searchParams}`, {
        locale: newLocale,
      });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          disabled={isPending}
          prefixIcon={<Globe />}
          iconOnly={hideLabel}
        >
          {!hideLabel &&
            SUPPORTED_LANGUAGES.find((l) => l.value == locale)?.label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32" align="end">
        {SUPPORTED_LANGUAGES.map(({ value, label }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => handleLocaleChange(value)}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitch;
