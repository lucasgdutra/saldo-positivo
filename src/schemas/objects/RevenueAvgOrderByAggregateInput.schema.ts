import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const RevenueAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RevenueAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueAvgOrderByAggregateInput>;
export const RevenueAvgOrderByAggregateInputObjectZodSchema = makeSchema();
