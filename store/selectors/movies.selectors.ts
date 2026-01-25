import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectFavoriteMovies = (state: RootState) => state.movies.favoriteItems;
export const selectIsMoviesFavoritesInitialized = (state: RootState) =>
  state.movies.isFavoritesInitialized;

export const selectIsMovieFavorite = (id: number) =>
  createSelector([selectFavoriteMovies], (fav) => fav.some((m) => m.id === id));
