import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ExpenseAvgAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseAvgAggregateInputType, Prisma.ExpenseAvgAggregateInputType> = z.object({
  amount: z.literal(true).optional()
}).strict();
export const ExpenseAvgAggregateInputObjectZodSchema = z.object({
  amount: z.literal(true).optional()
}).strict();
