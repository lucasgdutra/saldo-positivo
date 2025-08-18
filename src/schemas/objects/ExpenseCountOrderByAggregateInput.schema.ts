import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ExpenseCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseCountOrderByAggregateInput, Prisma.ExpenseCountOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional()
}).strict();
export const ExpenseCountOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional()
}).strict();
