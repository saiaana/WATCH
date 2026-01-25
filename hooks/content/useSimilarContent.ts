'use client';

import { useCallback } from 'react';
import type { MediaContent } from '@/types/media';
import { getSimilarContent } from '@/lib/client/data-service';
import { usePagination } from '../ui/usePagination';

interface UseSimilarContentReturn {
  items: MediaContent[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  loadMoreRef: (node: HTMLDivElement | null) => void;
}

export function useSimilarContent(
  contentId: string | null,
  type: 'movie' | 'tv',
): UseSimilarContentReturn {
  const fetchPage = useCallback(
    async (page: number, signal?: AbortSignal) => {
      if (!contentId) {
        return { items: [], totalPages: 0 };
      }

      const res = await getSimilarContent(Number(contentId), type, page, signal);
      return {
        items: (res.items || []) as MediaContent[],
        totalPages: res.totalPages || 1,
      };
    },
    [contentId, type],
  );

  const pagination = usePagination<MediaContent>({
    fetchPage,
    enabled: Boolean(contentId),
    dependencies: [contentId, type],
  });

  return {
    items: pagination.items,
    loading: pagination.initialLoading || pagination.loading,
    error: pagination.error?.message || null,
    hasMore: pagination.hasMore,
    loadMore: pagination.loadMore,
    loadMoreRef: pagination.loadMoreRef,
  };
}
