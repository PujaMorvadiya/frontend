import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { SideBarType } from '../types';
import { LayoutConstant } from 'constant/common.constant';

const initialState: SideBarType = {
  isSidebarOpen: true,
  isSidebarActive: 'Dashboard',
  isHeaderActive: 'Home',
  activeLayoutType: LayoutConstant.User,
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
    setActiveLayoutType(state: SideBarType, action: PayloadAction<string>) {
      state.activeLayoutType = action.payload;
    },
  },
});

export const { reducer } = slice;
export const SidebarSelector = (state: RootStateType) => state.layout.isSidebarOpen;
export const ActiveSidebarSelector = (state: RootStateType) =>
  state.layout.isSidebarActive;
export const activeLayoutType = (state: RootStateType) =>
  state.layout.activeLayoutType;
export const {
  toggleSidebar,
  hideSidebar,
  showSidebar,
  activeSidebar,
  clearActiveSidebar,
  setActiveLayoutType
} = slice.actions;

export default slice;
