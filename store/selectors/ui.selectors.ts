import type { RootState } from '@/store';

export const selectActiveTab = (state: RootState) => state.ui.activeTab;
