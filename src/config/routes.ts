import { FunctionComponent, lazy } from 'react';
const LoginPage = lazy(() => import('../pages/Login/login.tsx'));
const HomePage = lazy(() => import('../pages/Home/home.tsx'));
const RegisterPage = lazy(() => import('../pages/Register/register.tsx'));
const ProfilePage = lazy(() => import('../pages/Profile/profile.tsx'));
const ReadLaterPage = lazy(() => import('../pages/ReadLater/read-later.tsx'));

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  REGISTER: '/register',
  PROFILE: '/profile',
  READ_LATER: '/read-later',
};

export interface RouteConfig {
  path: string;
  Component: FunctionComponent;
  title: string;
  isProtected?: boolean;
  children?: RouteConfig[];
}

export const APP_ROUTES: RouteConfig[] = [
  {
    path: ROUTES.LOGIN,
    Component: LoginPage,
    title: 'Login',
  },
  {
    path: ROUTES.REGISTER,
    Component: RegisterPage,
    title: 'Register',
  },
  {
    path: ROUTES.HOME,
    Component: HomePage,
    title: 'Home',
    isProtected: true,
  },
  {
    path: ROUTES.PROFILE,
    Component: ProfilePage,
    title: 'Profile',
    isProtected: true,
  },
  {
    path: ROUTES.READ_LATER,
    Component: ReadLaterPage,
    title: 'Read later',
    isProtected: true,
  },
];
