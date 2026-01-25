import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setActiveTab } from '@/store/uiSlice';
import type { TabContent } from '@/types/component';
import type { TabType } from '@/types/media';

interface Params {
  activeTab: TabType;
  moviesTab: TabContent;
  tvTab: TabContent;
}

export function useTabFallback({ activeTab, moviesTab, tvTab }: Params) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const moviesReady = !moviesTab.initialLoading;
    const tvReady = !tvTab.initialLoading;
    if (!moviesReady || !tvReady) return;

    const moviesEmpty = moviesTab.items.length === 0;
    const tvEmpty = tvTab.items.length === 0;

    if (activeTab === 'movies' && moviesEmpty && !tvEmpty) {
      dispatch(setActiveTab('tv'));
    }

    if (activeTab === 'tv' && tvEmpty && !moviesEmpty) {
      dispatch(setActiveTab('movies'));
    }
  }, [activeTab, moviesTab, tvTab, dispatch]);
}
