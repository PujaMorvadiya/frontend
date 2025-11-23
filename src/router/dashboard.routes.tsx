import React from 'react';
import { PRIVATE_NAVIGATION } from '../constant/navigation.constant';
import { RouteObjType } from './routes';

// Lazy import
const Home = React.lazy(() => import('../modules/Dashboard/Home'));

const DashboardRoutes: RouteObjType[] = [
  {
    path: PRIVATE_NAVIGATION.dashboard.view.path,
    element: React.createElement(Home),
    feature: PRIVATE_NAVIGATION.dashboard.view.feature,
    permission: PRIVATE_NAVIGATION.dashboard.view.permission,
  },
];

export default DashboardRoutes;

