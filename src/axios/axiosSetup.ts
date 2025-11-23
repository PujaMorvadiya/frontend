import { Store } from '@reduxjs/toolkit';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { VITE_API_URL } from '../config';
import { ToastVariant } from '../constant/common.constant';
import { setLogoutData } from '../reduxStore/slices/authSlice';
import { clearActiveSidebar } from '../reduxStore/slices/layoutSlice';
import { setToast } from '../reduxStore/slices/toastSlice';
import { setToken } from '../reduxStore/slices/tokenSlice';

export const Axios = axios.create({ baseURL: `${VITE_API_URL}` });

export const setupAxios = (store: Store) => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  Axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const authToken = store.getState().token?.token || null;

    request.headers = request.headers ?? {};
    request.headers['accept-timezone'] = timeZone;

    if (authToken) {
      const bearerToken = `Bearer ${authToken}`;
      request.headers.Authorization = bearerToken;
      request.headers.authorization = bearerToken;
    } else {
      delete request.headers.Authorization;
      delete request.headers.authorization;
    }

    request.withCredentials = true;
    return request;
  });
  Axios.interceptors.response.use(
    (res: AxiosResponse) => {
      const { toast } = res.data;
      if (toast) {
        const toastId = new Date().getTime();
        store.dispatch(
          setToast({
            variant: ToastVariant.SUCCESS,
            message: res.data.message,
            type: res.data.response_type,
            id: toastId,
          })
        );
      }
      return res.data;
    },
    async (e) => {
      if (e.response && e.response.status === 401) {
        store.dispatch(setToken({ token: null }));
        store.dispatch(setLogoutData());
        store.dispatch(clearActiveSidebar());
        localStorage.removeItem('persist:root');
        window.location.href = '/auth/login';
        return;
      }
      if (
        e.response &&
        (e.response.status === 400 ||
          e.response.status === 500 ||
          e.response.status === 401 ||
          e.response.status === 422 ||
          e.response.status === 403 ||
          e.response.status === 404)
      ) {
        const { toast } = e.response.data;
        if (toast) {
          const toastId = new Date().getTime();
          store.dispatch(
            setToast({
              message: e.response.data.message ?? e.response?.data?.data?.message,
              variant: 'Warning',
              type: e.response.data.response_type,
              id: toastId,
            })
          );
        }
      }
      if (e.response && e.response.status === 403) {
        window.location.href = '/';
      }
      throw e.response?.data || e;
    }
  );
};

export default axios;
