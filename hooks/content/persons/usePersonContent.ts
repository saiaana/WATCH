import { useCallback } from 'react';
import { usePagination } from '@/hooks/ui/usePagination';
import { useGenres } from '@/hooks/utils/useGenres';
import { useCardItems } from '@/hooks/utils/useCardItems';
import { MediaContent } from '@/types/media';

type ContentType = 'movie' | 'tv';

type Fetcher = (
  personId: number,
  page: number,
  contentType: ContentType,
  signal?: AbortSignal,
) => Promise<{
  items: MediaContent[];
  totalPages: number;
}>;

export function usePersonContent(
  personId: number | null,
  contentType: ContentType,
  fetcher: Fetcher,
) {
  const { genres } = useGenres();

  const fetchPage = useCallback(
    async (page: number, signal?: AbortSignal) => {
      if (!personId) {
        return { items: [], totalPages: 0 };
      }

      const response = await fetcher(personId, page, contentType, signal);
      return {
        items: response.items,
        totalPages: response.totalPages,
      };
    },
    [personId, contentType, fetcher],
  );

  const pagination = usePagination<MediaContent>({
    fetchPage,
    enabled: Boolean(personId) && genres.length > 0,
    dependencies: [personId, contentType],
  });

  const items = useCardItems(pagination.items, genres, contentType);

  return {
    items,
    initialLoading: pagination.initialLoading,
    loading: pagination.loading,
    hasMore: pagination.hasMore,
    totalPages: pagination.totalPages,
    loadMore: pagination.loadMore,
  };
}
