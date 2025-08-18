import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const ExpenseOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseOrderByRelationAggregateInput, Prisma.ExpenseOrderByRelationAggregateInput> = z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ExpenseOrderByRelationAggregateInputObjectZodSchema = z.object({
  _count: SortOrderSchema.optional()
}).strict();
