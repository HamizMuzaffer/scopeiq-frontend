import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  sidebarOpen: boolean;
  activeTab: string;
  notificationsCount: number;
}

const initialState: AppState = {
  sidebarOpen: false,
  activeTab: 'all',
  notificationsCount: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    incrementNotifications: (state) => {
      state.notificationsCount += 1;
    },
    clearNotifications: (state) => {
      state.notificationsCount = 0;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setActiveTab,
  incrementNotifications,
  clearNotifications,
} = appSlice.actions;

export default appSlice.reducer;
