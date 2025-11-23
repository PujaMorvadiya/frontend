import React from 'react';
import { PUBLIC_NAVIGATION } from '../constant/navigation.constant';
import { RouteObjType } from './routes';

// Lazy imports
const Login = React.lazy(() => import('../modules/Auth/pages/Login'));
const Register = React.lazy(() => import('../modules/Auth/pages/Register'));
const ForgotPassword = React.lazy(() => import('../modules/Auth/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('../modules/Auth/pages/ResetPassword'));

const AuthRoutes: RouteObjType[] = [
  {
    path: PUBLIC_NAVIGATION.login,
    element: React.createElement(Login),
  },
  {
    path: PUBLIC_NAVIGATION.register,
    element: React.createElement(Register),
  },
  {
    path: PUBLIC_NAVIGATION.forgotPassword,
    element: React.createElement(ForgotPassword),
  },
  {
    path: PUBLIC_NAVIGATION.resetPassword,
    element: React.createElement(ResetPassword),
  },
];

export default AuthRoutes;

