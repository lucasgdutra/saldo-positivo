import { z } from "zod";
export const CategoryAggregateResultSchema = z.object({
	_count: z
		.object({
			id: z.number(),
			name: z.number(),
			userId: z.number(),
			createdAt: z.number(),
			updatedAt: z.number(),
			user: z.number(),
			expenses: z.number(),
		})
		.optional(),
	_min: z
		.object({
			id: z.string().nullable(),
			name: z.string().nullable(),
			userId: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
	_max: z
		.object({
			id: z.string().nullable(),
			name: z.string().nullable(),
			userId: z.string().nullable(),
			createdAt: z.date().nullable(),
			updatedAt: z.date().nullable(),
		})
		.nullable()
		.optional(),
});
