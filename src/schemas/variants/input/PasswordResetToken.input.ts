import { z } from 'zod';

// prettier-ignore
export const PasswordResetTokenInputSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    used: z.boolean(),
    createdAt: z.date(),
    user: z.unknown()
}).strict();

export type PasswordResetTokenInputType = z.infer<typeof PasswordResetTokenInputSchema>;
