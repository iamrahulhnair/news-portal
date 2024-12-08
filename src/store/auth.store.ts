import { StoreApi } from 'zustand';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export enum AuthTokenNames {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  PROFILE = 'profile',
}

export enum AuthState {
  LOADING = 1,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  image: string;
}

export interface AuthSession {
  authState: AuthState;
  token: null | string;
  logout: (toastMessage?: string) => void;
  updateAuthSession: () => void;
  profile: UserProfile | null;
  updateProfile: (userProfile: UserProfile) => void;
}

export const authSessionStoreCreateFn = (
  setState: StoreApi<AuthSession>['setState']
): AuthSession => ({
  authState: AuthState.UNAUTHENTICATED,
  token: null,
  profile: null,
  logout: (toastMessage) => {
    setState({
      authState: AuthState.UNAUTHENTICATED,
      token: null,
      profile: null,
    });
    Cookies.remove(AuthTokenNames.ACCESS_TOKEN);
    Cookies.remove(AuthTokenNames.REFRESH_TOKEN);
    Cookies.remove(AuthTokenNames.PROFILE);
    localStorage.removeItem('article');
    toast.success(toastMessage ?? 'Logout successfully');
  },
  updateAuthSession: () => {
    const token = Cookies.get(AuthTokenNames.ACCESS_TOKEN);
    const profile = Cookies.get(AuthTokenNames.PROFILE);
    setState({
      authState: token ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED,
      token: token,
      profile: typeof profile === 'string' ? JSON.parse(profile) : null,
    });
  },
  updateProfile: (profile: UserProfile) => {
    Cookies.set(AuthTokenNames.PROFILE, JSON.stringify(profile));

    setState({
      profile,
    });
  },
});
