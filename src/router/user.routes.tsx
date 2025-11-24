// user.routes.tsx
import React from "react";
import { RouteObjType } from "./routes";

const Dashboard = React.lazy(() => import("../modules/Dashboard/Home"));
const Calendar = React.lazy(() => import("../modules/Calendar"));
const UserProfile = React.lazy(() => import("../modules/UserProfiles"));
const FormElements = React.lazy(() => import("../modules/Forms/FormElements"));
const BasicTables = React.lazy(() => import("../modules/Tables/BasicTables"));
const BlankPage = React.lazy(() => import("../modules/Blank"));
const Error404 = React.lazy(() => import("../modules/Auth/pages/NotFound"));
const LineChart = React.lazy(() => import("../modules/Charts/LineChart"));
const BarChart = React.lazy(() => import("../modules/Charts/BarChart"));
const Alerts = React.lazy(() => import("../modules/UiElements/Alerts"));

const UserRoutes: RouteObjType[] = [
    { path: "/", element: <Dashboard /> },
    { path: "/calendar", element: <Calendar /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/form-elements", element: <FormElements /> },
    { path: "/basic-tables", element: <BasicTables /> },
    { path: "/blank", element: <BlankPage /> },
    { path: "/error-404", element: <Error404 /> },

    // OTHERS
    { path: "/line-chart", element: <LineChart /> },
    { path: "/bar-chart", element: <BarChart /> },
    { path: "/alerts", element: <Alerts /> },
];

export default UserRoutes;
