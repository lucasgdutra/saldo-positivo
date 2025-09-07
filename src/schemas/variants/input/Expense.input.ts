import { z } from "zod";
// prettier-ignore
export const ExpenseInputSchema = z
	.object({
		amount: z.number(),
		description: z.string().optional().nullable(),
		date: z.date(),
		userId: z.string(),
		categoryId: z.string(),
		user: z.unknown(),
		category: z.unknown(),
	})
	.strict();

export type ExpenseInputType = z.infer<typeof ExpenseInputSchema>;
