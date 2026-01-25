export * from './auth.selectors';
export * from './genres.selectors';
export * from './movies.selectors';
export * from './tvShows.selectors';
export * from './ui.selectors';

import { createSelector } from '@reduxjs/toolkit';
import { selectIsMoviesFavoritesInitialized } from './movies.selectors';
import { selectIsTvFavoritesInitialized } from './tvShows.selectors';

export const selectIsFavoritesInitialized = createSelector(
  [selectIsMoviesFavoritesInitialized, selectIsTvFavoritesInitialized],
  (moviesInitialized, tvInitialized) => moviesInitialized && tvInitialized,
);
