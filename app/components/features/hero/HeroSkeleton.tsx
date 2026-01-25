'use client';

import FeaturedHeroSkeleton from './featured/FeaturedHeroSkeleton';
import GradientLine from '@/app/components/ui/GradientLine';

export default function HeroSkeleton() {
  return (
    <div className="relative min-h-[500px] w-full overflow-hidden md:h-[600px] lg:h-[700px]">
      <div className="skeleton-bg absolute inset-0 animate-pulse" />
      <FeaturedHeroSkeleton />
      <GradientLine variant="full" className="absolute bottom-0 left-0 right-0 z-20 h-1" />
    </div>
  );
}
