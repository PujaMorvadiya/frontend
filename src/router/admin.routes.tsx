import React, { Suspense } from 'react';
import { RouteObjType } from "./routes";
import { AdminNavigation, PRIVATE_NAVIGATION } from 'constant/navigation.constant';

// Lazy imports (replace with your actual pages)
const AdminDashboard = React.lazy(() => import("../modules/Dashboard/Home"));
const Calendar = React.lazy(() => import("../modules/Calendar"));
const UserProfile = React.lazy(() => import("../modules/UserProfiles"));
const FormElements = React.lazy(() => import("../modules/Forms/FormElements"));
const BasicTables = React.lazy(() => import("../modules/Tables/BasicTables"));
const Error404 = React.lazy(() => import("../modules/Auth/pages/NotFound"));
const LineChart = React.lazy(() => import("../modules/Charts/LineChart"));
const BarChart = React.lazy(() => import("../modules/Charts/BarChart"));
const ManageUsers = React.lazy(() => import("../modules/Management/pages/ManageUsers"));
const ManageOrganizations = React.lazy(() => import("../modules/Management/pages/ManageOrganizations"));
const EditOrganization =React.lazy(() => import("../modules/Management/pages/ManageOrganizations/editorg"));
const BlankPage = React.lazy(() => import("../modules/Blank"));
const Alerts = React.lazy(() => import("../modules/UiElements/Alerts"));

const AdminRoutes: RouteObjType[] = [
  {
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    ),
    ...AdminNavigation.dashboard.view,
  },
  {
    ...AdminNavigation.calendar.view,
    element: <Calendar />,
  },
  {
    ...PRIVATE_NAVIGATION.profile.view,
    element: <UserProfile />,
  },
  {
    path: "/form-elements",
    element: <FormElements />,
  },
  {
    path: "/basic-tables",
    element: <BasicTables />,
  },
  {
    path: "/blank",
    element: <BlankPage />,
  },
  {
    path: "/error-404",
    element: <Error404 />,
  },

  // ---- OTHERS MENU ----
  {
    path: "/line-chart",
    element: <LineChart />,
  },
  {
    path: "/bar-chart",
    element: <BarChart />,
  },
  {
    path: "/alerts",
    element: <Alerts />,
  },
  {
    element: <ManageUsers />,
    path: `/admin${PRIVATE_NAVIGATION.users.view.path}`,
    feature: PRIVATE_NAVIGATION.users.view.feature,
    permission: PRIVATE_NAVIGATION.users.view.permission,
  },
  {
    ...AdminNavigation.manageOrganizations.view,
    element: <ManageOrganizations />,
  },
  {
    element: <EditOrganization backURL="/organization" />,
    ...AdminNavigation.manageOrganizations.edit,
  },

];

export default AdminRoutes;
