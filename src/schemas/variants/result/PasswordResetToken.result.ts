import { z } from 'zod';
// prettier-ignore
export const PasswordResetTokenResultSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    expiresAt: z.date(),
    used: z.boolean(),
    createdAt: z.date(),
    user: z.unknown()
}).strict();

export type PasswordResetTokenResultType = z.infer<typeof PasswordResetTokenResultSchema>;
