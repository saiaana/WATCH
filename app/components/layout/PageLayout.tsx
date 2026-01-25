import React from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn('bg-layout-gradient relative', className)}>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-pink-500/5 blur-3xl" />
      </div>

      <div
        className="relative z-10 px-3 pb-16 sm:px-4 md:px-6 lg:px-12 xl:px-16"
        style={{ paddingTop: 'calc(var(--header-height, 56px) + 1.5rem)' }}
      >
        {children}
      </div>
    </div>
  );
}
