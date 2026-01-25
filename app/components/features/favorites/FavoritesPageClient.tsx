'use client';

import { useAppSelector } from '@/store';
import { useFavorites } from '@/hooks/favorites/useFavorites';
import ContentGridWithTabs from '@/app/components/features/content/ContentGridWithTabs';
import { selectAuthLoading, selectAuthInitialized, selectUser } from '@/store/selectors';
import { getContentLink } from '@/helpers/routes';
import LoginPrompt from '@/app/components/features/auth/LoginPrompt';

export default function FavoritesPageClient() {
  const user = useAppSelector(selectUser);
  const userIsLoading = useAppSelector(selectAuthLoading);
  const isAuthInitialized = useAppSelector(selectAuthInitialized);
  const { movies, tvShows } = useFavorites();

  // Показываем LoginPrompt только если auth инициализирован, но пользователя нет
  if (isAuthInitialized && !user && !userIsLoading) {
    return (
      <LoginPrompt
        title="Access Your Favorites"
        description="Log in to save and manage your favorite movies and TV shows in one place"
      />
    );
  }

  return (
    <ContentGridWithTabs
      title="Your Favorites"
      subtitle="Your personal collection of saved content"
      icon="❤️"
      moviesTab={{
        ...movies,
        initialLoading: movies.loading,
        emptyStateIcon: '🎬',
        emptyStateTitle: 'No favorite movies yet',
        emptyStateDescription:
          'Start exploring and add movies you love to your favorites collection',
        loadingTitle: 'Loading Favorites',
        loadingSubtitle: 'Gathering your saved content...',
      }}
      tvTab={{
        ...tvShows,
        initialLoading: tvShows.loading,
        emptyStateIcon: '📺',
        emptyStateTitle: 'No favorite TV shows yet',
        emptyStateDescription:
          'Start exploring and add TV shows you love to your favorites collection',
        loadingTitle: 'Loading Favorites',
        loadingSubtitle: 'Gathering your saved content...',
      }}
      getMovieLinkTo={(item) => getContentLink(item.id, 'movie')}
      getTvLinkTo={(item) => getContentLink(item.id, 'tv')}
    />
  );
}
