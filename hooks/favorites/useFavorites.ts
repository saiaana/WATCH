'use client';

import { useAppSelector } from '@/store';
import {
  selectFavoriteMovies,
  selectFavoriteTvShows,
  selectGenres,
  selectIsFavoritesInitialized,
} from '@/store/selectors';
import { useCardItems } from '@/hooks/utils/useCardItems';

export function useFavorites() {
  const genres = useAppSelector(selectGenres);
  const isInitialized = useAppSelector(selectIsFavoritesInitialized);

  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const favoriteTvShows = useAppSelector(selectFavoriteTvShows);

  const movieItems = useCardItems(favoriteMovies, genres, 'movie');
  const tvShowItems = useCardItems(favoriteTvShows, genres, 'tv');

  return {
    movies: {
      items: movieItems,
      loading: !isInitialized,
      hasMore: false,
    },
    tvShows: {
      items: tvShowItems,
      loading: !isInitialized,
      hasMore: false,
    },
  };
}
