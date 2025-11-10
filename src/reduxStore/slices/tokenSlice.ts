import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { TokenSliceType } from '../types';

const initialState: TokenSliceType = {
  token: null,
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state: TokenSliceType, action: PayloadAction<TokenSliceType>) {
      state.token = action.payload.token;
    },
    clearToken(state: TokenSliceType) {
      state.token = null;
    },
  },
});

export const { reducer } = tokenSlice;

export const { setToken, clearToken } = tokenSlice.actions;

export const getAuthToken = (state: RootStateType) => state.token;

export default tokenSlice;
