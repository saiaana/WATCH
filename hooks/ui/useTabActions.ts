import { useAppDispatch } from '@/store';
import { setActiveTab } from '@/store/uiSlice';
import type { TabType } from '@/types/media';

const STORAGE_ACTIVE_TAB = 'activeTab';
const STORAGE_MANUAL_FLAG = 'hasManualTabSelection';
const STORAGE_VIEW_ALL_FLAG = 'hasViewAllTabSelection';

export function useTabActions() {
  const dispatch = useAppDispatch();

  const changeTab = (tab: TabType) => {
    dispatch(setActiveTab(tab));

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_MANUAL_FLAG, 'true');
      localStorage.setItem(STORAGE_ACTIVE_TAB, tab);
      localStorage.removeItem(STORAGE_VIEW_ALL_FLAG);
    }
  };

  return { changeTab };
}
