import { z } from 'zod';
export const BalanceUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  user: z.unknown()
}));