'use client';

import { useEffect, useState } from 'react';
import { useLazyContent } from '@/hooks/content/lazy/useLazyContent';
import type { Genre } from '@/types/common';
import type { BasePath, MediaCategory } from '@/types/media';
import ContentCardSlider from '@/app/components/features/content/ContentCardSlider';
import ContentSliderSkeleton from '@/app/components/features/content/ContentSliderSkeleton';
import { useContentSliderItems } from '@/hooks/content/useContentSliderItems';

interface LazyContentSectionProps {
  category: MediaCategory;
  title: string;
  basePath: BasePath;
  genres: Genre[];
  contentType: 'movie' | 'tv';
  isCriticalLoading?: boolean;
  path: string;
}

export default function LazyContentSection({
  category,
  title,
  basePath,
  genres,
  contentType,
  isCriticalLoading = false,
  path,
}: LazyContentSectionProps) {
  const { content, loading, error, elementRef, hasTriggered } = useLazyContent({
    category,
    contentType,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const showSkeleton = isMounted && (loading || !hasTriggered) && !isCriticalLoading;
  const showError = !loading && error;
  const showContent = !loading && !error && content.length > 0;

  const cardItems = useContentSliderItems({
    basePath,
    content,
    genres,
  });

  return (
    <section ref={elementRef} className="mb-16 md:mb-24" aria-label={title}>
      {showSkeleton && <ContentSliderSkeleton sectionTitle={title} />}

      {showError && (
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-zinc-800/50 bg-zinc-900/30">
          <div className="text-center text-neutral-400">Failed to load {title}</div>
        </div>
      )}

      {showContent && (
        <ContentCardSlider items={cardItems} sectionTitle={title} path={path} basePath={basePath} />
      )}
    </section>
  );
}
