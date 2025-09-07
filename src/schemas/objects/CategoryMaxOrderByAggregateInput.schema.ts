import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  color: SortOrderSchema.optional(),
  icon: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CategoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryMaxOrderByAggregateInput>;
export const CategoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
