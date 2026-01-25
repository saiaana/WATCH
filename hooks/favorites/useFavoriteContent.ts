'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { addFavoriteMovie, removeFavoriteMovie } from '@/store/moviesSlice';
import { addFavoriteTvShow, removeFavoriteTvShow } from '@/store/tvShowsSlice';
import { selectFavoriteMovies, selectFavoriteTvShows, selectUser } from '@/store/selectors';
import type { Movie } from '@/types/movieTypes';
import type { TvShow } from '@/types/tvShowTypes';
import { MediaContent } from '@/types/media';

export function useFavoriteContent(content: MediaContent) {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const favoriteTvShows = useAppSelector(selectFavoriteTvShows);

  const user = useAppSelector(selectUser);

  const isMovie = 'title' in content;
  const favorites = isMovie ? favoriteMovies : favoriteTvShows;

  const isFavorite = favorites.some((item) => item.id === content.id);

  const toggleFavorite = () => {
    if (!user) {
      return;
    }

    if (isMovie) {
      if (isFavorite) {
        dispatch(removeFavoriteMovie(content as Movie));
      } else {
        dispatch(addFavoriteMovie(content as Movie));
      }
    } else {
      if (isFavorite) {
        dispatch(removeFavoriteTvShow(content as TvShow));
      } else {
        dispatch(addFavoriteTvShow(content as TvShow));
      }
    }
  };

  return {
    isFavorite,
    toggleFavorite,
    original: content,
    isAuthenticated: !!user,
  };
}
