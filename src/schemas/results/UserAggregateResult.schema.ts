import { z } from "zod";
export const UserAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			email: z.number(),
			password: z.number(),
			name: z.number(),
			salaryRange: z.number(),
			usageMotivation: z.number(),
			customMotivation: z.number(),
			financialGoals: z.number(),
			hasDebts: z.number(),
			familySize: z.number(),
			financialExperience: z.number(),
			createdAt: z.number(),
			updatedAt: z.number(),
			categories: z.number(),
			expenses: z.number(),
			revenues: z.number(),
			balance: z.number(),
			passwordResetTokens: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			familySize: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			familySize: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.string().nullable(),
			email: z.string().nullable(),
			password: z.string().nullable(),
			name: z.string().nullable(),
			salaryRange: z.string().nullable(),
			usageMotivation: z.string().nullable(),
			customMotivation: z.string().nullable(),
			financialGoals: z.string().nullable(),
			familySize: z.number().int().nullable(),
			financialExperience: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.string().nullable(),
			email: z.string().nullable(),
			password: z.string().nullable(),
			name: z.string().nullable(),
			salaryRange: z.string().nullable(),
			usageMotivation: z.string().nullable(),
			customMotivation: z.string().nullable(),
			financialGoals: z.string().nullable(),
			familySize: z.number().int().nullable(),
			financialExperience: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
});
