import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchGenres } from '@/store/genresSlice';

export function useGenres() {
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genres.genres);
  const isLoading = useAppSelector((state) => state.genres.loading);
  const error = useAppSelector((state) => state.genres.error);

  useEffect(() => {
    if (genres.length === 0 && !isLoading) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length, isLoading]);

  return { genres, isLoading, error };
}
