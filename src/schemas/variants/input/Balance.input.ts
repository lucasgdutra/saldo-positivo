import { z } from 'zod';
// prettier-ignore
export const BalanceInputSchema = z.object({
    totalAmount: z.number(),
    totalRevenues: z.number(),
    totalExpenses: z.number(),
    referenceMonth: z.date(),
    userId: z.string(),
    user: z.unknown()
}).strict();

export type BalanceInputType = z.infer<typeof BalanceInputSchema>;
