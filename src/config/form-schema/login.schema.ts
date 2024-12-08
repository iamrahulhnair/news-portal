import { z } from 'zod';

// * Zod Form Schemas
export const LOGIN_SCHEMA = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export type LoginFormSchema = z.infer<typeof LOGIN_SCHEMA>;
