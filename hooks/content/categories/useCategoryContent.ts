'use client';

import { useCategoryPagination } from './useCategoryPagination';
import { useGenres } from '@/hooks/utils/useGenres';
import { useCardItems } from '@/hooks/utils/useCardItems';
import type { MovieCategory } from '@/config/categories';
import type { TvShowCategory } from '@/config/categories';

interface UseCategoryContentOptions {
  movieCategory?: MovieCategory;
  tvCategory?: TvShowCategory;
}

export function useCategoryContent(
  category: MovieCategory | TvShowCategory,
  options?: UseCategoryContentOptions,
) {
  const movieCategory: MovieCategory =
    options?.movieCategory ??
    (category === 'now_playing' ? 'popular' : (category as MovieCategory));
  const tvCategory: TvShowCategory =
    options?.tvCategory ??
    (category === 'now_playing' ? 'on_the_air' : (category as TvShowCategory));

  const { genres } = useGenres();

  const {
    movies,
    tvShows,
    moviesLoading,
    tvShowsLoading,
    moviesInitialLoading,
    tvShowsInitialLoading,
    moviesHasMore,
    tvShowsHasMore,
    moviesLoadMoreRef,
    tvShowsLoadMoreRef,
    loadMore,
    loading,
    initialLoading,
    hasMore,
    loadMoreRef,
  } = useCategoryPagination(movieCategory, tvCategory);

  return {
    movies: useCardItems(movies, genres, 'movie'),
    tvShows: useCardItems(tvShows, genres, 'tv'),
    moviesLoading,
    tvShowsLoading,
    moviesInitialLoading,
    tvShowsInitialLoading,
    moviesHasMore,
    tvShowsHasMore,
    moviesLoadMoreRef,
    tvShowsLoadMoreRef,
    loadMore,
    loading,
    initialLoading,
    hasMore,
    loadMoreRef,
  };
}
