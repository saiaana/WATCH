import type { Genre, Actor, CrewMember } from './common';

export type TvShow = {
  id: number;
  name: string;
  title?: string;
  original_name?: string;
  year?: number;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: Genre[];
  origin_country?: string[];
  adult?: boolean;
  cast?: Actor[];
  crew?: CrewMember[];
  overview?: string;
  [key: string]: unknown;
};
