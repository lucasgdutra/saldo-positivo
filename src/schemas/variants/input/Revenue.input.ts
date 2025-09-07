import { z } from "zod";
// prettier-ignore
export const RevenueInputSchema = z
	.object({
		amount: z.number(),
		description: z.string().optional().nullable(),
		date: z.date(),
		userId: z.string(),
		user: z.unknown(),
	})
	.strict();

export type RevenueInputType = z.infer<typeof RevenueInputSchema>;
