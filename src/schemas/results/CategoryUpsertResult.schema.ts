import { z } from 'zod';
export const CategoryUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  icon: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.unknown(),
  expenses: z.array(z.unknown())
});