import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ExpenseOrderByRelationAggregateInputObjectSchema } from './ExpenseOrderByRelationAggregateInput.schema'

export const CategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput, Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const CategoryOrderByWithRelationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
