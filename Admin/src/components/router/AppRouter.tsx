import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from 'react-router-dom';

import { withLoading } from '../../hocs/withLoading.hoc';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('@app/components/layouts/AuthLayout/AuthLoyout'));
import LoginPage from '@app/pages/LoginPage';
import LockPage from '@app/pages/LockPage';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from './RequireAuth';

// Admin Pages
import Dashboard from '@app/pages/admin/Dashboard/DasboardModule';
import AllMembers from '@app/pages/admin/Members/AllMembers/AllMembers';
import Request from '@app/pages/admin/Members/Request/Request';
import Analytics from '@app/pages/admin/Analytics/Analytics';
import Notificaiton from '@app/pages/admin/Notification/Notification';
import Settings from '@app/pages/admin/Settings/Settings';
import Formvalidation from '../common/forms/Formvalidation';
import MemberInfo from '@app/pages/admin/MemberInfo/MemberInformation';
import { useAppSelector } from '@app/hooks/reduxHooks';
import ResetPassword from '@app/pages/ResetPassword';
import ForgotPasswordPage from '@app/pages/ForgotPasswordPage';

// import pages with layload
const Logout = React.lazy(() => import('./Logout'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);
const Dasboard = withLoading(Dashboard);

//  error pages
const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

interface AppConfigProps {
  authToken: string;
}
export const AppRouter: React.FC<AppConfigProps> = ({ authToken }) => {
  const protectedLayout = (
    <RequireAuth authToken={authToken}>
      <MainLayout />
    </RequireAuth>
  );
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const CurrentuserInfo = useAppSelector((state) => state.auth.userInfo);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={authToken ? '/dashboard' : CurrentuserInfo ? '/dashboard' : '/auth/login'} />}
        />
        <Route element={protectedLayout}>
          <Route path="/dashboard" element={<Dasboard />} />
          <Route path="/members-list" element={<AllMembers />} />
          <Route path="/request" element={<Request />} />
          <Route path="/ananlytics" element={<Analytics />} />
          <Route path="/notification" element={<Notificaiton />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/member-Info" element={<MemberInfo />} />
          <Route path="/add-member" element={<Formvalidation />} />
        </Route>

        <Route path="/user" element={<AuthLayoutFallback />}>
          <Route path={`accept_invitation/${token}`} element={<ResetPassword />} />
        </Route>

        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="lock"
            element={
              <RequireAuth>
                <LockPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
