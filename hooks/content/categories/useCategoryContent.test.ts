import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCategoryContent } from './useCategoryContent';
import { useCategoryPagination } from './useCategoryPagination';
import { useGenres } from '@/hooks/utils/useGenres';
import { useCardItems } from '@/hooks/utils/useCardItems';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { CardItem } from '@/features/cards/mapToCardItem';
import type { MovieCategory } from '@/config/categories';
import type { TvShowCategory } from '@/config/categories';

vi.mock('./useCategoryPagination', () => ({
  useCategoryPagination: vi.fn(),
}));

vi.mock('@/hooks/utils/useGenres', () => ({
  useGenres: vi.fn(),
}));

vi.mock('@/hooks/utils/useCardItems', () => ({
  useCardItems: vi.fn(),
}));

describe('useCategoryContent', () => {
  const mockLoadMoreRef = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useCategoryPagination).mockReturnValue({
      movies: [{ id: 1 } as Movie],
      tvShows: [{ id: 2 } as TvShow],
      loading: false,
      initialLoading: false,
      hasMore: true,
      loadMore: vi.fn(),
      loadMoreRef: mockLoadMoreRef,
    });

    const mockMovieCardItem: CardItem = {
      id: 1,
      title: 'Mapped Movie',
      poster: 'https://example.com/poster.jpg',
      rating: '5.0',
      genres: 'Action',
      contentType: 'movie',
    };

    const mockTvCardItem: CardItem = {
      id: 2,
      title: 'Mapped TV Show',
      poster: 'https://example.com/poster2.jpg',
      rating: '4.5',
      genres: 'Drama',
      contentType: 'tv',
    };

    vi.mocked(useGenres).mockReturnValue({ genres: [] });
    vi.mocked(useCardItems).mockImplementation((items, genres, type) => {
      if (type === 'movie') return [mockMovieCardItem];
      return [mockTvCardItem];
    });
  });

  it('maps data using useCardItems hook', () => {
    const { result } = renderHook(() => useCategoryContent('popular' as MovieCategory));

    expect(useCardItems).toHaveBeenCalledWith([{ id: 1 }], [], 'movie');
    expect(useCardItems).toHaveBeenCalledWith([{ id: 2 }], [], 'tv');

    expect(result.current.movies).toEqual([
      {
        id: 1,
        title: 'Mapped Movie',
        poster: 'https://example.com/poster.jpg',
        rating: '5.0',
        genres: 'Action',
        contentType: 'movie',
      },
    ]);
    expect(result.current.tvShows).toEqual([
      {
        id: 2,
        title: 'Mapped TV Show',
        poster: 'https://example.com/poster2.jpg',
        rating: '4.5',
        genres: 'Drama',
        contentType: 'tv',
      },
    ]);
  });

  it('passes correct categories to useCategoryPagination', () => {
    renderHook(() => useCategoryContent('popular' as MovieCategory));

    expect(useCategoryPagination).toHaveBeenCalledWith(
      'popular' as MovieCategory,
      'popular' as TvShowCategory,
    );
  });

  it('uses fallback categories for now_playing', () => {
    renderHook(() => useCategoryContent('now_playing' as MovieCategory));

    expect(useCategoryPagination).toHaveBeenCalledWith(
      'popular' as MovieCategory,
      'on_the_air' as TvShowCategory,
    );
  });

  it('overrides categories via options', () => {
    renderHook(() =>
      useCategoryContent('popular' as MovieCategory, {
        movieCategory: 'top_rated' as MovieCategory,
        tvCategory: 'airing_today' as TvShowCategory,
      }),
    );

    expect(useCategoryPagination).toHaveBeenCalledWith(
      'top_rated' as MovieCategory,
      'airing_today' as TvShowCategory,
    );
  });

  it('passes loading flags and refs through', () => {
    const { result } = renderHook(() => useCategoryContent('popular' as MovieCategory));

    expect(result.current.loading).toBe(false);
    expect(result.current.initialLoading).toBe(false);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loadMoreRef).toBe(mockLoadMoreRef);
  });
});
