import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceSumAggregateInputObjectSchema: z.ZodType<Prisma.BalanceSumAggregateInputType, Prisma.BalanceSumAggregateInputType> = z.object({
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional()
}).strict();
export const BalanceSumAggregateInputObjectZodSchema = z.object({
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional()
}).strict();
