import { z } from "zod";
export const UserFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.string(),
			email: z.string(),
			password: z.string(),
			name: z.string(),
			salaryRange: z.string().optional(),
			usageMotivation: z.string().optional(),
			customMotivation: z.string().optional(),
			financialGoals: z.string().optional(),
			hasDebts: z.boolean().optional(),
			familySize: z.number().int().optional(),
			financialExperience: z.string().optional(),
			createdAt: z.date(),
			updatedAt: z.date(),
			categories: z.array(z.unknown()),
			expenses: z.array(z.unknown()),
			revenues: z.array(z.unknown()),
			balance: z.unknown().optional(),
			passwordResetTokens: z.array(z.unknown()),
		}),
	),
	pagination: z.object({
		page: z.number().int().min(1),
		pageSize: z.number().int().min(1),
		total: z.number().int().min(0),
		totalPages: z.number().int().min(0),
		hasNext: z.boolean(),
		hasPrev: z.boolean(),
	}),
});
