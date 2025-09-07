import { z } from "zod";
export const BalanceGroupByResultSchema = z.array(
	z.object({
		id: z.string(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
		userId: z.string(),
		_count: z
			.object({
				id: z.number(),
				totalAmount: z.number(),
				totalRevenues: z.number(),
				totalExpenses: z.number(),
				referenceMonth: z.number(),
				createdAt: z.number(),
				updatedAt: z.number(),
				userId: z.number(),
				user: z.number(),
			})
			.optional(),
		_sum: z
			.object({
				totalAmount: z.number().nullable(),
				totalRevenues: z.number().nullable(),
				totalExpenses: z.number().nullable(),
			})
			.nullable()
			.optional(),
		_avg: z
			.object({
				totalAmount: z.number().nullable(),
				totalRevenues: z.number().nullable(),
				totalExpenses: z.number().nullable(),
			})
			.nullable()
			.optional(),
		_min: z
			.object({
				id: z.string().nullable(),
				totalAmount: z.number().nullable(),
				totalRevenues: z.number().nullable(),
				totalExpenses: z.number().nullable(),
				referenceMonth: z.date().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				userId: z.string().nullable(),
			})
			.nullable()
			.optional(),
		_max: z
			.object({
				id: z.string().nullable(),
				totalAmount: z.number().nullable(),
				totalRevenues: z.number().nullable(),
				totalExpenses: z.number().nullable(),
				referenceMonth: z.date().nullable(),
				createdAt: z.date().nullable(),
				updatedAt: z.date().nullable(),
				userId: z.string().nullable(),
			})
			.nullable()
			.optional(),
	}),
);
