import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import { useFavorites } from './useFavorites';

import { useAppSelector } from '@/store';
import { useCardItems } from '@/hooks/utils/useCardItems';
import {
  selectGenres,
  selectIsFavoritesInitialized,
  selectFavoriteMovies,
  selectFavoriteTvShows,
} from '@/store/selectors';
import type { Genre } from '@/types/common';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import type { CardItem } from '@/features/cards/mapToCardItem';

vi.mock('@/store', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@/hooks/utils/useCardItems', () => ({
  useCardItems: vi.fn(),
}));

describe('useFavorites — happy path', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns correct data when favorites are initialized', () => {
    const genresMock: Genre[] = [{ id: 1, name: 'Action' }];
    const favoriteMoviesMock: Movie[] = [{ id: 10, title: 'Movie' } as Movie];
    const favoriteTvShowsMock: TvShow[] = [{ id: 20, name: 'TV Show' } as TvShow];

    const movieItemsMock: CardItem[] = [
      { id: 10, title: 'Movie', poster: '', rating: '5.0', genres: 'Action', contentType: 'movie' },
    ];
    const tvItemsMock: CardItem[] = [
      { id: 20, title: 'TV Show', poster: '', rating: '4.5', genres: 'Drama', contentType: 'tv' },
    ];

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectGenres) return genresMock;
      if (selector === selectIsFavoritesInitialized) return true;
      if (selector === selectFavoriteMovies) return favoriteMoviesMock;
      if (selector === selectFavoriteTvShows) return favoriteTvShowsMock;
      return undefined;
    });

    (useCardItems as Mock).mockReturnValueOnce(movieItemsMock).mockReturnValueOnce(tvItemsMock);

    const { result } = renderHook(() => useFavorites());

    expect(result.current.movies.loading).toBe(false);
    expect(result.current.tvShows.loading).toBe(false);

    expect(result.current.movies.hasMore).toBe(false);
    expect(result.current.tvShows.hasMore).toBe(false);

    expect(useCardItems).toHaveBeenCalledTimes(2);

    expect(useCardItems).toHaveBeenCalledWith(favoriteMoviesMock, genresMock, 'movie');

    expect(useCardItems).toHaveBeenCalledWith(favoriteTvShowsMock, genresMock, 'tv');

    expect(result.current.movies.items).toBe(movieItemsMock);
    expect(result.current.tvShows.items).toBe(tvItemsMock);
  });

  it('returns correct data when favorites are not initialized', () => {
    const genresMock: Genre[] = [{ id: 1, name: 'Action' }];
    const favoriteMoviesMock: Movie[] = [{ id: 10, title: 'Movie' } as Movie];
    const favoriteTvShowsMock: TvShow[] = [{ id: 20, name: 'TV Show' } as TvShow];

    const movieItemsMock: CardItem[] = [
      { id: 10, title: 'Movie', poster: '', rating: '5.0', genres: 'Action', contentType: 'movie' },
    ];
    const tvItemsMock: CardItem[] = [
      { id: 20, title: 'TV Show', poster: '', rating: '4.5', genres: 'Drama', contentType: 'tv' },
    ];

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectGenres) return genresMock;
      if (selector === selectIsFavoritesInitialized) return false;
      if (selector === selectFavoriteMovies) return favoriteMoviesMock;
      if (selector === selectFavoriteTvShows) return favoriteTvShowsMock;
      return undefined;
    });

    (useCardItems as Mock).mockReturnValueOnce(movieItemsMock).mockReturnValueOnce(tvItemsMock);

    const { result } = renderHook(() => useFavorites());

    expect(result.current.movies.loading).toBe(true);
    expect(result.current.tvShows.loading).toBe(true);

    expect(result.current.movies.hasMore).toBe(false);
    expect(result.current.tvShows.hasMore).toBe(false);

    expect(useCardItems).toHaveBeenCalledTimes(2);

    expect(useCardItems).toHaveBeenCalledWith(favoriteMoviesMock, genresMock, 'movie');

    expect(useCardItems).toHaveBeenCalledWith(favoriteTvShowsMock, genresMock, 'tv');

    expect(result.current.movies.items).toBe(movieItemsMock);
    expect(result.current.tvShows.items).toBe(tvItemsMock);
  });
  it('returns correct data when favorites are empty', () => {
    const genresMock: Genre[] = [{ id: 1, name: 'Action' }];
    const favoriteMoviesMock: Movie[] = [];
    const favoriteTvShowsMock: TvShow[] = [];

    const movieItemsMock: CardItem[] = [];
    const tvItemsMock: CardItem[] = [];

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectGenres) return genresMock;
      if (selector === selectIsFavoritesInitialized) return true;
      if (selector === selectFavoriteMovies) return favoriteMoviesMock;
      if (selector === selectFavoriteTvShows) return favoriteTvShowsMock;
      return undefined;
    });

    (useCardItems as Mock).mockReturnValueOnce(movieItemsMock).mockReturnValueOnce(tvItemsMock);

    const { result } = renderHook(() => useFavorites());

    expect(result.current.movies.loading).toBe(false);
    expect(result.current.tvShows.loading).toBe(false);

    expect(result.current.movies.hasMore).toBe(false);
    expect(result.current.tvShows.hasMore).toBe(false);

    expect(useCardItems).toHaveBeenCalledTimes(2);

    expect(useCardItems).toHaveBeenCalledWith(favoriteMoviesMock, genresMock, 'movie');

    expect(useCardItems).toHaveBeenCalledWith(favoriteTvShowsMock, genresMock, 'tv');

    expect(result.current.movies.items).toBe(movieItemsMock);
    expect(result.current.tvShows.items).toBe(tvItemsMock);
  });

  it('returns correct data when genres are not initialized', () => {
    const genresMock: Genre[] = [];
    const favoriteMoviesMock: Movie[] = [{ id: 10, title: 'Movie' } as Movie];
    const favoriteTvShowsMock: TvShow[] = [{ id: 20, name: 'TV Show' } as TvShow];

    const movieItemsMock: CardItem[] = [
      { id: 10, title: 'Movie', poster: '', rating: '5.0', genres: 'Action', contentType: 'movie' },
    ];
    const tvItemsMock: CardItem[] = [
      { id: 20, title: 'TV Show', poster: '', rating: '4.5', genres: 'Drama', contentType: 'tv' },
    ];

    (useAppSelector as Mock).mockImplementation((selector: unknown) => {
      if (selector === selectGenres) return genresMock;
      if (selector === selectIsFavoritesInitialized) return true;
      if (selector === selectFavoriteMovies) return favoriteMoviesMock;
      if (selector === selectFavoriteTvShows) return favoriteTvShowsMock;
      return undefined;
    });

    (useCardItems as Mock).mockReturnValueOnce(movieItemsMock).mockReturnValueOnce(tvItemsMock);

    const { result } = renderHook(() => useFavorites());

    expect(result.current.movies.loading).toBe(false);
    expect(result.current.tvShows.loading).toBe(false);

    expect(result.current.movies.hasMore).toBe(false);
    expect(result.current.tvShows.hasMore).toBe(false);

    expect(useCardItems).toHaveBeenCalledTimes(2);

    expect(useCardItems).toHaveBeenCalledWith(favoriteMoviesMock, genresMock, 'movie');

    expect(useCardItems).toHaveBeenCalledWith(favoriteTvShowsMock, genresMock, 'tv');

    expect(result.current.movies.items).toBe(movieItemsMock);
    expect(result.current.tvShows.items).toBe(tvItemsMock);
  });
});
