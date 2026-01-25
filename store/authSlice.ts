import { supabase } from '@/lib/supabase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,
};

export const initUser = createAsyncThunk('auth/initUser', async (_, { rejectWithValue }) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return rejectWithValue(error.message);
  return user;
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError) return rejectWithValue(loginError.message);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) return rejectWithValue(userError.message);
    return user;
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { email, password, fullName }: { email: string; password: string; fullName: string },
    { rejectWithValue },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) return rejectWithValue(error.message);
    return data.user;
  },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
  const { error } = await supabase.auth.signOut();
  if (error) return rejectWithValue(error.message);
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(initUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true; // Отмечаем, что инициализация завершена
        state.user = action.payload;
      })
      .addCase(initUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true; // Отмечаем, что инициализация завершена (даже при ошибке)
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
