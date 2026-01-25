'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12 border-2',
  md: 'w-16 h-16 border-4',
  lg: 'w-20 h-20 border-4',
} as const;

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const currentSize = sizeClasses[size];

  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          currentSize,
          'animate-spin rounded-full border-purple-600 border-t-transparent',
        )}
      ></div>
      <div
        className={cn(
          'absolute inset-0',
          currentSize,
          'animate-spin-reverse rounded-full border-pink-600 border-r-transparent opacity-50',
        )}
      ></div>
    </div>
  );
}
