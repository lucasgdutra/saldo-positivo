import { z } from "zod";

// prettier-ignore
export const UserInputSchema = z
	.object({
		id: z.string(),
		email: z.string(),
		password: z.string(),
		name: z.string(),
		salaryRange: z.string().optional().nullable(),
		usageMotivation: z.string().optional().nullable(),
		customMotivation: z.string().optional().nullable(),
		financialGoals: z.string().optional().nullable(),
		hasDebts: z.boolean().optional().nullable(),
		familySize: z.number().int().optional().nullable(),
		financialExperience: z.string().optional().nullable(),
		createdAt: z.date(),
		updatedAt: z.date(),
		categories: z.array(z.unknown()),
		expenses: z.array(z.unknown()),
		revenues: z.array(z.unknown()),
		balance: z.unknown().optional().nullable(),
		passwordResetTokens: z.array(z.unknown()),
	})
	.strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
