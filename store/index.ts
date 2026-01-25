import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import tvShowsReducer from './tvShowsSlice';
import authReducer from './authSlice';
import genresReducer from './genresSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    tvShows: tvShowsReducer,
    auth: authReducer,
    genres: genresReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from './hooks';

export default store;
