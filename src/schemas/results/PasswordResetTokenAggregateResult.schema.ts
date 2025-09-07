import { z } from "zod";
export const PasswordResetTokenAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			token: z.number(),
			userId: z.number(),
			expiresAt: z.number(),
			used: z.number(),
			createdAt: z.number(),
			user: z.number(),
		})
		.optional(),
	_min: z
		.object({
			id: z.string().nullable(),
			token: z.string().nullable(),
			userId: z.string().nullable(),
			expiresAt: z.date().nullable(),
			createdAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.string().nullable(),
			token: z.string().nullable(),
			userId: z.string().nullable(),
			expiresAt: z.date().nullable(),
			createdAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
});
