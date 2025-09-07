import { z } from 'zod';
export const PasswordResetTokenDeleteManyResultSchema = z.object({
  count: z.number()
});