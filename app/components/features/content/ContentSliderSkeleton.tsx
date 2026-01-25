'use client';

import ContentCardSkeleton from '@/app/components/features/content/ContentCardSkeleton';
import CarouselContainer from '@/app/components/ui/CarouselContainer';
import { getSectionIcon } from '@/helpers/getSectionIcon';
import GradientLine from '@/app/components/ui/GradientLine';
import { cn } from '@/lib/utils';

interface ContentSliderSkeletonProps {
  sectionTitle?: string;
  cardCount?: number;
}

export default function ContentSliderSkeleton({
  sectionTitle,
  cardCount = 6,
}: ContentSliderSkeletonProps) {
  const header = sectionTitle ? (
    <div className={cn('mb-6 flex items-center gap-3 sm:mb-8')}>
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="text-3xl sm:text-4xl">{getSectionIcon(sectionTitle)}</span>
        <div className="skeleton-base h-8 w-32 rounded-md sm:h-9 sm:w-40 lg:h-10" />
      </div>
      <GradientLine variant="subtle" className="ml-4 flex-1 sm:ml-6" />
    </div>
  ) : (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="skeleton-base h-8 w-32 rounded-md sm:h-9 sm:w-40 lg:h-10" />
      </div>
    </div>
  );

  return (
    <section className="mb-16 md:mb-24">
      <div className="relative">
        {header}
        <div className="mt-6 sm:mt-8">
          <CarouselContainer>
            {Array.from({ length: cardCount }).map((_, index) => (
              <div key={index} className="relative w-[240px] flex-shrink-0">
                <ContentCardSkeleton />
              </div>
            ))}
          </CarouselContainer>
        </div>
      </div>
    </section>
  );
}
