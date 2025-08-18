import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { BalanceCountOrderByAggregateInputObjectSchema } from './BalanceCountOrderByAggregateInput.schema';
import { BalanceAvgOrderByAggregateInputObjectSchema } from './BalanceAvgOrderByAggregateInput.schema';
import { BalanceMaxOrderByAggregateInputObjectSchema } from './BalanceMaxOrderByAggregateInput.schema';
import { BalanceMinOrderByAggregateInputObjectSchema } from './BalanceMinOrderByAggregateInput.schema';
import { BalanceSumOrderByAggregateInputObjectSchema } from './BalanceSumOrderByAggregateInput.schema'

export const BalanceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.BalanceOrderByWithAggregationInput, Prisma.BalanceOrderByWithAggregationInput> = z.object({
  id: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  totalRevenues: SortOrderSchema.optional(),
  totalExpenses: SortOrderSchema.optional(),
  referenceMonth: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => BalanceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BalanceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BalanceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BalanceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BalanceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const BalanceOrderByWithAggregationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  totalAmount: SortOrderSchema.optional(),
  totalRevenues: SortOrderSchema.optional(),
  totalExpenses: SortOrderSchema.optional(),
  referenceMonth: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => BalanceCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => BalanceAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => BalanceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => BalanceMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => BalanceSumOrderByAggregateInputObjectSchema).optional()
}).strict();
