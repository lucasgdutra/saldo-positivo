import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  amount: z.literal(true).optional()
}).strict();
export const ExpenseAvgAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseAvgAggregateInputType>;
export const ExpenseAvgAggregateInputObjectZodSchema = makeSchema();
