import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { APP_ROUTES, ROUTES } from './config/routes.ts';
import { Children } from 'react';
import ProtectedRoute from './components/feature/ProtectedRoute.tsx';
import AuthenticationRoute from './components/feature/AuthenticationRoute.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={ProtectedRoute}>
          {Children.toArray(
            APP_ROUTES.filter(({ isProtected }) => isProtected).map(
              ({ Component, path, children }) => (
                <Route path={path} Component={Component}>
                  {Children.toArray(
                    children?.map(
                      ({ path: childPath, Component: ChildComponent }) => (
                        <Route path={childPath} Component={ChildComponent} />
                      )
                    )
                  )}
                </Route>
              )
            )
          )}
        </Route>

        <Route Component={AuthenticationRoute}>
          {Children.toArray(
            APP_ROUTES.filter(({ isProtected }) => !isProtected).map(
              ({ Component, path }) => (
                <Route path={path} Component={Component} />
              )
            )
          )}
        </Route>
        <Route
          path='*'
          element={
            <div className='grid h-dvh place-content-center'>
              <h1 className='text-center text-4xl font-bold'>404</h1>
              <span>Page Not Found</span>
              <Link
                className='cursor-pointer text-center font-bold text-primary underline'
                to={ROUTES.HOME}
              >
                Home
              </Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
