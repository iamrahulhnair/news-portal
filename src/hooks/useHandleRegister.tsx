import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ROUTES } from '../config/routes.ts';
import {
  REGISTER_SCHEMA,
  RegisterFormSchema,
} from '../config/form-schema/register.schema.ts';
import { z } from 'zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export enum EmailValidationState {
  VALID = 1,
  INVALID,
  LOADING,
  IDLE,
}

export function useHandleRegister(): {
  formRef: UseFormReturn<RegisterFormSchema>;
  emailState: EmailValidationState;
  registerMutation: (formData: RegisterFormSchema) => void;
  isSubmitting: boolean;
} {
  const formRef = useForm<RegisterFormSchema>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(REGISTER_SCHEMA),
  });

  const { watch, setError, trigger } = formRef;

  const navigate = useNavigate();

  const { email, confirmPassword, password } = watch();

  const [emailState, setEmailState] = useState(EmailValidationState.IDLE);

  const { mutate: registerMutation, isPending: isSubmitting } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success('Register successfully registered!');
      navigate(ROUTES.LOGIN);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function registerUser({
    name,
    email,
    password,
  }: RegisterFormSchema): Promise<void> {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_MOCK_API}users/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: 'https://picsum.photos/800',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return response.json();
  }

  const checkEmailExists = async (email: string) => {
    try {
      setEmailState(EmailValidationState.LOADING);
      await fetch(`${import.meta.env.VITE_AUTH_MOCK_API}users/is-available`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      // * This endpoint always returns as email not available
      setEmailState(EmailValidationState.VALID);
    } catch (e) {
      console.error(e);
      setError('email', {
        message: 'Email already exist',
      });
      setEmailState(EmailValidationState.INVALID);
    }
  };

  useEffect(() => {
    const zodResult = z.string().email().safeParse(email);
    if (zodResult.success) {
      (async () => await checkEmailExists(email!))();
    }
  }, [email]);

  useEffect(() => {
    if (!confirmPassword || !password) return;

    trigger('confirmPassword').then();
  }, [password]);

  return {
    formRef,
    emailState,
    registerMutation,
    isSubmitting,
  };
}
