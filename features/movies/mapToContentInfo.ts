import { getPosterUrl, getTmdbImageUrl } from '@/helpers/getTmdbImageUrl';
import { MediaContent } from '@/types/media';
import {
  getContentCountries,
  getContentGenres,
  getContentReleaseYear,
  getContentTitle,
  getTvShowYearsAndNumberOfSeasons,
} from '@/utils/contentInfoUtils';

export interface ContentInfoModel {
  id: number;
  title: string;
  year?: string;
  poster: string;
  adult: boolean;
  countries?: string[];
  genres?: string;
  overview?: string;
  startYear?: string;
  endYear?: string;
  numberOfSeasons?: number;
  posterUrl: string;
}

export function mapToContentInfo(content: MediaContent): ContentInfoModel {
  const id = content.id;
  const title = getContentTitle(content);
  const year = getContentReleaseYear(content);
  const { startYear, endYear, numberOfSeasons } = getTvShowYearsAndNumberOfSeasons(content);
  const adult = content.adult || false;
  const countries = getContentCountries(content);
  const genres = getContentGenres(content);
  const poster = getTmdbImageUrl(content.poster_path, { size: 'w500', fallback: '/no-poster.jpg' });
  const posterUrl = getPosterUrl(content.poster_path, 'w500');
  const overview = content.overview || undefined;

  return {
    id,
    poster,
    title,
    year,
    adult,
    countries,
    genres,
    overview,
    startYear,
    endYear,
    numberOfSeasons,
    posterUrl,
  };
}
