import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional()
}).strict();
export const ExpenseCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCountOrderByAggregateInput>;
export const ExpenseCountOrderByAggregateInputObjectZodSchema = makeSchema();
