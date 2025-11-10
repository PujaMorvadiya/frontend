import React, { JSX, Suspense, useEffect } from 'react';
import { ErrorBoundary as ErrorBoundaryDependency } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { ActiveSidebarSelector } from '../reduxStore/slices/layoutSlice';
import { currentPageCount } from '../reduxStore/slices/paginationSlice';
import { RootStateType } from '../reduxStore/store';
import Loaders from '../components/Loaders';
import { PUBLIC_NAVIGATION } from '../constant/navigation.constant';
import { getAuthToken } from '../reduxStore/slices/tokenSlice';
import { getActiveUserDataApi } from '../pages/Auth/services';
import ErrorBoundary from '../pages/Auth/pages/ErrorBoundary';
import { useRolePermission } from '../pages/utils';

// Lazy imports
const RequiresUnAuth = React.lazy(() => import('../pages/Auth/components/RequiresUnAuth'));
const NotFound = React.lazy(() => import('../pages/Auth/pages/NotFound'));
const Login = React.lazy(() => import('../pages/Auth/pages/Login'));
const Register = React.lazy(() => import('../pages/Auth/pages/Register'));
const ForgotPassword = React.lazy(() => import('../pages/Auth/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../pages/Auth/pages/ResetPassword'));

export type RouteObjType = {
  path?: string;
  element: JSX.Element;
  children?: RouteObjType[] | RouteObject[];
  errorElement?: JSX.Element;
  feature?: string;
  permission?: string;
};

// Helper to wrap with Suspense + ErrorBoundary
const applySuspense = (routes: RouteObjType[]): RouteObjType[] =>
  routes.map((route) => ({
    ...route,
    element: (
      <ErrorBoundaryDependency FallbackComponent={ErrorBoundary}>
        <Suspense fallback={<Loaders type="SiteLoader" />}>{route.element}</Suspense>
      </ErrorBoundaryDependency>
    ),
  }));

// Public (unauthenticated) routes
const AuthenticationRoutes: RouteObjType[] = [
  { path: PUBLIC_NAVIGATION.login, element: <Login /> },
  { path: PUBLIC_NAVIGATION.register, element: <Register /> },
  { path: PUBLIC_NAVIGATION.forgotPassword, element: <ForgotPassword /> },
  { path: PUBLIC_NAVIGATION.resetPassword, element: <ResetPassword /> },
];

// Define main component
const Routes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(getAuthToken);
  const { isAuthenticated } = useSelector((state: RootStateType) => state.auth);
  const { getActiveUser, isLoading: isActiveUserLoading } = getActiveUserDataApi();
  const activeSideBar = useSelector(ActiveSidebarSelector);

  useEffect(() => {
    dispatch(currentPageCount({ currentPage: 1 }));
  }, [activeSideBar, dispatch]);

  useEffect(() => {
    if (!window.location.href.includes(PUBLIC_NAVIGATION.somethingWentWrong)) {
      if (token && !isAuthenticated) {
        getActiveUser();
      }
    }
  }, [token, isAuthenticated, getActiveUser]);

  // Only unauthenticated routes for now
  const unauthenticatedRoutes: RouteObjType[] = applySuspense([
    {
      element: <RequiresUnAuth />,
      children: AuthenticationRoutes,
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loaders type="SiteLoader" />}>
          {isActiveUserLoading ? <Loaders type="SiteLoader" /> : <NotFound />}
        </Suspense>
      ),
    },
  ]);

  // Role-based permission filtering
  const finalRoutes: RouteObjType[] = unauthenticatedRoutes.filter((route) => {
    if (route.feature && route.permission) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useRolePermission(route.feature, route.permission);
    }
    return true;
  });

  const router = createBrowserRouter(finalRoutes);
  return <RouterProvider router={router} />;
};

export default Routes;
