'use client';

import { useCriticalContent } from '@/hooks/content/critical/useCriticalContent';
import { fetchMoviesByCategory, setCategoryMovies } from '@/store/moviesSlice';
import { fetchTvShowsByCategory, setCategoryTvShows } from '@/store/tvShowsSlice';
import type { RootState } from '@/store';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import ContentPageClient from './ContentPageClient';
import type { LazySectionConfig, MediaCategory } from '@/types/media';

type VideoSectionConfig = {
  category: MediaCategory;
  title: string;
};

interface ContentTypePageClientProps {
  contentType: 'movie' | 'tv';
  lazySections: LazySectionConfig[];
  videoSection: VideoSectionConfig;
  trendingTitle?: string;
}

export default function ContentTypePageClient({
  contentType,
  lazySections,
  videoSection,
  trendingTitle,
}: ContentTypePageClientProps) {
  const moviesResult = useCriticalContent<Movie>({
    selectItems: (state: RootState) => state.movies.categories.popular,
    selectLoading: (state: RootState) => state.movies.categoriesLoading.popular,
    selectError: (state: RootState) => state.movies.error,
    fetchAction: fetchMoviesByCategory,
    setAction: ({ category, items }) => setCategoryMovies({ category, movies: items as Movie[] }),
    cacheKey: 'critical_popular_movies',
  });

  const tvShowsResult = useCriticalContent<TvShow>({
    selectItems: (state: RootState) => state.tvShows.categories.popular,
    selectLoading: (state: RootState) => state.tvShows.categoriesLoading.popular,
    selectError: (state: RootState) => state.tvShows.error,
    fetchAction: fetchTvShowsByCategory,
    setAction: ({ category, items }) =>
      setCategoryTvShows({ category, tvShows: items as TvShow[] }),
    cacheKey: 'critical_popular_tv_shows',
  });

  const result = contentType === 'movie' ? moviesResult : tvShowsResult;
  const popular = contentType === 'movie' ? moviesResult.items : tvShowsResult.items;

  const basePath = contentType === 'movie' ? '/movies' : '/tvshows';

  return (
    <ContentPageClient
      basePath={basePath}
      contentType={contentType}
      useCritical={() => ({
        popular,
        genres: result.genres,
        isLoading: result.isLoading,
        error: result.error,
      })}
      lazySections={lazySections}
      videoSection={videoSection}
      trendingTitle={trendingTitle}
    />
  );
}
