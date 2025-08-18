import { z } from 'zod';
export const CategoryCreateResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  expenses: z.array(z.unknown())
});