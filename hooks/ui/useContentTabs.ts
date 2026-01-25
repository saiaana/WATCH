import { useAppSelector } from '@/store';
import { selectActiveTab } from '@/store/selectors';
import type { TabContent } from '@/types/component';
import type { TabType } from '@/types/media';

import { useInitialTabSelection } from './useInitialTabSelection';
import { useTabFallback } from './useTabFallback';
import { useTabActions } from './useTabActions';

const AVAILABLE_TABS: TabType[] = ['movies', 'tv'];

interface Params {
  moviesTab: TabContent;
  tvTab: TabContent;
}

export function useContentTabs({ moviesTab, tvTab }: Params) {
  const activeTab = useAppSelector(selectActiveTab);

  useInitialTabSelection();
  useTabFallback({ activeTab, moviesTab, tvTab });

  const { changeTab } = useTabActions();

  const displayTab: TabType = AVAILABLE_TABS.includes(activeTab) ? activeTab : 'movies';

  const currentTab = displayTab === 'movies' ? moviesTab : tvTab;

  return {
    availableTabs: AVAILABLE_TABS,
    displayTab,
    currentTab,
    handleTabChange: changeTab,
  };
}
