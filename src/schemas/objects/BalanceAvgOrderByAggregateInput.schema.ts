import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const BalanceAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BalanceAvgOrderByAggregateInput, Prisma.BalanceAvgOrderByAggregateInput> = z.object({
  totalAmount: SortOrderSchema.optional(),
  totalRevenues: SortOrderSchema.optional(),
  totalExpenses: SortOrderSchema.optional()
}).strict();
export const BalanceAvgOrderByAggregateInputObjectZodSchema = z.object({
  totalAmount: SortOrderSchema.optional(),
  totalRevenues: SortOrderSchema.optional(),
  totalExpenses: SortOrderSchema.optional()
}).strict();
