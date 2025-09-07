import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  amount: z.literal(true).optional()
}).strict();
export const ExpenseSumAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseSumAggregateInputType>;
export const ExpenseSumAggregateInputObjectZodSchema = makeSchema();
