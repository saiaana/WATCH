'use client';

import { useInfiniteScroll } from '@/hooks/ui/useInfiniteScroll';
import ContentGridWithTabs from './ContentGridWithTabs';
import { getContentLink } from '@/helpers/routes';
import type { CardItem } from '@/features/cards/mapToCardItem';

interface PersonTabData {
  items: CardItem[];
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

interface Props {
  title: string;
  subtitle: string;
  icon?: string;

  movies: PersonTabData;
  tvShows: PersonTabData;

  emptyMovieText: {
    title: string;
    description: string;
  };
  emptyTvText: {
    title: string;
    description: string;
  };

  loadingMovieTitle?: string;
  loadingMovieSubtitle?: string;
  loadingTvTitle?: string;
  loadingTvSubtitle?: string;
}

export default function PersonContentPageClient({
  title,
  subtitle,
  icon,
  movies,
  tvShows,
  emptyMovieText,
  emptyTvText,
  loadingMovieTitle = 'Loading Movies',
  loadingMovieSubtitle = 'Discovering filmography...',
  loadingTvTitle = 'Loading TV Shows',
  loadingTvSubtitle = 'Discovering filmography...',
}: Props) {
  const moviesLoadMoreRef = useInfiniteScroll({
    hasMore: movies.hasMore,
    loading: movies.loading,
    onLoadMore: movies.loadMore,
  });

  const tvLoadMoreRef = useInfiniteScroll({
    hasMore: tvShows.hasMore,
    loading: tvShows.loading,
    onLoadMore: tvShows.loadMore,
  });

  return (
    <ContentGridWithTabs
      title={title}
      subtitle={subtitle}
      icon={icon}
      moviesTab={{
        ...movies,
        loadMoreRef: moviesLoadMoreRef,
        emptyStateIcon: '🎬',
        emptyStateTitle: emptyMovieText.title,
        emptyStateDescription: emptyMovieText.description,
        loadingTitle: loadingMovieTitle,
        loadingSubtitle: loadingMovieSubtitle,
      }}
      tvTab={{
        ...tvShows,
        loadMoreRef: tvLoadMoreRef,
        emptyStateIcon: '📺',
        emptyStateTitle: emptyTvText.title,
        emptyStateDescription: emptyTvText.description,
        loadingTitle: loadingTvTitle,
        loadingSubtitle: loadingTvSubtitle,
      }}
      getMovieLinkTo={(item: CardItem) => getContentLink(item.id, 'movie')}
      getTvLinkTo={(item: CardItem) => getContentLink(item.id, 'tv')}
    />
  );
}
