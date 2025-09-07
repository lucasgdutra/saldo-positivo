import { z } from "zod";
export const ExpenseGroupByResultSchema = z.array(
	z.object({
		id: z.string(),
		amount: z.number(),
		description: z.string(),
		date: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
		userId: z.string(),
		categoryId: z.string(),
		_count: z
			.object({
				id: z.number(),
				amount: z.number(),
				description: z.number(),
				date: z.number(),
				createdAt: z.number(),
				updatedAt: z.number(),
				userId: z.number(),
				categoryId: z.number(),
				user: z.number(),
				category: z.number(),
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
				categoryId: z.string().nullable(),
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
				categoryId: z.string().nullable(),
			})
			.nullable()
			.optional(),
	}),
);
