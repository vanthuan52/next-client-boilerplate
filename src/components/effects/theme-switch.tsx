'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      iconOnly={true}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Moon className="dark:block hidden" />
      <Sun className="dark:hidden block" />
    </Button>
  );
};

export default ThemeSwitch;
