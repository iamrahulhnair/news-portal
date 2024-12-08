import { FunctionComponent, ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../ui/Loader.tsx';
import { ROUTES } from '../../config/routes.ts';
import { useAuthSession } from '../../providers/AuthProvider.tsx';
import { AuthState } from '../../store/auth.store.ts';
import Header from '../ui/Header.tsx';
import ArticleProvider from '../../providers/ArticleProvider.tsx';

const ProtectedRoute: FunctionComponent = (): ReactElement => {
  const authState = useAuthSession((state) => state.authState);

  const location = useLocation();

  if (authState === AuthState.LOADING) {
    return <Loader />;
  }
  if (authState === AuthState.UNAUTHENTICATED) {
    return (
      <Navigate
        to={{
          pathname: ROUTES.LOGIN,
          search: `callback=${location.pathname}`,
        }}
      />
    );
  }

  return (
    <main className='grid h-dvh grid-rows-[auto_1fr] gap-4 overflow-hidden'>
      <ArticleProvider>
        <Header />
        <div className='mx-auto w-full max-w-[96%] overflow-hidden'>
          <Outlet />
        </div>
      </ArticleProvider>
    </main>
  );
};

export default ProtectedRoute;
