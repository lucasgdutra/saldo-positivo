import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ExpenseOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseOrderByRelationAggregateInput>;
export const ExpenseOrderByRelationAggregateInputObjectZodSchema = makeSchema();
