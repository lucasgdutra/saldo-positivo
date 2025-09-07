import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  totalRevenues: SortOrderSchema.optional(),
  totalExpenses: SortOrderSchema.optional(),
  referenceMonth: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const BalanceCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BalanceCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceCountOrderByAggregateInput>;
export const BalanceCountOrderByAggregateInputObjectZodSchema = makeSchema();
