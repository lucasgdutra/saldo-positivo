import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueAvgAggregateInputObjectSchema: z.ZodType<Prisma.RevenueAvgAggregateInputType, Prisma.RevenueAvgAggregateInputType> = z.object({
  amount: z.literal(true).optional()
}).strict();
export const RevenueAvgAggregateInputObjectZodSchema = z.object({
  amount: z.literal(true).optional()
}).strict();
