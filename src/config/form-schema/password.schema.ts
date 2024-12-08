import { z } from 'zod';

// * Zod Form Schemas
export const CHANGE_PASSWORD_SCHEMA = z
  .object({
    currentPassword: z
      .string({
        required_error: 'Old password is required',
      })
      .min(1, 'Old password is required'),
    newPassword: z
      .string({
        required_error: 'New password is required',
      })
      .refine(
        (password) => /^[a-zA-Z0-9]{8,20}$/.test(password),
        'Invalid password'
      ),
    confirmNewPassword: z
      .string({
        required_error: 'Confirm password is required',
      })
      .min(1, 'Confirm password is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Password does not match',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormSchema = z.infer<typeof CHANGE_PASSWORD_SCHEMA>;
