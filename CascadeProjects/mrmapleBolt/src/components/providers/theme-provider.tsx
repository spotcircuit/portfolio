'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

console.log('theme-provider loaded');

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  console.log('ThemeProvider props:', props);
  console.log('ThemeProvider children:', children);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}