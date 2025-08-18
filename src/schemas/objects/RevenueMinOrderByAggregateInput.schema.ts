import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const RevenueMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMinOrderByAggregateInput, Prisma.RevenueMinOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const RevenueMinOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
