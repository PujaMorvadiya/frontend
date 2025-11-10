/* eslint-disable react-hooks/rules-of-hooks */
import { FeatureEnum } from 'constant/common.constant';
import { useAxiosGet } from 'hooks/useAxios';
import { useDispatch } from 'react-redux';
import {
  setAuthenticated,
  setCredentials,
  setUserData,
  setUserOrganization,
} from 'reduxStore/slices/authSlice';
import {
  setAccess,
  setPermission,
  setRolePermission,
  setRoles,
} from 'reduxStore/slices/rolePermissionSlice';

// Get Active User Data Api
export const getActiveUserDataApi = () => {
  const [callApi, { isLoading, isError, isSuccess }] = useAxiosGet();
  const dispatch = useDispatch();

  const getActiveUser = async () => {
    const resp = await callApi('/get-logged-in-user');
    if (resp?.data) {
      if (resp.data) dispatch(setCredentials({ user: resp.data }));
      if (resp.data?.roles) dispatch(setRoles(resp.data.roles));
      if (resp.data?.permissions) dispatch(setPermission(resp.data.permissions));

      if (resp?.data?.roleAndPermissions) {
        dispatch(setRolePermission(resp.data.roleAndPermissions));
        const checkPermission = resp.data.roleAndPermissions
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
            ...resp.data,
            last_sign_id: resp?.data?.last_logged_in ?? '',
          },
        })
      );
      dispatch(setUserOrganization(resp?.data?.organization ?? []));
    }
    return resp;
  };

  return { getActiveUser, isError, isLoading, isSuccess };
};
