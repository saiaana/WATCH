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

  const basePath = contentType === 'movie' ? '/movies' : '/tvshows';

  if (contentType === 'movie') {
    return (
      <ContentPageClient<Movie>
        basePath={basePath}
        contentType={contentType}
        useCritical={() => ({
          popular: moviesResult.items,
          genres: moviesResult.genres,
          isLoading: moviesResult.isLoading,
          error: moviesResult.error,
        })}
        lazySections={lazySections}
        videoSection={videoSection}
        trendingTitle={trendingTitle}
      />
    );
  }

  return (
    <ContentPageClient<TvShow>
      basePath={basePath}
      contentType={contentType}
      useCritical={() => ({
        popular: tvShowsResult.items,
        genres: tvShowsResult.genres,
        isLoading: tvShowsResult.isLoading,
        error: tvShowsResult.error,
      })}
      lazySections={lazySections}
      videoSection={videoSection}
      trendingTitle={trendingTitle}
    />
  );
}
