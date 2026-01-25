import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setActiveTab } from '@/store/uiSlice';
import type { TabType } from '@/types/media';
import { getLastContentPage } from './useContentNavigation';
import { getViewAllTab, hasViewAllTabSelection } from './useViewAllTabSelection';

const STORAGE_ACTIVE_TAB = 'activeTab';
const STORAGE_MANUAL_FLAG = 'hasManualTabSelection';

export function useInitialTabSelection() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasManual = localStorage.getItem(STORAGE_MANUAL_FLAG) === 'true';
    if (hasManual) {
      const stored = localStorage.getItem(STORAGE_ACTIVE_TAB) as TabType | null;
      if (stored) {
        dispatch(setActiveTab(stored));
        return;
      }
    }

    if (hasViewAllTabSelection()) {
      const viewAllTab = getViewAllTab();
      if (viewAllTab) {
        dispatch(setActiveTab(viewAllTab));
        return;
      }
    }

    const last = getLastContentPage();
    if (last === 'movie') {
      dispatch(setActiveTab('movies'));
    } else if (last === 'tv') {
      dispatch(setActiveTab('tv'));
    }
  }, [dispatch]);
}
