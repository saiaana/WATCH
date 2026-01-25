import type { RootState } from '@/store';

export const selectGenres = (state: RootState) => state.genres.genres;
export const selectGenresLoading = (state: RootState) => state.genres.loading;
export const selectGenresError = (state: RootState) => state.genres.error;
