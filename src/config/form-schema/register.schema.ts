import { z } from 'zod';

// * Zod Form Schemas
export const REGISTER_SCHEMA = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Please enter a valid email address'),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .refine((name) => /^[a-zA-Z0-9]{4,20}$/.test(name), 'Invalid name'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .refine(
        (password) => /^[a-zA-Z0-9]{8,20}$/.test(password),
        'Invalid password'
      ),
    confirmPassword: z
      .string({
        required_error: 'Confirm Password is required',
      })
      .min(1, 'Confirm Password is required'),
  })
  .partial()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data?.password && data.password?.length > 0, {
    message: 'Password is required',
    path: ['password'],
  })
  .refine((data) => data?.email && data.email?.trim().length > 0, {
    message: 'Email is required',
    path: ['email'],
  })
  .refine((data) => data?.name && data.name?.trim().length > 0, {
    message: 'Name is required',
    path: ['name'],
  })
  .refine(
    (data) => data?.confirmPassword && data.confirmPassword?.trim().length > 0,
    {
      message: 'Confirm password is required',
      path: ['confirmPassword'],
    }
  );

export type RegisterFormSchema = z.infer<typeof REGISTER_SCHEMA>;
