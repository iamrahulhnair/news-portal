import { z } from 'zod';

// * Zod Form Schemas
export const PROFILE_SCHEMA = z.object({
  username: z
    .string({
      required_error: 'Display name is required',
    })
    .refine((name) => /^[a-zA-Z0-9]{4,20}$/.test(name), 'Invalid display name'),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ProfileFormSchema = z.infer<typeof PROFILE_SCHEMA>;
