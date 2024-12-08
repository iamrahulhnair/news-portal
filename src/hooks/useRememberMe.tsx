import Cookies from 'js-cookie';

const PASSWORD_COOKIE_NAME = 'psw-np-client';

const EMAIL_COOKIE_NAME = 'eml-np-client';

export const useRememberMe = (): {
  rememberMe: (email: string, password: string) => void;
  forgetMe: () => void;
  getRememberedCredentials: () =>
    | undefined
    | {
        email: string;
        password: string;
      };
} => {
  const rememberMe = (userEmail: string, userPassword: string): void => {
    Cookies.set(EMAIL_COOKIE_NAME, userEmail);
    Cookies.set(PASSWORD_COOKIE_NAME, userPassword);
  };

  const forgetMe = (): void => {
    Cookies.remove(EMAIL_COOKIE_NAME);
    Cookies.remove(PASSWORD_COOKIE_NAME);
  };

  const getRememberedCredentials = ():
    | undefined
    | {
        email: string;
        password: string;
      } => {
    const email = Cookies.get(EMAIL_COOKIE_NAME);
    const password = Cookies.get(PASSWORD_COOKIE_NAME);
    return !email || !password
      ? undefined
      : {
          email,
          password,
        };
  };

  return {
    rememberMe,
    forgetMe,
    getRememberedCredentials,
  };
};
