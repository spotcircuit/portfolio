'use client';

import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

interface GridLayoutProps extends PropsWithChildren {
  className?: string;
}

export function GridLayout({ children, className }: GridLayoutProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr",
      className
    )}>
      {children}
    </div>
  );
}