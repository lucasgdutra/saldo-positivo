import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceAvgAggregateInputObjectSchema: z.ZodType<Prisma.BalanceAvgAggregateInputType, Prisma.BalanceAvgAggregateInputType> = z.object({
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional()
}).strict();
export const BalanceAvgAggregateInputObjectZodSchema = z.object({
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional()
}).strict();
