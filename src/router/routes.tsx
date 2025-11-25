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
import ErrorBoundary from '../modules/Auth/pages/ErrorBoundary';
import { useRolePermission } from '../modules/utils';

import AuthRoutes from './auth.routes';
import DashboardRoutes from './dashboard.routes';
import AdminRoutes from './admin.routes';
import UserRoutes from './user.routes';
import OrganizationRoutes from './organization.routes';

// Lazy imports
const RequiresUnAuth = React.lazy(() => import('../modules/Auth/components/RequiresUnAuth'));
const RequiresAuth = React.lazy(() => import('../modules/Auth/components/RequiresAuth'));
const NotFound = React.lazy(() => import('../modules/Auth/pages/NotFound'));
const AppLayout = React.lazy(() => import('../layout/AppLayout'));

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

// Define main component
const Routes = () => {
  const dispatch = useDispatch();
  const activeSideBar = useSelector(ActiveSidebarSelector);

  useEffect(() => {
    dispatch(currentPageCount({ currentPage: 1 }));
  }, [activeSideBar, dispatch]);

  const ProtectedRoutes: RouteObjType[] = [
    ...DashboardRoutes,
    ...AdminRoutes,
    ...UserRoutes,
    ...OrganizationRoutes,
  ];

  const allRoutes: RouteObjType[] = [
    {
      element: <RequiresUnAuth />,
      children: AuthRoutes,
    },
    {
      element: (
        <RequiresAuth>
          <AppLayout />
        </RequiresAuth>
      ),
      children: applySuspense(ProtectedRoutes),
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loaders type="SiteLoader" />}>
          <NotFound />
        </Suspense>
      ),
    },
  ];

  const finalRoutes: RouteObjType[] = allRoutes.filter((route) => {
    if (route.feature && route.permission) {
      return useRolePermission(route.feature, route.permission);
    }
    return true;
  });

  const router = createBrowserRouter(finalRoutes);
  return <RouterProvider router={router} />;
};

export default Routes;
