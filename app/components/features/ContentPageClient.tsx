'use client';

import { useEffect, useState } from 'react';
import FeaturedHero from '@/app/components/features/hero/featured/FeaturedHero';
import HeroSkeleton from '@/app/components/features/hero/HeroSkeleton';
import ContentCardSlider from '@/app/components/features/content/ContentCardSlider';
import LazyContentSection from '@/app/components/features/content/LazyContentSection';
//import LazyVideoGridSection from '@/app/components/features/content/LazyVideoGridSection';

import { useContentNavigation } from '@/hooks/ui/useContentNavigation';
import { useContentSliderItems } from '@/hooks/content/useContentSliderItems';

import type { Genre } from '@/types/common';
import type { BasePath, MediaContent, LazySectionConfig, MediaCategory } from '@/types/media';

type CriticalResult<T> = {
  popular: T[];
  genres: Genre[];
  isLoading: boolean;
  error: string | null;
};

type VideoSectionConfig = {
  category: MediaCategory;
  title: string;
};

interface ContentPageClientProps<T extends MediaContent> {
  basePath: BasePath;

  contentType: 'movie' | 'tv';

  useCritical: () => CriticalResult<T>;

  lazySections: LazySectionConfig[];

  videoSection: VideoSectionConfig;

  trendingTitle?: string;
}

export default function ContentPageClient<T extends MediaContent>({
  basePath,
  contentType,
  useCritical,
  lazySections,
  // videoSection,
  trendingTitle = 'Trending',
}: ContentPageClientProps<T>) {
  const { popular, genres, isLoading, error } = useCritical();
  const [isMounted, setIsMounted] = useState(false);

  useContentNavigation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hasHeroData = popular.length > 0 && genres.length > 0;
  const showHeroSkeleton = isMounted && isLoading && !hasHeroData;

  const cardItems = useContentSliderItems({
    basePath,
    content: popular,
    genres,
  });

  return (
    <main className="bg-page-gradient relative min-h-screen overflow-hidden">
      <div className="relative" style={{ paddingTop: 'var(--header-height, 56px)' }}>
        {showHeroSkeleton ? (
          <HeroSkeleton />
        ) : hasHeroData ? (
          <FeaturedHero content={popular} genres={genres} />
        ) : null}
      </div>

      <div className="page-container">
        {popular.length > 0 && cardItems.length > 0 && (
          <div className="mb-16 md:mb-20">
            <ContentCardSlider
              sectionTitle={trendingTitle}
              items={cardItems}
              path={'/trending'}
              basePath={basePath}
            />
          </div>
        )}

        {lazySections.map((section) => (
          <LazyContentSection
            key={section.category}
            category={section.category}
            title={section.title}
            basePath={basePath}
            genres={genres}
            contentType={contentType}
            isCriticalLoading={isLoading}
            path={section.path}
          />
        ))}

        {/* <div className="mt-16 md:mt-20">
          <LazyVideoGridSection
            category={videoSection.category}
            title={videoSection.title}
            contentType={contentType}
            isCriticalLoading={isLoading}
          />
        </div> */}
      </div>

      {error && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-neutral-400">
          {error}
        </div>
      )}
    </main>
  );
}
