import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthSession, authSessionStoreCreateFn } from '../store/auth.store.ts';
import { createStore, StoreApi, useStore } from 'zustand';

const AuthSessionContext = createContext<StoreApi<AuthSession> | null>(null);

const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [authSession] = useState(() =>
    createStore<AuthSession>(authSessionStoreCreateFn)
  );

  useEffect(() => {
    authSession.getState().updateAuthSession();
  }, [authSession]);

  return (
    <AuthSessionContext.Provider
      value={{
        ...authSession,
      }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
};

export function useAuthSession<T>(selector: (state: AuthSession) => T): T {
  const _ctx = useContext(AuthSessionContext);

  if (!_ctx) {
    throw new Error('useAuthSession must be used within AuthProvider');
  }

  return useStore(_ctx, selector);
}

export default AuthProvider;
