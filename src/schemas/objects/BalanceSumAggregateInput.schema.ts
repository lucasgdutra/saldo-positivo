import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional()
}).strict();
export const BalanceSumAggregateInputObjectSchema: z.ZodType<Prisma.BalanceSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BalanceSumAggregateInputType>;
export const BalanceSumAggregateInputObjectZodSchema = makeSchema();
