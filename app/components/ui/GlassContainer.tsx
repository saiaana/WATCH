'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassContainerProps {
  children: ReactNode;
  className?: string;
  padding?: 'default' | 'large' | 'none';
}

const paddingClasses = {
  default: 'p-4 sm:p-6',
  large: 'p-6 sm:p-8',
  none: '',
} as const;

export default function GlassContainer({
  children,
  className,
  padding = 'default',
}: GlassContainerProps) {
  return (
    <div className={cn('glass-container', paddingClasses[padding], className)}>{children}</div>
  );
}
