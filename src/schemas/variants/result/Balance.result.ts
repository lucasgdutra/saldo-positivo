import { z } from "zod";
// prettier-ignore
export const BalanceResultSchema = z
	.object({
		id: z.string(),
		totalAmount: z.number(),
		totalRevenues: z.number(),
		totalExpenses: z.number(),
		referenceMonth: z.date(),
		createdAt: z.date(),
		updatedAt: z.date(),
		userId: z.string(),
		user: z.unknown(),
	})
	.strict();

export type BalanceResultType = z.infer<typeof BalanceResultSchema>;
