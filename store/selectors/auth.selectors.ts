import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthInitialized = (state: RootState) => state.auth.isInitialized;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectIsAuthenticated = createSelector([selectUser], (u) => !!u);

export const selectUserFullName = createSelector([selectUser], (u) => {
  return u?.user_metadata?.full_name as string | undefined;
});
