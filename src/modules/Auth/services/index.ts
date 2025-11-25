/* eslint-disable react-hooks/rules-of-hooks */
import { FeatureEnum, LayoutConstant, Roles } from 'constant/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { isURLSame } from 'modules/utils';
import { useDispatch } from 'react-redux';
import {
  setAuthenticated,
  setCredentials,
  setUserData,
  setUserOrganization,
} from 'reduxStore/slices/authSlice';
import { setActiveLayoutType } from 'reduxStore/slices/layoutSlice';
import {
  setAccess,
  setPermission,
  setRolePermission,
  setRoles,
} from 'reduxStore/slices/rolePermissionSlice';
import AdminUserRoutes from '../../../router/adminUser.routes';

// Get Active User Data Api
export const getActiveUserDataApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const dispatch = useDispatch();

  const getActiveUser = async () => {
    const resp = await callApi('/get-logged-in-user');
    if (resp?.data) {
      const userData = resp.data.user;
      const roleAndPermissions = resp.data.roleAndPermission;
      const roles = resp.data.role;
      const permissions = resp.data.permission;

      if (userData) dispatch(setCredentials({ user: userData }));
      if (roles) dispatch(setRoles(roles));
      if (permissions) dispatch(setPermission(permissions));

      if (roleAndPermissions) {
        dispatch(setRolePermission(roleAndPermissions));
        const checkPermission = roleAndPermissions
          ?.filter(
            (data: { feature_name: string }) =>
              data.feature_name === FeatureEnum.User
          )
          ?.map((data1: { permission_name: string }) => data1.permission_name)
          ?.join(',');
        if (checkPermission) {
          dispatch(setAccess(checkPermission));
        }
      }

      dispatch(setAuthenticated({ isAuthenticated: true }));
      dispatch(
        setUserData({
          user: {
            ...userData,
            last_sign_id: userData?.last_logged_in ?? '',
          },
        })
      );
      dispatch(setUserOrganization(userData?.organization ?? []));

      const isAdminStudentLayout = AdminUserRoutes.find((data) =>
        isURLSame(data.path, window.location.pathname)
      );

      let activeLayout = LayoutConstant.User as string;
      const userRole = userData?.role?.role;

      if (userRole) {
        if (userRole === Roles.Admin) {
          activeLayout = isAdminStudentLayout ? LayoutConstant.ADMIN_USER : LayoutConstant.Admin;
        } else if (userRole === Roles.Organization) {
          activeLayout = LayoutConstant.Organization;
        } else if (userRole === Roles.User) {
          activeLayout = LayoutConstant.User;
        }
      }

      dispatch(setActiveLayoutType(activeLayout));
    }
    return resp;
  };

  return { getActiveUser, isError, isLoading, isSuccess };
};
