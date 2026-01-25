'use client';

import { useCallback } from 'react';
import { usePagination, type PaginatedResponse } from '@/hooks/ui/usePagination';
import { getContentByCategory } from '@/lib/client/data-service';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { MovieCategory, TvShowCategory } from '@/config/categories';

interface CategoryPaginationData {
  movies: Movie[];
  tvShows: TvShow[];
  moviesLoading: boolean;
  tvShowsLoading: boolean;
  moviesInitialLoading: boolean;
  tvShowsInitialLoading: boolean;
  moviesHasMore: boolean;
  tvShowsHasMore: boolean;
  moviesLoadMoreRef: (node: HTMLDivElement | null) => void;
  tvShowsLoadMoreRef: (node: HTMLDivElement | null) => void;
  loadMore: () => Promise<void>;
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  loadMoreRef: (node: HTMLDivElement | null) => void;
}

export function useCategoryPagination(
  movieCategory: MovieCategory,
  tvCategory: TvShowCategory,
): CategoryPaginationData {
  const fetchMoviesPage = useCallback(
    async (page: number, signal?: AbortSignal): Promise<PaginatedResponse<Movie>> => {
      const res = await getContentByCategory('movie', movieCategory, page, signal);
      return {
        items: res.content as Movie[],
        totalPages: res.totalPages ?? 1,
      };
    },
    [movieCategory],
  );

  const fetchTvShowsPage = useCallback(
    async (page: number, signal?: AbortSignal): Promise<PaginatedResponse<TvShow>> => {
      const res = await getContentByCategory('tv', tvCategory, page, signal);
      return {
        items: res.content as TvShow[],
        totalPages: res.totalPages ?? 1,
      };
    },
    [tvCategory],
  );

  const movies = usePagination<Movie>({
    fetchPage: fetchMoviesPage,
    dependencies: [movieCategory],
  });

  const tvShows = usePagination<TvShow>({
    fetchPage: fetchTvShowsPage,
    dependencies: [tvCategory],
  });

  const loadMore = useCallback(async () => {
    await Promise.all([
      movies.hasMore && !movies.loading ? movies.loadMore() : Promise.resolve(),
      tvShows.hasMore && !tvShows.loading ? tvShows.loadMore() : Promise.resolve(),
    ]);
  }, [movies, tvShows]);

  const loadMoreRef = movies.hasMore ? movies.loadMoreRef : tvShows.loadMoreRef;

  return {
    movies: movies.items,
    tvShows: tvShows.items,

    moviesLoading: movies.loading,
    tvShowsLoading: tvShows.loading,
    moviesInitialLoading: movies.initialLoading,
    tvShowsInitialLoading: tvShows.initialLoading,
    moviesHasMore: movies.hasMore,
    tvShowsHasMore: tvShows.hasMore,
    moviesLoadMoreRef: movies.loadMoreRef,
    tvShowsLoadMoreRef: tvShows.loadMoreRef,

    loadMore,

    loading: movies.loading || tvShows.loading,
    initialLoading: movies.initialLoading || tvShows.initialLoading,
    hasMore: movies.hasMore || tvShows.hasMore,
    loadMoreRef,
  };
}
