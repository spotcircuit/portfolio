'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { ErrorBoundary } from '@/components/providers/error-boundary';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="mrmaple-theme"
      >
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
