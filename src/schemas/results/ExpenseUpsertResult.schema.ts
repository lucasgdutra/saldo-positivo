import { z } from 'zod';
export const ExpenseUpsertResultSchema = z.object({
  id: z.string(),
  amount: z.number(),
  description: z.string().optional(),
  date: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  categoryId: z.string(),
  user: z.unknown(),
  category: z.unknown()
});