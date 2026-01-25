'use client';

import { cn } from '@/lib/utils';

interface GradientLineProps {
  variant?: 'default' | 'full' | 'subtle' | 'accent';
  className?: string;
}

const variantClasses = {
  default: 'gradient-line',
  full: 'gradient-line-full',
  subtle: 'gradient-line-subtle',
  accent: 'gradient-line-accent',
} as const;

export default function GradientLine({ variant = 'default', className }: GradientLineProps) {
  return <div className={cn(variantClasses[variant], className)} />;
}
