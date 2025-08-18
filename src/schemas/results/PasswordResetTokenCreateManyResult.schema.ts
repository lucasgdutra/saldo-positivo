import { z } from 'zod';
export const PasswordResetTokenCreateManyResultSchema = z.object({
  count: z.number()
});