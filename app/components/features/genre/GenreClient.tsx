'use client';

import { useMemo } from 'react';
import { useContentByGenre } from '@/hooks/content/genres/useContentByGenre';
import { useGenres } from '@/hooks/utils/useGenres';
import ContentGridWithTabs from '@/app/components/features/content/ContentGridWithTabs';
import { getContentLink } from '@/helpers/routes';

interface Props {
  genreId: number;
}

export default function GenreClient({ genreId }: Props) {
  const movies = useContentByGenre(genreId, 'movie');
  const tvShows = useContentByGenre(genreId, 'tv');
  const { genres } = useGenres();

  const genreName = useMemo(() => {
    const genre = genres.find((g) => g.id === genreId);
    return genre?.name || 'Genre';
  }, [genres, genreId]);

  return (
    <ContentGridWithTabs
      title={genreName}
      subtitle={`Discover ${genreName.toLowerCase()} movies and TV shows`}
      icon="🎭"
      moviesTab={{
        ...movies,
        emptyStateIcon: '🎬',
        emptyStateTitle: `No ${genreName.toLowerCase()} movies found`,
        emptyStateDescription: 'Try exploring other genres or check back later',
        loadingTitle: `Loading ${genreName} Movies`,
        loadingSubtitle: 'Discovering content...',
      }}
      tvTab={{
        ...tvShows,
        emptyStateIcon: '📺',
        emptyStateTitle: `No ${genreName.toLowerCase()} TV shows found`,
        emptyStateDescription: 'Try exploring other genres or check back later',
        loadingTitle: `Loading ${genreName} TV Shows`,
        loadingSubtitle: 'Discovering content...',
      }}
      getMovieLinkTo={(item) => getContentLink(item.id, 'movie')}
      getTvLinkTo={(item) => getContentLink(item.id, 'tv')}
    />
  );
}
