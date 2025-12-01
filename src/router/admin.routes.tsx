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
const ManageUsers = React.lazy(() => import("../modules/ManageUsers"));
const ManageOrganizations = React.lazy(() => import("../modules/ManageUsers"));
const EditOrganization = React.lazy(() => import("../modules/ManageOrganizations/editorg"));
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
    ...AdminNavigation.manageUsers.list,
  },
  {
    element: <ManageOrganizations />,
    ...AdminNavigation.manageOrganizations.list,
  },
  {
    element: <EditOrganization backURL="/admin/organizations" />,
    ...AdminNavigation.manageOrganizations.edit,
  },
  {
    ...AdminNavigation.reports.bookings,
    element: <BasicTables />,
  },
  {
    ...AdminNavigation.reports.users,
    element: <BasicTables />,
  },
  {
    ...AdminNavigation.manageMovies.list,
    element: <BasicTables />,
  },
  {
    ...AdminNavigation.settings.view,
    element: <BlankPage />,
  },

];

export default AdminRoutes;
