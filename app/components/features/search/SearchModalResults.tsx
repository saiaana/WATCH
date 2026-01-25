import { memo } from 'react';
import SearchModalResultsSection from './SearchModalResultsSection';
import SearchModalTabs from './SearchModalTabs';
import SearchModalState from './SearchModalState';
import SearchModalScrollContainer from './SearchModalScrollContainer';
import SearchModalInfiniteScrollTrigger from './SearchModalInfiniteScrollTrigger';
import { useSearchTabs } from './hooks/useSearchTabs';
import { useInfiniteScroll } from '@/hooks/ui/useInfiniteScroll';
import { SEARCH_TABS } from './types';
import type { SearchResultsData, SearchLoadingState, SearchPaginationState } from './types';

interface SearchModalResultsProps {
  loadingState: SearchLoadingState;
  results: SearchResultsData;
  paginationState: SearchPaginationState;
  hasSearched: boolean;
  query: string;
  onClose: () => void;
}

function SearchModalResults({
  loadingState,
  results,
  paginationState,
  hasSearched,
  query,
  onClose,
}: SearchModalResultsProps) {
  const {
    activeTab,
    handleTabChange,
    availableTabs,
    currentItems,
    currentContentType,
    currentLoadingMore,
    currentHasMore,
    currentLoadMore,
  } = useSearchTabs({
    results,
    loadingState,
    paginationState,
    hasSearched,
  });

  const loadMoreRef = useInfiniteScroll({
    hasMore: currentHasMore,
    loading: currentLoadingMore,
    onLoadMore: currentLoadMore,
  });

  const hasResults =
    results.movieItems.length > 0 || results.tvItems.length > 0 || results.people.length > 0;
  const showTabs = hasSearched && !loadingState.loading && hasResults;
  const tabConfig = SEARCH_TABS[activeTab];

  return (
    <div className="flex h-full flex-col">
      {showTabs && (
        <SearchModalTabs
          activeTab={activeTab}
          availableTabs={availableTabs}
          onTabChange={handleTabChange}
        />
      )}

      <SearchModalScrollContainer activeTab={activeTab}>
        {loadingState.loading ? (
          <SearchModalState type="loading" />
        ) : !hasSearched || !query.trim() ? (
          <SearchModalState type="empty" />
        ) : !hasResults ? (
          <SearchModalState type="noResults" query={query} />
        ) : (
          <>
            <SearchModalResultsSection
              title={tabConfig.title}
              items={currentItems}
              contentType={currentContentType}
              onClose={onClose}
            />
            <SearchModalInfiniteScrollTrigger
              hasMore={currentHasMore}
              loading={currentLoadingMore}
              loadMoreRef={loadMoreRef}
              activeTab={activeTab}
            />
          </>
        )}
      </SearchModalScrollContainer>
    </div>
  );
}

export default memo(SearchModalResults);
