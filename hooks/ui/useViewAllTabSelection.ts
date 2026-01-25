import { useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { setActiveTab } from '@/store/uiSlice';
import type { BasePath } from '@/types/media';
import type { TabType } from '@/types/media';

const STORAGE_VIEW_ALL_TAB = 'viewAllTab';
const STORAGE_VIEW_ALL_FLAG = 'hasViewAllTabSelection';

export function useViewAllTabSelection() {
  const dispatch = useAppDispatch();

  const setTabFromViewAll = useCallback(
    (basePath: BasePath) => {
      const tab: TabType = basePath === '/movies' ? 'movies' : 'tv';

      dispatch(setActiveTab(tab));

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_VIEW_ALL_FLAG, 'true');
        localStorage.setItem(STORAGE_VIEW_ALL_TAB, tab);
      }
    },
    [dispatch],
  );

  return { setTabFromViewAll };
}

export function getViewAllTab(): TabType | null {
  if (typeof window === 'undefined') return null;
  const hasViewAll = localStorage.getItem(STORAGE_VIEW_ALL_FLAG) === 'true';
  if (!hasViewAll) return null;
  const tab = localStorage.getItem(STORAGE_VIEW_ALL_TAB) as TabType | null;
  return tab === 'movies' || tab === 'tv' ? tab : null;
}

export function hasViewAllTabSelection(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_VIEW_ALL_FLAG) === 'true';
}
