import { combineReducers } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/authSlice';
import { reducer as layoutReducer } from './slices/layoutSlice';
import { reducer as paginationReducer } from './slices/paginationSlice';
import { reducer as rolePermissionsReducer } from './slices/rolePermissionSlice';
import { reducer as toastReducer } from './slices/toastSlice';
import { reducer as tokenReducer } from './slices/tokenSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  commonToast: toastReducer,
  token: tokenReducer,
  currentPage: paginationReducer,
  rolePermission: rolePermissionsReducer,
  layout: layoutReducer,
});

export default rootReducer;
