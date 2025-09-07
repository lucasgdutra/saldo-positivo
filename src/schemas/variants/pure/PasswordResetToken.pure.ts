import { z } from 'zod';

// prettier-ignore
export const PasswordResetTokenModelSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    used: z.boolean(),
    createdAt: z.date(),
    user: z.unknown()
}).strict();

export type PasswordResetTokenModelType = z.infer<typeof PasswordResetTokenModelSchema>;
