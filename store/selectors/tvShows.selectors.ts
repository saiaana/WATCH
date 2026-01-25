import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectFavoriteTvShows = (state: RootState) => state.tvShows.favoriteItems;
export const selectIsTvFavoritesInitialized = (state: RootState) =>
  state.tvShows.isFavoritesInitialized;

export const selectIsTvFavorite = (id: number) =>
  createSelector([selectFavoriteTvShows], (fav) => fav.some((t) => t.id === id));
