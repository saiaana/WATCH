'use client';
import ContentGridWithTabs from '@/app/components/features/content/ContentGridWithTabs';
import { useSimilarContent } from '@/hooks/content/useSimilarContent';
import { useGenres } from '@/hooks/utils/useGenres';
import { mapToCardItem } from '@/features/cards/mapToCardItem';
import LoadingState from '@/app/components/ui/LoadingState';
import EmptyState from '@/app/components/ui/EmptyState';
import type { TabContent } from '@/types/component';

interface SimilarContentClientProps {
  contentId: string;
  type: 'movie' | 'tv';
  title: string;
}

export default function SimilarContentClient({
  contentId,
  type,
  title,
}: SimilarContentClientProps) {
  const { genres } = useGenres();
  const {
    items: similarItems,
    loading,
    error,
    hasMore,
    loadMoreRef,
  } = useSimilarContent(contentId, type);

  const cardItems =
    genres.length > 0 ? similarItems.map((item) => mapToCardItem(item, genres, { type })) : [];

  const displayTitle =
    title && title !== 'Movie' && title !== 'TV Show'
      ? `Similar ${type === 'movie' ? 'Movies' : 'TV Shows'} to "${title}"`
      : `Similar ${type === 'movie' ? 'Movies' : 'TV Shows'}`;

  const subtitle = `Discover similar ${type === 'movie' ? 'movies' : 'TV shows'}`;

  if (loading && cardItems.length === 0) {
    return (
      <LoadingState title="Loading similar content..." subtitle={subtitle} fullScreen={true} />
    );
  }

  if (error) {
    return <EmptyState icon="⚠️" title="Failed to load similar content" description={error} />;
  }

  if (cardItems.length === 0) {
    return <EmptyState icon="🎬" title="No similar content available" />;
  }

  const singleTab: TabContent = {
    items: cardItems,
    loading,
    initialLoading: false,
    hasMore,
    loadMoreRef,
    emptyStateIcon: '🎬',
    emptyStateTitle: 'No similar content available',
    emptyStateDescription: 'Check back later',
  };

  return (
    <ContentGridWithTabs
      title={displayTitle}
      subtitle={subtitle}
      icon="🎬"
      moviesTab={singleTab}
      tvTab={singleTab}
      getMovieLinkTo={(item) => `/${type === 'movie' ? 'movies' : 'tvshows'}/${item.id}`}
      getTvLinkTo={(item) => `/${type === 'movie' ? 'movies' : 'tvshows'}/${item.id}`}
      showTabs={false}
    />
  );
}
