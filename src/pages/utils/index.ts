import { Store } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { PUBLIC_NAVIGATION } from '../../constant/navigation.constant';
import { setLogoutData, setUserData } from '../../reduxStore/slices/authSlice';
import { clearToken } from '../../reduxStore/slices/tokenSlice';
import { useSelector } from 'react-redux';
import { getRolesPermission } from 'reduxStore/slices/rolePermissionSlice';

export const useRolePermission = (featureName: string, permissionName: string) => {
  const RolePermissions = useSelector(getRolesPermission);
  const checkPermission = RolePermissions.findIndex(
    (data) =>
      data.feature_name === featureName && data.permission_name === permissionName
  );
  return checkPermission > -1;
};


export const logout = async (store: Store) => {
  try {
    store.dispatch(setUserData({ user: null }));
    store.dispatch(setLogoutData());
    store.dispatch(clearToken());
    localStorage.clear();
    window.location.href = '/';
    setTimeout(() => {
      window.location.href = PUBLIC_NAVIGATION.login;
    }, 0);
    setTimeout(() => {
      Cookies.remove('navigate_after_login_url');
    }, 2000);
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error)
    localStorage.clear();
  }
};

export const isURLSame = (path1: string, path2: string) => {
  if (path1 === path2) {
    return true;
  }
  const path1Arr = path1.split('/').filter((data) => data.length);
  const path2Arr = path2.split('/').filter((data) => data.length);
  if (path1Arr.length !== path2Arr.length) return false;

  for (let index = 0; index <= path1Arr.length; index++) {
    if (
      path1[index] !== path2[index] &&
      !(path1.startsWith(':') || path2.startsWith(':'))
    ) {
      return false;
    }
  }
  return true;
};

export const customRandomNumberGenerator = (max?: number | null) => {
  if (max) {
    return Math.floor(Math.random() * max) + 1;
  }
  return Math.floor(Math.random() * 10000000) + 1;
};

// Function to get the difference between current date and provided date
export function getDateDifference(date: Date) {
  const providedDate = new Date(date);
  const now = new Date();
  const yearDiff = now.getFullYear() - providedDate.getFullYear();
  const monthDiff = now.getMonth() - providedDate.getMonth();
  const dayDiff = now.getDate() - providedDate.getDate();

  return { yearDiff, monthDiff, dayDiff };
}
