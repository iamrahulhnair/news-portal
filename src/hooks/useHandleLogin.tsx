import { useForm, UseFormReturn } from 'react-hook-form';
import {
  LOGIN_SCHEMA,
  LoginFormSchema,
} from '../config/form-schema/login.schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultError, useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useRememberMe } from './useRememberMe.tsx';
import { useEffect } from 'react';
import { AuthTokenNames, UserProfile } from '../store/auth.store.ts';
import { useAuthSession } from '../providers/AuthProvider.tsx';
import type { UseMutationResult } from '@tanstack/react-query';

export function useHandleLogin(): {
  formRef: UseFormReturn<LoginFormSchema>;
  isSubmitting: boolean;
  loginMutation: UseMutationResult<
    UserProfile,
    DefaultError,
    LoginFormSchema,
    unknown
  >['mutate'];
} {
  const formRef = useForm<LoginFormSchema>({
    resolver: zodResolver(LOGIN_SCHEMA),
    mode: 'onTouched',
  });

  const { reset } = formRef;

  const updateAuthSession = useAuthSession((state) => state.updateAuthSession);

  const { rememberMe, forgetMe, getRememberedCredentials } = useRememberMe();

  const { mutate: loginMutation, isPending: isSubmitting } = useMutation<
    UserProfile,
    DefaultError,
    LoginFormSchema,
    unknown
  >({
    mutationFn: login,
    onSuccess: () => {
      toast.success('Login successfully');
      updateAuthSession();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function login({
    rememberMe: rememberMeValue,
    email,
    password,
  }: LoginFormSchema): Promise<UserProfile> {
    if (rememberMeValue) {
      rememberMe(email, password);
    } else {
      forgetMe();
    }

    const expiresInMins = 60;
    const response = await fetch(
      `${import.meta.env.VITE_DUMMY_AUTH_ENDPOINT}auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emilys',
          password,
          expiresInMins,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Login failed. Please check your credentials.');
    }

    const data = await response.json();

    Cookies.set(AuthTokenNames.ACCESS_TOKEN, data.accessToken, {
      expires: expiresInMins,
      secure: true,
      sameSite: 'lax',
    });

    Cookies.set(AuthTokenNames.REFRESH_TOKEN, data.refreshToken, {
      expires: 7,
      secure: true,
      sameSite: 'lax',
    });

    const profile: UserProfile = {
      id: data.id,
      email: data.email,
      username: data.username,
      image: data.image,
    };

    Cookies.set(AuthTokenNames.PROFILE, JSON.stringify(profile), {
      expires: 7,
      secure: true,
      sameSite: 'lax',
    });

    return data;
  }

  useEffect(() => {
    const rememberRef = getRememberedCredentials();
    if (!rememberRef) return;
    reset({
      email: rememberRef.email,
      password: rememberRef.password,
      rememberMe: true,
    });
  }, []);

  return {
    formRef,
    loginMutation,
    isSubmitting,
  };
}
