'use client';

import React, { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AppProgressBar } from '@/packages/nprogress';

export interface AppProvider {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProvider) => {
  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      disableTransitionOnChange={true}
    >
      <AppProgressBar height={2} color="#3F76FF" />
      {children}
    </ThemeProvider>
  );
};

export default AppProvider;
