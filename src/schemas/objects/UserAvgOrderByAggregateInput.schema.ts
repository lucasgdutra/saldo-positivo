import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const UserAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput, Prisma.UserAvgOrderByAggregateInput> = z.object({
  familySize: SortOrderSchema.optional()
}).strict();
export const UserAvgOrderByAggregateInputObjectZodSchema = z.object({
  familySize: SortOrderSchema.optional()
}).strict();
