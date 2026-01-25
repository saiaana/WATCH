import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

type WithId = { id: number | string };

type SliceStateMap = {
  movies: RootState['movies'];
  tvShows: RootState['tvShows'];
};

export function createFavoritesThunks<T extends WithId>(opts: {
  slice: 'movies' | 'tvShows';
  storageKeyPrefix: string;
}) {
  const { slice, storageKeyPrefix } = opts;

  const addFavorite = createAsyncThunk<T[], T, { rejectValue: string; state: RootState }>(
    `${slice}/addFavorite`,
    async (item, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const user = state.auth.user;
        const sliceState = state[slice] as SliceStateMap[typeof slice];
        const existing = sliceState.favoriteItems as unknown as T[];

        if (!user || typeof window === 'undefined') {
          const exists = existing.some((x) => x.id === item.id);
          return exists ? existing : [...existing, item];
        }

        const exists = existing.some((x) => x.id === item.id);
        if (exists) return existing;

        const updated = [...existing, item];
        const storageKey = `${storageKeyPrefix}_${user.id}`;
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      } catch (e) {
        return rejectWithValue((e as Error).message);
      }
    },
  );

  const removeFavorite = createAsyncThunk<T[], T, { rejectValue: string; state: RootState }>(
    `${slice}/removeFavorite`,
    async (item, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const user = state.auth.user;
        const sliceState = state[slice] as SliceStateMap[typeof slice];
        const existing = sliceState.favoriteItems as unknown as T[];
        const updated = existing.filter((x) => x.id !== item.id);

        if (user && typeof window !== 'undefined') {
          const storageKey = `${storageKeyPrefix}_${user.id}`;
          localStorage.setItem(storageKey, JSON.stringify(updated));
        }

        return updated;
      } catch (e) {
        return rejectWithValue((e as Error).message);
      }
    },
  );

  const loadFavorites = createAsyncThunk<T[], void, { rejectValue: string; state: RootState }>(
    `${slice}/loadFavorites`,
    async (_, { getState, rejectWithValue }) => {
      try {
        const state = getState();
        const user = state.auth.user;

        if (!user || typeof window === 'undefined') return [];

        const storageKey = `${storageKeyPrefix}_${user.id}`;
        const stored = localStorage.getItem(storageKey);
        if (!stored) return [];

        try {
          const parsed = JSON.parse(stored);
          return Array.isArray(parsed) ? (parsed as T[]) : [];
        } catch {
          return rejectWithValue('Failed to parse favorites from localStorage');
        }
      } catch (e) {
        return rejectWithValue((e as Error).message);
      }
    },
  );

  return { addFavorite, removeFavorite, loadFavorites };
}
