'use client';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  className?: string;
}

export default function EmptyState({ icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('flex min-h-[500px] flex-col items-center justify-center', className)}>
      <div className="mb-4 text-6xl">{icon}</div>
      <p className="mb-2 text-center text-xl font-semibold text-neutral-300 sm:text-2xl">{title}</p>
      {description && (
        <p className="max-w-md text-center text-sm text-neutral-500">{description}</p>
      )}
    </div>
  );
}
