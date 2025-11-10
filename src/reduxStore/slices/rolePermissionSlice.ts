import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { RoleSliceType, RoleType, PermissionType, RolePermissionType } from '../types';


const initialState: RoleSliceType = {
  roles: [],
  rolePermissions: [],
  permission: [],
  access: [''],
};

const rolePermissionSlice = createSlice({
  name: 'rolePermission',
  initialState,
  reducers: {
    setRoles(state: RoleSliceType, action: PayloadAction<RoleType[]>) {
      state.roles = action.payload;
    },
    setPermission(state: RoleSliceType, action: PayloadAction<PermissionType[]>) {
      state.permission = action.payload;
    },
    setRolePermission(
      state: RoleSliceType,
      action: PayloadAction<RolePermissionType[]>
    ) {
      state.rolePermissions = action.payload;
    },
    setAccess(
      state: RoleSliceType,
      action: PayloadAction<RolePermissionType['access']>
    ) {
      state.access = action.payload;
    },
  },
});

export const { reducer } = rolePermissionSlice;

export const { setRoles, setPermission, setRolePermission, setAccess } =
  rolePermissionSlice.actions;
export const getRoles = (state: RootStateType) => state.rolePermission.roles;
export const getPermission = (state: RootStateType) =>
  state.rolePermission.permission;
export const getRolesPermission = (state: RootStateType) =>
  state.rolePermission.rolePermissions;
export const getAccess = (state: RootStateType) => state.rolePermission.access;

export default rolePermissionSlice;
