import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCriticalContent } from './useCriticalContent';
import { fetchTvShowsByCategory, setCategoryTvShows } from '@/store/tvShowsSlice';
import type { RootState } from '@/store';
import type { Genre } from '@/types/common';
import type { TvShow } from '@/types/tvShowTypes';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
    },
  },
}));

vi.mock('./useCriticalContent', () => ({
  useCriticalContent: vi.fn(),
}));

describe('useCriticalContent for TV shows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps useCriticalContent results correctly', () => {
    const mockContentTvShows: TvShow[] = [
      {
        id: 1,
        name: 'Test Tv Show 1',
        poster_path: 'https://example.com/poster1.jpg',
        first_air_date: '2025-01-01',
        vote_average: 7.5,
        vote_count: 100,
        overview: 'Overview 1',
        backdrop_path: 'https://example.com/backdrop1.jpg',
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
      },
      {
        id: 2,
        name: 'Test Tv Show 2',
        poster_path: 'https://example.com/poster2.jpg',
        first_air_date: '2025-01-02',
        vote_average: 8.0,
        vote_count: 150,
        overview: 'Overview 2',
        backdrop_path: 'https://example.com/backdrop2.jpg',
        genres: [
          { id: 3, name: 'Drama' },
          { id: 4, name: 'Romance' },
        ],
      },
    ];

    const mockGenres: Genre[] = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
    ];

    vi.mocked(useCriticalContent).mockReturnValue({
      items: mockContentTvShows,
      genres: mockGenres,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useCriticalContent<TvShow>({
        selectItems: (state: RootState) => state.tvShows.categories.popular,
        selectLoading: (state: RootState) => state.tvShows.categoriesLoading.popular,
        selectError: (state: RootState) => state.tvShows.error,
        fetchAction: fetchTvShowsByCategory,
        setAction: ({ category, items }) =>
          setCategoryTvShows({ category, tvShows: items as TvShow[] }),
        cacheKey: 'critical_popular_tv_shows',
      }),
    );

    expect(result.current).toEqual({
      items: mockContentTvShows,
      genres: mockGenres,
      isLoading: false,
      error: null,
    });
  });
});
