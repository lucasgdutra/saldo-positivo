import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RevenueCountOrderByAggregateInputObjectSchema } from './RevenueCountOrderByAggregateInput.schema';
import { RevenueAvgOrderByAggregateInputObjectSchema } from './RevenueAvgOrderByAggregateInput.schema';
import { RevenueMaxOrderByAggregateInputObjectSchema } from './RevenueMaxOrderByAggregateInput.schema';
import { RevenueMinOrderByAggregateInputObjectSchema } from './RevenueMinOrderByAggregateInput.schema';
import { RevenueSumOrderByAggregateInputObjectSchema } from './RevenueSumOrderByAggregateInput.schema'

export const RevenueOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RevenueOrderByWithAggregationInput, Prisma.RevenueOrderByWithAggregationInput> = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => RevenueCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RevenueAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RevenueMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RevenueMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RevenueSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RevenueOrderByWithAggregationInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => RevenueCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RevenueAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RevenueMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RevenueMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RevenueSumOrderByAggregateInputObjectSchema).optional()
}).strict();
