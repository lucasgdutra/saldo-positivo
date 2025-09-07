import { z } from "zod";
export const CategoryFindManyResultSchema = z.object({
	data: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			color: z.string(),
			icon: z.string(),
			userId: z.string(),
			createdAt: z.date(),
			updatedAt: z.date(),
			user: z.unknown(),
			expenses: z.array(z.unknown()),
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
