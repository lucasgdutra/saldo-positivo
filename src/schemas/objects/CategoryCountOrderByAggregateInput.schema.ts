import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const CategoryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput, Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CategoryCountOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
