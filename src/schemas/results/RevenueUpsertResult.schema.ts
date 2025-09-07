import { z } from "zod";
export const RevenueUpsertResultSchema = z.object({
	id: z.string(),
	amount: z.number(),
	description: z.string().optional(),
	date: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
	userId: z.string(),
	user: z.unknown(),
});
