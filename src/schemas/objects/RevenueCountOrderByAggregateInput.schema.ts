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
  userId: SortOrderSchema.optional()
}).strict();
export const RevenueCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueCountOrderByAggregateInput>;
export const RevenueCountOrderByAggregateInputObjectZodSchema = makeSchema();
