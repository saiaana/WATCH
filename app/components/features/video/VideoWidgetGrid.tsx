'use client';

import React, { memo, useMemo } from 'react';
import VideoWidget from './VideoWidget';
import SectionHeader from '@/app/components/ui/SectionHeader';
import CarouselContainer from '@/app/components/ui/CarouselContainer';
import VideoGridLayout from './VideoGridLayout';
import { MediaContent } from '@/types/media';

type VideoWidgetGridProps = {
  sectionTitle: string;
  content: MediaContent[];
};

function VideoWidgetGrid({ content, sectionTitle }: VideoWidgetGridProps) {
  const items = useMemo(() => content.slice(0, 15), [content]);

  if (items.length === 0) return null;

  const header = <SectionHeader title={sectionTitle} variant="large" showIcon />;

  const videos = (
    <CarouselContainer padding={false}>
      {items.map((item) => (
        <div key={item.id} className="relative w-[220px] shrink-0 sm:w-[260px] md:w-[300px]">
          <VideoWidget content={item} />
        </div>
      ))}
    </CarouselContainer>
  );

  return <VideoGridLayout header={header} videos={videos} />;
}

export default memo(VideoWidgetGrid);
