import { z } from 'zod';
export const BalanceCreateManyResultSchema = z.object({
  count: z.number()
});