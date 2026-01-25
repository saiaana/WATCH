import { CACHE_REVALIDATE } from '@/constants/cache';
import { env } from './env';
import type { Genre } from '@/types/common';
import type { ContentType } from '@/types/media';

export interface TMDBCredits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    profile_path?: string | null;
    [key: string]: unknown;
  }>;
}

export interface TMDBVideos {
  results: Array<{
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }>;
}

export interface TMDBResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity?: number;
  genre_ids: number[];
  genres?: Genre[];
  adult: boolean;
  credits?: TMDBCredits;
  videos?: TMDBVideos;
}

export interface TMDBTvShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity?: number;
  genre_ids: number[];
  genres?: Genre[];
  credits?: TMDBCredits;
  videos?: TMDBVideos;
}

type TMDBContentMap = {
  movie: TMDBMovie;
  tv: TMDBTvShow;
};

type TMDBContent<T extends ContentType> = TMDBContentMap[T];

export interface TMDBPerson {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department?: string;
  known_for?: Array<{
    id: number;
    title?: string;
    name?: string;
    media_type: string;
  }>;
}

function withRevalidate(revalidate: number, options?: RequestInit): RequestInit {
  return {
    ...options,
    next: {
      ...(options?.next ?? {}),
      revalidate,
    },
  };
}

class TMDBClient {
  private baseUrl = env.tmdb.baseUrl;
  private apiKey = env.tmdb.apiKey;
  private bearer = env.tmdb.bearer;

  constructor() {
    if (typeof window === 'undefined' && !this.apiKey && !this.bearer) {
      console.error('TMDB Client: API key or Bearer token is missing');
    }
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.bearer) {
      headers.Authorization = `Bearer ${this.bearer}`;
    }

    const params = new URLSearchParams();
    if (!this.bearer && this.apiKey && !endpoint.includes('api_key=')) {
      params.append('api_key', this.apiKey);
    }

    const url =
      params.toString().length > 0
        ? `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}${params}`
        : `${this.baseUrl}${endpoint}`;

    const res = await fetch(url, {
      headers,
      ...options,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`TMDB API error ${res.status}: ${text}`);
    }

    return res.json();
  }

  private discover<T extends ContentType>(
    type: T,
    params: Record<string, string | number | undefined>,
    options?: RequestInit,
  ): Promise<TMDBResponse<TMDBContent<T>>> {
    const query = new URLSearchParams({
      language: 'en-US',
      sort_by: 'popularity.desc',
      ...Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)),
    }).toString();

    return this.fetch(`/discover/${type}?${query}`, withRevalidate(CACHE_REVALIDATE.DAY, options));
  }

  async getContent<T extends ContentType>(
    type: T,
    id: string,
    options?: RequestInit,
  ): Promise<TMDBContent<T>> {
    return this.fetch(
      `/${type}/${id}?language=en-US&append_to_response=credits,videos`,
      withRevalidate(CACHE_REVALIDATE.DAY, options),
    );
  }

  async getCredits<T extends ContentType>(
    type: T,
    id: string,
    options?: RequestInit,
  ): Promise<TMDBCredits> {
    return this.fetch(
      `/${type}/${id}/credits?language=en-US`,
      withRevalidate(CACHE_REVALIDATE.LONG, options),
    );
  }

  async getContentByCategory<T extends ContentType>(
    type: T,
    category: string,
    page = 1,
    options?: RequestInit,
  ): Promise<TMDBResponse<TMDBContent<T>>> {
    return this.fetch(
      `/${type}/${category}?language=en-US&page=${page}`,
      withRevalidate(CACHE_REVALIDATE.LONG, options),
    );
  }

  async getContentByActor<T extends ContentType>(
    type: T,
    actorId: number,
    page = 1,
    options?: RequestInit,
  ) {
    return this.discover(
      type,
      {
        ...(type === 'movie' ? { with_cast: actorId } : { with_people: actorId }),
        page,
      },
      options,
    );
  }

  async getTvByActor(actorId: number, options?: RequestInit) {
    return this.fetch<{
      cast: TMDBTvShow[];
    }>(`/person/${actorId}/tv_credits?language=en-US`, options);
  }

  async getTvByDirector(directorId: number, options?: RequestInit) {
    return this.fetch<{
      crew: Array<TMDBTvShow & { job: string }>;
    }>(`/person/${directorId}/tv_credits?language=en-US`, options);
  }

  async getContentByDirector<T extends ContentType>(
    type: T,
    directorId: number,
    page = 1,
    options?: RequestInit,
  ) {
    return this.discover(type, { with_crew: directorId, page }, options);
  }

  async getContentByGenre<T extends ContentType>(
    type: T,
    genreIds: number[],
    page = 1,
    options?: RequestInit,
  ) {
    return this.discover(type, { with_genres: genreIds.join(','), page }, options);
  }

  async getGenres(type: ContentType, options?: RequestInit): Promise<{ genres: Genre[] }> {
    return this.fetch(
      `/genre/${type}/list?language=en-US`,
      withRevalidate(CACHE_REVALIDATE.MONTH, options),
    );
  }

  async getAllGenres(options?: RequestInit): Promise<Genre[]> {
    const [movieGenres, tvGenres] = await Promise.all([
      this.getGenres('movie', options),
      this.getGenres('tv', options),
    ]);

    const map = new Map<number, Genre>();
    [...movieGenres.genres, ...tvGenres.genres].forEach((g) => map.set(g.id, g));

    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async searchContent<T extends ContentType>(
    type: T,
    query: string,
    page = 1,
    options?: RequestInit,
  ): Promise<TMDBResponse<TMDBContent<T>>> {
    return this.fetch(
      `/search/${type}?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      withRevalidate(CACHE_REVALIDATE.MEDIUM, options),
    );
  }

  async searchPerson(
    query: string,
    page = 1,
    options?: RequestInit,
  ): Promise<TMDBResponse<TMDBPerson>> {
    return this.fetch(
      `/search/person?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      withRevalidate(CACHE_REVALIDATE.MEDIUM, options),
    );
  }
}

export const tmdbClient = new TMDBClient();
