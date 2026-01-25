'use client';

import Image from 'next/image';
import imdbLogo from '@/public/imdb-logo.png';
import { RatingAndCastListModel } from '@/features/movies/mapToRatingAndCastListInfo';
import GlassContainer from '@/app/components/ui/GlassContainer';
import ActorList from '../actors/ActorList';
import { memo } from 'react';

interface RatingAndCastListProps {
  data: RatingAndCastListModel;
}

function RatingAndCastList({ data }: RatingAndCastListProps) {
  return (
    <div className="flex w-full flex-col gap-6 md:h-full md:w-[280px] lg:w-[300px] xl:w-[350px]">
      <GlassContainer className="flex-shrink-0">
        <div className="mb-3 flex items-center justify-center gap-2 md:gap-3">
          <Image src={imdbLogo} alt="IMDB" className="h-4 w-auto md:h-5" />
          <p className="text-3xl font-bold text-yellow-400 md:text-4xl lg:text-5xl">
            {data.vote_average}
          </p>
        </div>
        <p className="text-center text-xs text-neutral-400 md:text-sm">
          Based on {data.vote_count.toLocaleString()} votes
        </p>
      </GlassContainer>
      <GlassContainer className="flex flex-col overflow-hidden md:flex-1">
        <h3 className="mb-3 flex-shrink-0 text-lg font-bold text-white md:mb-4 md:text-xl">Cast</h3>
        <div className="max-h-[400px] overflow-y-auto md:max-h-none md:flex-1">
          <ActorList actors={data.actors} />
        </div>
      </GlassContainer>
    </div>
  );
}

export default memo(RatingAndCastList);
