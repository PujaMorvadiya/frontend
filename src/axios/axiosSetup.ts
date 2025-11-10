import { Store } from '@reduxjs/toolkit';
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from '../config';
import { ToastVariant } from '../constant/common.constant';
import { setLogoutData } from '../reduxStore/slices/authSlice';
import { clearActiveSidebar } from '../reduxStore/slices/layoutSlice';
import { setToast } from '../reduxStore/slices/toastSlice';
import { setToken } from '../reduxStore/slices/tokenSlice';

export const Axios = axios.create({ baseURL: `${REACT_APP_API_URL}` });

export const setupAxios = (store: Store) => {
  // Logic to set token in header
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  Axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const authToken = store.getState().token?.token || null;

    // Ensure headers exist
    request.headers = request.headers ?? {};
    request.headers['accept-timezone'] = timeZone;

    if (request.headers !== undefined && authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    request.withCredentials = true;
    return request;
  });
  // Logic to show toast message on API response
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
      // Logic to call refresh token on Unauthorized error from Backend
      if (e.response && e.response.status === 401) {
        store.dispatch(setToken({ token: null }));
        store.dispatch(setLogoutData());
        store.dispatch(clearActiveSidebar());
        localStorage.removeItem('persist:root');
        window.location.href = '/auth/login';
      }
      if (
        e.response.status === 400 ||
        e.response.status === 500 ||
        e.response.status === 401 ||
        e.response.status === 422 ||
        e.response.status === 403 ||
        e.response.status === 404
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
      if (e.response.status === 403) {
        window.location.href = '/';
      }
      throw e.response.data;
    }
  );
};

export default axios;
