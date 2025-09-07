import { z } from "zod";
export const RevenueAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			amount: z.number(),
			description: z.number(),
			date: z.number(),
			createdAt: z.number(),
			updatedAt: z.number(),
			userId: z.number(),
			user: z.number(),
		})
		.optional(),
	_sum: z
		.object({
			amount: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_avg: z
		.object({
			amount: z.number().nullable(),
		})
		.nullable()
		.optional(),
	_min: z
		.object({
			id: z.string().nullable(),
			amount: z.number().nullable(),
			description: z.string().nullable(),
			date: z.date().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
			userId: z.string().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.string().nullable(),
			amount: z.number().nullable(),
			description: z.string().nullable(),
			date: z.date().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
			userId: z.string().nullable(),
		})
		.nullable()
		.optional(),
});
