import type { Genre } from '@/types/common';
import { getPosterUrl } from '@/helpers/getTmdbImageUrl';
import { MediaContent } from '@/types/media';
import { getContentCardGenres, getContentRating, getContentTitle } from '@/utils/contentInfoUtils';

export interface CardItem {
  id: number;
  title: string;
  poster: string;
  rating: string;
  genres: string;
  contentType: 'movie' | 'tv';
}

interface MapToCardItemOptions {
  type?: 'movie' | 'tv';
}

export function mapToCardItem(
  item: MediaContent,
  genres: Genre[],
  options: MapToCardItemOptions = {},
): CardItem {
  const contentType = options.type ?? inferContentType(item);

  const poster = getPosterUrl(item.poster_path, 'w500');
  const title = getContentTitle(item);
  const rating = getContentRating(item);
  const genreNames = getContentCardGenres(genres, item);

  return {
    id: item.id,
    title: title || '',
    poster,
    rating,
    genres: genreNames || '-',
    contentType,
  };
}

function inferContentType(item: MediaContent): 'movie' | 'tv' {
  if ('first_air_date' in item && item.first_air_date) {
    return 'tv';
  }
  return 'movie';
}
