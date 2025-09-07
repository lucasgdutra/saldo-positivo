import { z } from "zod";
export const PasswordResetTokenCreateResultSchema = z.object({
	id: z.string(),
	token: z.string(),
	userId: z.string(),
	expiresAt: z.date(),
	used: z.boolean(),
	createdAt: z.date(),
	user: z.unknown(),
});
