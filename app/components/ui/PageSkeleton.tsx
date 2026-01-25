'use client';

import HeroSkeleton from '@/app/components/features/hero/HeroSkeleton';
import ContentSliderSkeleton from '@/app/components/features/content/ContentSliderSkeleton';

interface PageSkeletonProps {
  sections?: string[];
}

export default function PageSkeleton({
  sections = ['Trending', 'Top Rated', 'Upcoming'],
}: PageSkeletonProps) {
  return (
    <main className="bg-page-gradient relative min-h-screen overflow-hidden">
      <div className="relative" style={{ paddingTop: 'var(--header-height, 56px)' }}>
        <HeroSkeleton />
      </div>

      <div className="page-container relative z-10">
        {sections.map((sectionTitle, index) => (
          <ContentSliderSkeleton key={index} sectionTitle={sectionTitle} />
        ))}
      </div>
    </main>
  );
}
