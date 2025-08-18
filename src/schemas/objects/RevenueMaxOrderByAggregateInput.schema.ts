import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const RevenueMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMaxOrderByAggregateInput, Prisma.RevenueMaxOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const RevenueMaxOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
