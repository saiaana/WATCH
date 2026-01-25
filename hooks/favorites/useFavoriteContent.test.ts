import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { useFavoriteContent } from './useFavoriteContent';

import { useAppDispatch, useAppSelector } from '@/store';
import { addFavoriteMovie, removeFavoriteMovie } from '@/store/moviesSlice';
import { addFavoriteTvShow, removeFavoriteTvShow } from '@/store/tvShowsSlice';
import { selectFavoriteMovies, selectFavoriteTvShows, selectUser } from '@/store/selectors';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';

vi.mock('@/store', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('@/store/moviesSlice', () => ({
  addFavoriteMovie: vi.fn(),
  removeFavoriteMovie: vi.fn(),
}));

vi.mock('@/store/tvShowsSlice', () => ({
  addFavoriteTvShow: vi.fn(),
  removeFavoriteTvShow: vi.fn(),
}));

describe('useFavoriteContent', () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppDispatch as Mock).mockReturnValue(dispatchMock);
  });

  it('returns isFavorite = true for favorite movie', () => {
    const movie: Movie = {
      id: 1,
      title: 'Movie',
      poster_path: null,
      vote_average: 5.0,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [movie];
      if (selector === selectFavoriteTvShows) return [];
      if (selector === selectUser) return { id: 100 };
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(movie));

    expect(result.current.isFavorite).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.original).toBe(movie);
  });

  it('dispatches addFavoriteMovie when toggling non-favorite movie', () => {
    const movie: Movie = {
      id: 1,
      title: 'Movie',
      poster_path: null,
      vote_average: 5.0,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [];
      if (selector === selectFavoriteTvShows) return [];
      if (selector === selectUser) return { id: 100 };
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(movie));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(addFavoriteMovie).toHaveBeenCalledWith(movie);
    expect(dispatchMock).toHaveBeenCalledWith(addFavoriteMovie(movie));
  });

  it('dispatches removeFavoriteMovie when toggling favorite movie', () => {
    const movie: Movie = {
      id: 1,
      title: 'Movie',
      poster_path: null,
      vote_average: 5.0,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [movie];
      if (selector === selectFavoriteTvShows) return [];
      if (selector === selectUser) return { id: 100 };
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(movie));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(removeFavoriteMovie).toHaveBeenCalledWith(movie);
    expect(dispatchMock).toHaveBeenCalledWith(removeFavoriteMovie(movie));
  });

  it('dispatches addFavoriteTvShow for non-favorite tv show', () => {
    const tvShow: TvShow = {
      id: 2,
      name: 'TV Show',
      poster_path: null,
      vote_average: 5.0,
      vote_count: 100,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [];
      if (selector === selectFavoriteTvShows) return [];
      if (selector === selectUser) return { id: 100 };
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(tvShow));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(addFavoriteTvShow).toHaveBeenCalledWith(tvShow);
    expect(dispatchMock).toHaveBeenCalledWith(addFavoriteTvShow(tvShow));
  });

  it('dispatches removeFavoriteTvShow for favorite tv show', () => {
    const tvShow: TvShow = {
      id: 2,
      name: 'TV Show',
      poster_path: null,
      vote_average: 5.0,
      vote_count: 100,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [];
      if (selector === selectFavoriteTvShows) return [tvShow];
      if (selector === selectUser) return { id: 100 };
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(tvShow));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(removeFavoriteTvShow).toHaveBeenCalledWith(tvShow);
    expect(dispatchMock).toHaveBeenCalledWith(removeFavoriteTvShow(tvShow));
  });

  it('does not dispatch anything when user is not authenticated', () => {
    const movie: Movie = {
      id: 1,
      title: 'Movie',
      poster_path: null,
      vote_average: 5.0,
      backdrop_path: null,
    };

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectFavoriteMovies) return [];
      if (selector === selectFavoriteTvShows) return [];
      if (selector === selectUser) return null;
      return undefined;
    });

    const { result } = renderHook(() => useFavoriteContent(movie));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
