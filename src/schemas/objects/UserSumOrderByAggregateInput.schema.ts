import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const UserSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput, Prisma.UserSumOrderByAggregateInput> = z.object({
  familySize: SortOrderSchema.optional()
}).strict();
export const UserSumOrderByAggregateInputObjectZodSchema = z.object({
  familySize: SortOrderSchema.optional()
}).strict();
