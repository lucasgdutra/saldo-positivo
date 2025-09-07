import { z } from "zod";
// prettier-ignore
export const RevenueModelSchema = z
	.object({
		id: z.string(),
		amount: z.number(),
		description: z.string().nullable(),
		date: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
		userId: z.string(),
		user: z.unknown(),
	})
	.strict();

export type RevenueModelType = z.infer<typeof RevenueModelSchema>;
