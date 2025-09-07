import { z } from "zod";
export const BalanceFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.string(),
			totalAmount: z.number(),
			totalRevenues: z.number(),
			totalExpenses: z.number(),
			referenceMonth: z.date(),
			createdAt: z.date(),
			updatedAt: z.date(),
			userId: z.string(),
			user: z.unknown(),
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
