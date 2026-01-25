'use client';

import { cn } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface LoadingMoreProps {
  message?: string;
  className?: string;
}

export default function LoadingMore({ message = 'Loading more...', className }: LoadingMoreProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <LoadingSpinner size="sm" />
      <p className="text-sm text-neutral-400">{message}</p>
    </div>
  );
}
