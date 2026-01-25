'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { loadFavoriteMovies } from '@/store/moviesSlice';
import { selectUser } from '@/store/selectors';
import { loadFavoriteTvShows } from '@/store/tvShowsSlice';
import { useEffect } from 'react';

export default function FavoritesInitializer() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      dispatch(loadFavoriteMovies());
      dispatch(loadFavoriteTvShows());
    }
  }, [dispatch, user]);

  return null;
}
