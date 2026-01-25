'use client';

import ContentCardSlider from '@/app/components/features/content/ContentCardSlider';
import EmptyState from '@/app/components/ui/EmptyState';
import { memo } from 'react';
import type { Genre } from '@/types/common';
import type { BasePath, MediaContent } from '@/types/media';
import { useContentSliderItems } from '@/hooks/content/useContentSliderItems';

interface SimilarContentProps {
  similar: Array<MediaContent>;
  genres: Genre[];
  basePath: BasePath;
  contentId: string;
  title: string;
}

function SimilarContent({ similar, genres, basePath, contentId, title }: SimilarContentProps) {
  const items = useContentSliderItems({
    content: similar,
    genres,
    basePath,
  });

  if (!similar.length || items.length === 0) {
    return <EmptyState icon="🎬" title="No similar items available" className="py-8" />;
  }

  const similarPath =
    basePath === '/movies' ? `/movies/${contentId}/similar` : `/tvshows/${contentId}/similar`;

  return (
    <ContentCardSlider
      sectionTitle="Similar"
      items={items}
      path={similarPath}
      basePath={basePath}
      title={title}
    />
  );
}

export default memo(SimilarContent);
