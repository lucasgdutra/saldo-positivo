import { z } from 'zod';
export const ExpenseCreateManyResultSchema = z.object({
  count: z.number()
});