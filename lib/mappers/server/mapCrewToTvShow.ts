import type { TMDBTvShow } from '@/lib/server/tmdb-client';

export interface TMDBCrewTvItem {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date?: string;
  genre_ids?: number[];
  vote_average?: number;
  vote_count?: number;
  popularity?: number;
  origin_country?: string[];
  original_language?: string;
  job?: string;
}

export function mapCrewToTvShow(credit: TMDBCrewTvItem): TMDBTvShow {
  return {
    id: credit.id,
    name: credit.name,
    overview: credit.overview,
    first_air_date: credit.first_air_date ?? '',
    poster_path: credit.poster_path,
    backdrop_path: credit.backdrop_path,
    vote_average: credit.vote_average ?? 0,
    vote_count: credit.vote_count ?? 0,
    popularity: credit.popularity,
    genre_ids: credit.genre_ids ?? [],
  };
}
