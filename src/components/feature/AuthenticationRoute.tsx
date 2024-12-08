import { FunctionComponent, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/routes.ts';
import Loader from '../ui/Loader.tsx';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import { AuthState } from '../../store/auth.store.ts';

const AuthenticationRoute: FunctionComponent = (): ReactElement => {
  const authState = useAuthSession((state) => state.authState);

  const pathName = useLocation();

  if (authState === AuthState.LOADING) {
    return <Loader />;
  }

  if (authState === AuthState.AUTHENTICATED) {
    const searchParams = new URLSearchParams(pathName.search);

    return <Navigate to={searchParams.get('callback') ?? ROUTES.HOME} />;
  }

  return <Outlet />;
};

export default AuthenticationRoute;
