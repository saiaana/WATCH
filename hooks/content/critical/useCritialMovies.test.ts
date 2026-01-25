import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCriticalContent } from './useCriticalContent';
import { fetchMoviesByCategory, setCategoryMovies } from '@/store/moviesSlice';
import type { RootState } from '@/store';
import type { Movie } from '@/types/movieTypes';
import type { Genre } from '@/types/common';

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

describe('useCriticalContent for movies', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('maps useCriticalContent results correctly', () => {
    const mockContentMovies: Movie[] = [
      {
        id: 1,
        title: 'Test Movie 1',
        poster_path: 'https://example.com/poster1.jpg',
        release_date: '2025-01-01',
        vote_average: 7.5,
        vote_count: 100,
        overview: 'Overview 1',
        backdrop_path: 'https://example.com/backdrop1.jpg',
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ],
        runtime: 120,
        production_countries: ['USA'],
      },
      {
        id: 2,
        title: 'Test Movie 2',
        poster_path: 'https://example.com/poster2.jpg',
        release_date: '2025-01-02',
        vote_average: 8.0,
        vote_count: 150,
        overview: 'Overview 2',
        backdrop_path: 'https://example.com/backdrop2.jpg',
        genres: [
          { id: 3, name: 'Drama' },
          { id: 4, name: 'Romance' },
        ],
        runtime: 130,
        production_countries: ['UK'],
      },
    ];

    const mockGenres: Genre[] = [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Drama' },
      { id: 4, name: 'Romance' },
    ];

    vi.mocked(useCriticalContent).mockReturnValue({
      items: mockContentMovies,
      genres: mockGenres,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useCriticalContent<Movie>({
        selectItems: (state: RootState) => state.movies.categories.popular,
        selectLoading: (state: RootState) => state.movies.categoriesLoading.popular,
        selectError: (state: RootState) => state.movies.error,
        fetchAction: fetchMoviesByCategory,
        setAction: ({ category, items }) =>
          setCategoryMovies({ category, movies: items as Movie[] }),
        cacheKey: 'critical_popular_movies',
      }),
    );

    expect(result.current).toEqual({
      items: mockContentMovies,
      genres: mockGenres,
      isLoading: false,
      error: null,
    });
  });
});
