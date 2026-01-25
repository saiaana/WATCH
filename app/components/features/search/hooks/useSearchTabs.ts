import { useMemo, useState, useEffect, useCallback } from 'react';
import type {
  SearchTabType,
  SearchResultsData,
  SearchLoadingState,
  SearchPaginationState,
  SearchPerson,
} from '../types';
import type { CardItem } from '@/features/cards/mapToCardItem';

interface UseSearchTabsParams {
  results: SearchResultsData;
  loadingState: SearchLoadingState;
  paginationState: SearchPaginationState;
  hasSearched: boolean;
}

interface UseSearchTabsReturn {
  activeTab: SearchTabType;
  setActiveTab: (tab: SearchTabType) => void;
  handleTabChange: (tab: SearchTabType) => void;
  availableTabs: SearchTabType[];
  currentItems: CardItem[] | SearchPerson[];
  currentContentType: 'movie' | 'tv' | 'person';
  currentLoadingMore: boolean;
  currentHasMore: boolean;
  currentLoadMore: () => void;
}

export function useSearchTabs({
  results,
  loadingState,
  paginationState,
  hasSearched,
}: UseSearchTabsParams): UseSearchTabsReturn {
  const [activeTab, setActiveTab] = useState<SearchTabType>('movies');

  const availableTabs = useMemo<SearchTabType[]>(() => {
    const tabs: SearchTabType[] = [];
    if (results.movieItems.length > 0) tabs.push('movies');
    if (results.tvItems.length > 0) tabs.push('tv');
    if (results.people.length > 0) tabs.push('actors');
    return tabs.length > 0 ? tabs : (['movies', 'tv', 'actors'] as SearchTabType[]);
  }, [results.movieItems.length, results.tvItems.length, results.people.length]);

  useEffect(() => {
    if (hasSearched && !loadingState.loading && availableTabs.length > 0) {
      if (activeTab === 'movies' && results.movieItems.length === 0) {
        setActiveTab(availableTabs[0]);
      } else if (activeTab === 'tv' && results.tvItems.length === 0) {
        setActiveTab(availableTabs[0]);
      } else if (activeTab === 'actors' && results.people.length === 0) {
        setActiveTab(availableTabs[0]);
      }
    }
  }, [
    activeTab,
    results.movieItems.length,
    results.tvItems.length,
    results.people.length,
    availableTabs,
    hasSearched,
    loadingState.loading,
  ]);

  const currentLoadingMore = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return loadingState.loadingMoreMovies;
      case 'tv':
        return loadingState.loadingMoreTv;
      case 'actors':
        return loadingState.loadingMoreActors;
      default:
        return false;
    }
  }, [
    activeTab,
    loadingState.loadingMoreMovies,
    loadingState.loadingMoreTv,
    loadingState.loadingMoreActors,
  ]);

  const currentHasMore = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return paginationState.hasMoreMovies;
      case 'tv':
        return paginationState.hasMoreTv;
      case 'actors':
        return paginationState.hasMoreActors;
      default:
        return false;
    }
  }, [
    activeTab,
    paginationState.hasMoreMovies,
    paginationState.hasMoreTv,
    paginationState.hasMoreActors,
  ]);

  const currentLoadMore = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return paginationState.loadMoreMovies;
      case 'tv':
        return paginationState.loadMoreTv;
      case 'actors':
        return paginationState.loadMoreActors;
      default:
        return () => {};
    }
  }, [
    activeTab,
    paginationState.loadMoreMovies,
    paginationState.loadMoreTv,
    paginationState.loadMoreActors,
  ]);

  const currentItems = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return results.movieItems;
      case 'tv':
        return results.tvItems;
      case 'actors':
        return results.people;
      default:
        return [];
    }
  }, [activeTab, results.movieItems, results.tvItems, results.people]);

  const currentContentType = useMemo(() => {
    switch (activeTab) {
      case 'movies':
        return 'movie' as const;
      case 'tv':
        return 'tv' as const;
      case 'actors':
        return 'person' as const;
    }
  }, [activeTab]);

  const handleTabChange = useCallback((tab: SearchTabType) => {
    setActiveTab(tab);
  }, []);

  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    availableTabs,
    currentItems,
    currentContentType,
    currentLoadingMore,
    currentHasMore,
    currentLoadMore,
  };
}
