import React from 'react';
import { cn } from '@/lib/utils';
import LoadingMore from './LoadingMore';
import { getItemTypeLabel } from '@/helpers/getItemTypeLabel';

interface InfiniteScrollFooterProps {
  loadMoreRef?: (node: HTMLDivElement | null) => void;
  loading: boolean;
  hasMore: boolean;
  itemCount: number;
  itemType: 'movie' | 'tv' | 'item';
  loadingMessage?: string;
  className?: string;
}

export default function InfiniteScrollFooter({
  loadMoreRef,
  loading,
  hasMore,
  itemCount,
  itemType,
  loadingMessage,
  className,
}: InfiniteScrollFooterProps) {
  const DEFAULT_LOADING_MESSAGES = {
    movie: 'Loading more movies...',
    tv: 'Loading more TV shows...',
    item: 'Loading more...',
  } as const;

  const defaultLoadingMessage = DEFAULT_LOADING_MESSAGES[itemType];

  const EndMessage = (
    <div className="flex flex-col items-center gap-2">
      <p className="text-center text-sm text-neutral-400">You&apos;ve reached the end! 🎉</p>
      <p className="text-xs text-neutral-500">
        Found {itemCount} {getItemTypeLabel(itemType, itemCount)}
      </p>
    </div>
  );

  return (
    <div
      ref={loadMoreRef}
      className={cn('mb-8 mt-12 flex h-24 flex-col items-center justify-center', className)}
    >
      {loading && <LoadingMore message={loadingMessage || defaultLoadingMessage} />}
      {!hasMore && itemCount > 0 && EndMessage}
    </div>
  );
}
