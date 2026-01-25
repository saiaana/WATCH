'use client';

import { cn } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface LoadingStateProps {
  title: string;
  subtitle?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const containerClasses = {
  fullScreen:
    'flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-black',
  normal: 'flex justify-center items-center min-h-[500px]',
} as const;

export default function LoadingState({
  title,
  subtitle,
  fullScreen = false,
  size = 'lg',
  className,
}: LoadingStateProps) {
  return (
    <div
      className={cn(fullScreen ? containerClasses.fullScreen : containerClasses.normal, className)}
    >
      <div className="flex flex-col items-center gap-6">
        <LoadingSpinner size={size} />
        <div className="text-center">
          <p className="mb-2 text-xl font-bold text-white">{title}</p>
          {subtitle && <p className="text-sm text-neutral-400">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
