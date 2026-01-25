import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { Movie } from '@/types/movieTypes';
import { createFavoritesThunks } from './factories/createFavoritesThunks';
import { getContentByCategory } from '@/lib/client/data-service';
import { CACHE_TTL_MS } from '@/constants/cache';
import type { RootState } from './index';
import type { MovieCategory } from '@/config/categories';

const favorites = createFavoritesThunks<Movie>({
  slice: 'movies',
  storageKeyPrefix: 'favoriteMovies',
});

type Category = MovieCategory;

const CACHE_TTL = CACHE_TTL_MS.SHORT;

export const fetchMoviesByCategory = createAsyncThunk<
  { category: Category; movies: Movie[] },
  Category,
  { rejectValue: string; state: RootState }
>('movies/fetchMoviesByCategory', async (category, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const cachedMovies = state.movies.categories[category];
    const timestamp = state.movies.categoriesTimestamps[category];

    if (cachedMovies.length > 0 && timestamp && Date.now() - timestamp < CACHE_TTL) {
      return { category, movies: cachedMovies };
    }

    const result = await getContentByCategory('movie', category, 1);
    return { category, movies: result.content as Movie[] };
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

interface MoviesState {
  favoriteItems: Movie[];
  isFavoritesInitialized: boolean;

  categories: Record<Category, Movie[]>;
  categoriesLoading: Record<Category, boolean>;
  categoriesTimestamps: Record<Category, number | null>;

  error: string | null;
}

const initialState: MoviesState = {
  favoriteItems: [],
  isFavoritesInitialized: false,

  categories: {
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: [],
  },
  categoriesLoading: {
    popular: false,
    top_rated: false,
    upcoming: false,
    now_playing: false,
  },
  categoriesTimestamps: {
    popular: null,
    top_rated: null,
    upcoming: null,
    now_playing: null,
  },

  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFavoriteMovies(state, action: PayloadAction<Movie[]>) {
      state.favoriteItems = action.payload;
      state.isFavoritesInitialized = true;
    },
    clearFavoriteMovies(state) {
      state.favoriteItems = [];
      state.isFavoritesInitialized = true;
    },
    setCategoryMovies(state, action: PayloadAction<{ category: Category; movies: Movie[] }>) {
      state.categories[action.payload.category] = action.payload.movies;
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
      .addCase(fetchMoviesByCategory.pending, (state, action) => {
        state.categoriesLoading[action.meta.arg] = true;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.categoriesLoading[action.payload.category] = false;
        state.categories[action.payload.category] = action.payload.movies;
        state.categoriesTimestamps[action.payload.category] = Date.now();
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.categoriesLoading[action.meta.arg] = false;
        state.error = action.payload || 'Failed to load movies';
      });
  },
});

export const { setFavoriteMovies, clearFavoriteMovies, setCategoryMovies } = moviesSlice.actions;

export const addFavoriteMovie = favorites.addFavorite;
export const removeFavoriteMovie = favorites.removeFavorite;
export const loadFavoriteMovies = favorites.loadFavorites;

export default moviesSlice.reducer;
