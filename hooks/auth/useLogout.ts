import { AppDispatch } from '@/store';
import { logoutUser } from '@/store/authSlice';
import { clearFavoriteMovies } from '@/store/moviesSlice';
import { clearFavoriteTvShows } from '@/store/tvShowsSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return async () => {
    try {
      dispatch(clearFavoriteMovies());
      dispatch(clearFavoriteTvShows());
      await dispatch(logoutUser()).unwrap();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
}
