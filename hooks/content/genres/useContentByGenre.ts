import { CardItem } from '@/features/cards/mapToCardItem';
import { usePaginatedContent } from '../pagination/usePaginatedContent';
import { getContentByGenre } from '@/lib/client/data-service';
import { MediaContent } from '@/types/media';

interface UseContentByGenreReturn {
  items: CardItem[];
  loading: boolean;
  initialLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loadMoreRef: (node: HTMLDivElement | null) => void;
}

export function useContentByGenre(
  genreId: number,
  contentType: 'movie' | 'tv',
): UseContentByGenreReturn {
  return usePaginatedContent<MediaContent>({
    fetchPage: async (page, signal) => {
      const response = await getContentByGenre(contentType, [genreId], page, signal);
      return {
        items: (response.content as MediaContent[]) || [],
        totalPages: response.totalPages || 1,
      };
    },
    contentType,
    dependencies: [genreId],
    enabled: !!genreId,
  });
}
