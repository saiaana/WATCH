import { useGenres } from '@/hooks/utils/useGenres';
import type { CardItem } from '@/features/cards/mapToCardItem';
import { usePagination, type PaginatedResponse } from '@/hooks/ui/usePagination';
import { useCardItems } from '@/hooks/utils/useCardItems';
import { MediaContent } from '@/types/media';

interface UsePaginatedContentOptions<T extends MediaContent> {
  fetchPage: (page: number, signal?: AbortSignal) => Promise<PaginatedResponse<T>>;
  contentType: 'movie' | 'tv';
  dependencies?: unknown[];
  enabled?: boolean;
}

interface UsePaginatedContentReturn {
  items: CardItem[];
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loadMoreRef: (node: HTMLDivElement | null) => void;
}

export function usePaginatedContent<T extends MediaContent>({
  fetchPage,
  contentType,
  dependencies = [],
  enabled = true,
}: UsePaginatedContentOptions<T>): UsePaginatedContentReturn {
  const { genres } = useGenres();

  const pagination = usePagination<T>({
    fetchPage,
    enabled,
    dependencies,
  });

  const items = useCardItems(pagination.items, genres, contentType);

  return {
    items,
    loading: pagination.loading,
    initialLoading: pagination.initialLoading,
    hasMore: pagination.hasMore,
    loadMore: pagination.loadMore,
    loadMoreRef: pagination.loadMoreRef,
  };
}
