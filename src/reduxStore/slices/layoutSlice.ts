import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { SideBarType } from '../types';

const initialState: SideBarType = {
  isSidebarOpen: true,
  isSidebarActive: 'Dashboard',
};

const slice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    toggleSidebar(state: SideBarType) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    hideSidebar(state: SideBarType) {
      state.isSidebarOpen = false;
    },
    showSidebar(state: SideBarType) {
      state.isSidebarOpen = true;
    },
    activeSidebar(state: SideBarType, action: PayloadAction<SideBarType>) {
      state.isSidebarActive = action.payload.isSidebarActive;
    },
    clearActiveSidebar(state: SideBarType) {
      state.isSidebarActive = null;
    },
  
  },
});

export const { reducer } = slice;
export const SidebarSelector = (state: RootStateType) => state.layout.isSidebarOpen;
export const ActiveSidebarSelector = (state: RootStateType) =>
  state.layout.isSidebarActive;
export const {
  toggleSidebar,
  hideSidebar,
  showSidebar,
  activeSidebar,
  clearActiveSidebar,
} = slice.actions;

export default slice;
