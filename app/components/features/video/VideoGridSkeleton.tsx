'use client';

import SectionHeader from '@/app/components/ui/SectionHeader';
import CarouselContainer from '@/app/components/ui/CarouselContainer';
import VideoGridLayout from './VideoGridLayout';

interface VideoGridSkeletonProps {
  sectionTitle: string;
  cardCount?: number;
}

export default function VideoGridSkeleton({ sectionTitle, cardCount = 6 }: VideoGridSkeletonProps) {
  const header = <SectionHeader title={sectionTitle} variant="large" showIcon />;

  const videos = (
    <CarouselContainer padding={false}>
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} className="relative w-[220px] shrink-0 sm:w-[260px] md:w-[300px]">
          <div className="card-hover skeleton-bg aspect-[4/3] w-full animate-pulse cursor-pointer overflow-hidden rounded-xl" />
        </div>
      ))}
    </CarouselContainer>
  );

  return <VideoGridLayout header={header} videos={videos} />;
}
