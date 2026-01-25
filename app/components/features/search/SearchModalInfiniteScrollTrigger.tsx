import { memo } from 'react';
import LoadingSpinner from '@/app/components/ui/LoadingSpinner';

interface SearchModalInfiniteScrollTriggerProps {
  hasMore: boolean;
  loading: boolean;
  loadMoreRef: (node: HTMLDivElement | null) => void;
  activeTab: string;
}

function SearchModalInfiniteScrollTrigger({
  hasMore,
  loading,
  loadMoreRef,
  activeTab,
}: SearchModalInfiniteScrollTriggerProps) {
  if (!hasMore) return null;

  return (
    <div key={activeTab} ref={loadMoreRef} className="flex h-4 items-center justify-center py-4">
      {loading && <LoadingSpinner size="sm" />}
    </div>
  );
}

export default memo(SearchModalInfiniteScrollTrigger);
