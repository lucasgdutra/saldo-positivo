import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const RevenueOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.RevenueOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueOrderByRelationAggregateInput>;
export const RevenueOrderByRelationAggregateInputObjectZodSchema = makeSchema();
