import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationType } from '../types';
import { RootStateType } from '../store';

const initialState = {
  currentPage: 1,
};

export const slice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    currentPageCount: (
      state: PaginationType,
      action: PayloadAction<PaginationType>
    ) => {
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { reducer } = slice;

export const currentPageSelector = (state: RootStateType) => {
  return state.currentPage;
};

export const { currentPageCount } = slice.actions;

export default slice;
