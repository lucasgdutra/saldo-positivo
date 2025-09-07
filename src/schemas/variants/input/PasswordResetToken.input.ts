import { z } from "zod";
// prettier-ignore
export const PasswordResetTokenInputSchema = z
	.object({
		token: z.string(),
		userId: z.string(),
		expiresAt: z.date(),
		used: z.boolean(),
		user: z.unknown(),
	})
	.strict();

export type PasswordResetTokenInputType = z.infer<
	typeof PasswordResetTokenInputSchema
>;
