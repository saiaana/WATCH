import type { Genre, Actor, CrewMember } from './common';

export type Movie = {
  id: number;
  title?: string;
  name?: string; // For TV shows compatibility
  year?: number;
  poster_path: string | null;
  vote_average: number;
  genre_ids?: number[];
  cast?: Actor[];
  crew?: CrewMember[];
  backdrop_path: string | null;
  release_date?: string;
  adult?: boolean;
  origin_country?: string;
  genres?: Genre[];
  overview?: string;
  vote_count?: number;
  last_air_date?: string;
  [key: string]: unknown; // Allow additional properties from API
};

export type GenresResponse = {
  genres: Genre[];
};
