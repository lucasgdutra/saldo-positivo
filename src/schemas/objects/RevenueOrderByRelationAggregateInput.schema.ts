import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const RevenueOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RevenueOrderByRelationAggregateInput, Prisma.RevenueOrderByRelationAggregateInput> = z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const RevenueOrderByRelationAggregateInputObjectZodSchema = z.object({
  _count: SortOrderSchema.optional()
}).strict();
