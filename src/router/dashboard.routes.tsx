import React from 'react';
import { PRIVATE_NAVIGATION } from '../constant/navigation.constant';
import { RouteObjType } from './routes';

// Lazy imports
const Home = React.lazy(() => import('../modules/Dashboard/Home'));
const ManageUsers = React.lazy(() => import('../modules/Management/pages/ManageUsers'));

const DashboardRoutes: RouteObjType[] = [
  {
    path: PRIVATE_NAVIGATION.dashboard.view.path,
    element: React.createElement(Home),
    feature: PRIVATE_NAVIGATION.dashboard.view.feature,
    permission: PRIVATE_NAVIGATION.dashboard.view.permission,
  },
  {
    path: PRIVATE_NAVIGATION.users.view.path,
    element: React.createElement(ManageUsers),
    feature: PRIVATE_NAVIGATION.users.view.feature,
    permission: PRIVATE_NAVIGATION.users.view.permission,
  },
];

export default DashboardRoutes;

