import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGenres } from '@/lib/client/data-service';
import type { Genre } from '@/types/common';

interface GenresState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

const initialState: GenresState = {
  genres: [],
  loading: false,
  error: null,
};

export const fetchGenres = createAsyncThunk<Genre[], void, { rejectValue: string }>(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const result = await getGenres();
      return result.genres || [];
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  },
);

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load genres';
      });
  },
});

export default genresSlice.reducer;
