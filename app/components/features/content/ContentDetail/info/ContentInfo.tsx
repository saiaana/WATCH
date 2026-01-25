'use client';

import FavoriteButton from '@/app/components/ui/FavoriteButton';
import { useFavoriteContent } from '@/hooks/favorites/useFavoriteContent';
import type { ContentInfoModel } from '@/features/movies/mapToContentInfo';
import type { MediaContent } from '@/types/media';
import type { CrewMember, Genre } from '@/types/common';
import ContentHeader from './ContentHeader';
import ContentInfoBlock from './ContentInfoBlock';
import GlassContainer from '@/app/components/ui/GlassContainer';

interface Props {
  content: MediaContent;
  info: ContentInfoModel;
  directors: CrewMember[];
  genres?: Genre[];
  yearDisplay?: string | null;
}

export default function ContentInfo({ content, info, directors, genres, yearDisplay }: Props) {
  const favorite = useFavoriteContent(content);

  const contentGenres = genres || ((content.genres || []) as Genre[]);

  return (
    <div className="flex w-full md:h-full">
      <GlassContainer className="flex w-full flex-col space-y-2 md:h-full md:space-y-2">
        <div className="flex flex-col justify-center space-y-3 md:flex-1">
          <ContentHeader title={info.title} adult={info.adult} yearDisplay={yearDisplay} />
          <FavoriteButton content={favorite.original} />
          <ContentInfoBlock type="countries" countries={info.countries} />
          <ContentInfoBlock type="genres" genres={contentGenres} />
          <ContentInfoBlock type="directors" directors={directors} />
        </div>
      </GlassContainer>
    </div>
  );
}
