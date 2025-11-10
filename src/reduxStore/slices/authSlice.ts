import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSliceType, OrganizationType } from '../types';
import { RootStateType } from '../store';

const initialState: AuthSliceType = {
  user: null,
  isAuthenticated: false,
  organization: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    setUserData(state, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = {
          ...user,
        };
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    updateUserData(state, action: PayloadAction<Partial<AuthSliceType['user']>>) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      } else {
        state.user = { ...action.payload };
        state.isAuthenticated = true;
      }
    },
    setUserProfile(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) state.user.profile_image = action.payload;
    },
    setUserDateFormat(state: AuthSliceType, action: PayloadAction<string>) {
      if (state.user) {
        state.user.date_format = action.payload;
      }
    },
    setUserOrganization(
      state: AuthSliceType,
      action: PayloadAction<OrganizationType>
    ) {
      state.organization = action.payload;
    },
    setCredentials(state: AuthSliceType, action: PayloadAction<AuthSliceType>) {
      const { user } = action.payload;
      if (user) {
        state.user = action.payload.user;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
    setLogoutData(state: AuthSliceType) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { reducer } = slice;

export const {
  setCredentials,
  setLogoutData,
  setAuthenticated,
  setUserData,
  setUserProfile,
  setUserDateFormat,
  setUserOrganization,
  updateUserData,
} = slice.actions;

export const getAuth = (state: RootStateType) => state.auth;

export const getIsAuthenticated = (state: RootStateType) =>
  state.auth.isAuthenticated;

export const getCurrentUser = (state: RootStateType) => state.auth.user;

export const getOrganization = (state: RootStateType) => state.auth.organization;

export const getCurrentUserDateFormat = (state: RootStateType) =>
  state.auth.user?.date_format;

export const getCurrentUserProfileImage = (state: RootStateType) =>
  state.auth.user?.profile_image;

export default slice;
