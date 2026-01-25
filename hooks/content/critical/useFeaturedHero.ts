import { useMemo } from 'react';
import type { Genre } from '@/types/common';
import { getBackdropUrl } from '@/helpers/getTmdbImageUrl';
import { getContentLink } from '@/helpers/routes';
import { useFeaturedHeroActors } from './useFeaturedHeroActors';
import type { FeaturedHeroModel } from '@/features/featuredHero/types';
import { MediaContent } from '@/types/media';
import { getContentRating, getContentTitle } from '@/utils/contentInfoUtils';

interface Params {
  item: MediaContent | null;
  genres: Genre[];
}

export function useFeaturedHero({ item, genres }: Params) {
  const { actors, isLoading } = useFeaturedHeroActors(
    item?.id ?? null,
    item ? 'title' in item : false,
  );

  const hero: FeaturedHeroModel | null = useMemo(() => {
    if (!item || !item.backdrop_path) return null;

    const isMovie = 'title' in item;

    const title = getContentTitle(item);

    if (!title) return null;

    const genreMap = new Map(genres.map((g) => [g.id, g.name]));

    return {
      title,
      rating: getContentRating(item),
      genres: (item.genre_ids || [])
        .map((id) => genreMap.get(id))
        .filter((name): name is string => Boolean(name))
        .slice(0, 2),
      overview: item.overview || undefined,
      link: getContentLink(item.id, isMovie ? 'movie' : 'tv'),
      backdropUrl: getBackdropUrl(item.backdrop_path, 'original'),
    };
  }, [item, genres]);

  return {
    hero,
    actors,
    isLoadingActors: isLoading,
  };
}
