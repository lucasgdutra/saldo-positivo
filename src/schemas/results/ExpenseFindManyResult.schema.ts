import { z } from 'zod';
export const ExpenseFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});