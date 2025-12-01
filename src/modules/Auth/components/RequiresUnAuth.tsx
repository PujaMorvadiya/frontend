import React, { Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getActiveUserDataApi } from '../services';
import AuthLayout from './AuthLayout';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
import { PUBLIC_NAVIGATION } from 'constant/navigation.constant';
import { getAuth } from 'reduxStore/slices/authSlice';
import { getAuthToken } from 'reduxStore/slices/tokenSlice';
import PageLoader from 'components/Loaders/PageLoader';
import ErrorBoundary from '../pages/ErrorBoundary';
const Toast = React.lazy(() => import('components/Toast'));


const RequiresUnAuth = () => {
  const { isAuthenticated } = useSelector(getAuth);
  const { token } = useSelector(getAuthToken);
  const pathKeys = Object.keys(PUBLIC_NAVIGATION);
  const { getActiveUser } = getActiveUserDataApi();
  const lastTokenRef = useRef<string | null>(null);
  const isCallingRef = useRef(false);

  useEffect(() => {
    const shouldFetch = 
      token &&
      !isAuthenticated &&
      !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong) &&
      lastTokenRef.current !== token &&
      !isCallingRef.current;

    if (shouldFetch) {
      isCallingRef.current = true;
      lastTokenRef.current = token;
      
      getActiveUser().finally(() => {
        isCallingRef.current = false;
      });
    }
  }, [token, isAuthenticated, getActiveUser]);

  if (
    token &&
    isAuthenticated &&
    pathKeys.findIndex(
      (dat: string) => PUBLIC_NAVIGATION[dat] === window.location.pathname
    ) !== -1
  ) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
      <AuthLayout
        isSomethingWentWrong={
          !window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)
        }
      >
        <Suspense fallback={<PageLoader />}>
          <Toast />
          {/* <SocketComponent /> */}
          <Outlet />
        </Suspense>
      </AuthLayout>
    </ErrorBoundaryDependency>
  );
};

export default RequiresUnAuth;
