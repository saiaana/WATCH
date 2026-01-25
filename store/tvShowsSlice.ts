import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { TvShow } from '@/types/tvShowTypes';
import { createFavoritesThunks } from './factories/createFavoritesThunks';
import { getContentByCategory } from '@/lib/client/data-service';
import { CACHE_TTL_MS } from '@/constants/cache';
import type { RootState } from './index';
import type { TvShowCategory } from '@/config/categories';

const favorites = createFavoritesThunks<TvShow>({
  slice: 'tvShows',
  storageKeyPrefix: 'favoriteTvShows',
});

type Category = TvShowCategory;

const CACHE_TTL = CACHE_TTL_MS.SHORT;

export const fetchTvShowsByCategory = createAsyncThunk<
  { category: Category; tvShows: TvShow[] },
  Category,
  { rejectValue: string; state: RootState }
>('tvShows/fetchTvShowsByCategory', async (category, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const cachedShows = state.tvShows.categories[category];
    const timestamp = state.tvShows.categoriesTimestamps[category];

    if (cachedShows.length > 0 && timestamp && Date.now() - timestamp < CACHE_TTL) {
      return { category, tvShows: cachedShows };
    }

    const result = await getContentByCategory('tv', category, 1);
    return { category, tvShows: (result.content as TvShow[]) || [] };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

interface TvShowsState {
  favoriteItems: TvShow[];
  isFavoritesInitialized: boolean;

  categories: Record<Category, TvShow[]>;
  categoriesLoading: Record<Category, boolean>;
  categoriesTimestamps: Record<Category, number | null>;

  error: string | null;
}

const initialState: TvShowsState = {
  favoriteItems: [],
  isFavoritesInitialized: false,

  categories: {
    popular: [],
    top_rated: [],
    on_the_air: [],
    airing_today: [],
  },
  categoriesLoading: {
    popular: false,
    top_rated: false,
    on_the_air: false,
    airing_today: false,
  },
  categoriesTimestamps: {
    popular: null,
    top_rated: null,
    on_the_air: null,
    airing_today: null,
  },

  error: null,
};

const tvShowsSlice = createSlice({
  name: 'tvShows',
  initialState,
  reducers: {
    setFavoriteTvShows(state, action: PayloadAction<TvShow[]>) {
      state.favoriteItems = action.payload;
      state.isFavoritesInitialized = true;
    },
    clearFavoriteTvShows(state) {
      state.favoriteItems = [];
      state.isFavoritesInitialized = true;
    },
    setCategoryTvShows(state, action: PayloadAction<{ category: Category; tvShows: TvShow[] }>) {
      state.categories[action.payload.category] = action.payload.tvShows;
      state.categoriesTimestamps[action.payload.category] = Date.now();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favorites.addFavorite.fulfilled, (state, action) => {
        state.favoriteItems = action.payload;
      })
      .addCase(favorites.removeFavorite.fulfilled, (state, action) => {
        state.favoriteItems = action.payload;
      })
      .addCase(favorites.loadFavorites.fulfilled, (state, action) => {
        state.favoriteItems = action.payload;
        state.isFavoritesInitialized = true;
      })
      .addCase(favorites.loadFavorites.rejected, (state) => {
        state.isFavoritesInitialized = true;
      })
      .addCase(fetchTvShowsByCategory.pending, (state, action) => {
        state.categoriesLoading[action.meta.arg] = true;
      })
      .addCase(fetchTvShowsByCategory.fulfilled, (state, action) => {
        state.categoriesLoading[action.payload.category] = false;
        state.categories[action.payload.category] = action.payload.tvShows;
        state.categoriesTimestamps[action.payload.category] = Date.now();
      })
      .addCase(fetchTvShowsByCategory.rejected, (state, action) => {
        state.categoriesLoading[action.meta.arg] = false;
        state.error = action.payload || 'Failed to load TV shows';
      });
  },
});

export const { setFavoriteTvShows, clearFavoriteTvShows, setCategoryTvShows } =
  tvShowsSlice.actions;

export const addFavoriteTvShow = favorites.addFavorite;
export const removeFavoriteTvShow = favorites.removeFavorite;
export const loadFavoriteTvShows = favorites.loadFavorites;

export default tvShowsSlice.reducer;
