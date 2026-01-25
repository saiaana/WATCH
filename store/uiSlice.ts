import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TabType } from '@/types/media';

interface UIState {
  activeTab: TabType;
}

const initialState: UIState = { activeTab: 'movies' };

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('activeTab', action.payload);
      }
    },
  },
});

export const { setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
