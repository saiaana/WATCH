'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CarouselContainerProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export default function CarouselContainer({
  children,
  className,
  padding = true,
}: CarouselContainerProps) {
  const paddingClasses = padding
    ? 'pt-4 -mx-4 sm:-mx-6 lg:-mx-12 xl:-mx-16 px-4 sm:px-6 lg:px-12 xl:px-16'
    : 'pt-4';

  return (
    <div className={cn('scrollbar-hide overflow-x-auto scroll-smooth', paddingClasses, className)}>
      <div className="flex w-max items-center gap-4 sm:gap-6">{children}</div>
    </div>
  );
}
