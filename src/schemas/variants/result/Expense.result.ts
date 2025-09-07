import { z } from 'zod';

// prettier-ignore
export const ExpenseResultSchema = z.object({
    id: z.string(),
    amount: z.number(),
    description: z.string().nullable(),
    date: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.string(),
    categoryId: z.string(),
    user: z.unknown(),
    category: z.unknown()
}).strict();

export type ExpenseResultType = z.infer<typeof ExpenseResultSchema>;
