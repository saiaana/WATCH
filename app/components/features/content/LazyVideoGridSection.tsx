'use client';

import { useEffect, useState } from 'react';
import VideoWidgetGrid from '@/app/components/features/video/VideoWidgetGrid';
import { useLazyContent } from '@/hooks/content/lazy/useLazyContent';
import VideoGridSkeleton from '@/app/components/features/video/VideoGridSkeleton';
import type { MediaCategory } from '@/types/media';

interface LazyVideoGridSectionProps {
  category: MediaCategory;
  title: string;
  contentType: 'movie' | 'tv';
  isCriticalLoading?: boolean;
}

export default function LazyVideoGridSection({
  category,
  title,
  contentType,
  isCriticalLoading = false,
}: LazyVideoGridSectionProps) {
  const { content, loading, error, elementRef, isIntersecting, hasTriggered } = useLazyContent({
    category,
    contentType,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section ref={elementRef} className="mb-16 overflow-visible md:mb-24" aria-label={title}>
      {isMounted && !isIntersecting && !hasTriggered && !loading && content.length === 0 && (
        <div className="h-full" />
      )}
      {isMounted && loading && !isCriticalLoading && <VideoGridSkeleton sectionTitle={title} />}
      {error && !loading && (
        <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-zinc-800/50 bg-zinc-900/30">
          <div className="text-center text-neutral-400">Failed to load {title}</div>
        </div>
      )}
      {!loading && !error && content.length > 0 && (
        <VideoWidgetGrid content={content} sectionTitle={title} />
      )}
    </section>
  );
}
