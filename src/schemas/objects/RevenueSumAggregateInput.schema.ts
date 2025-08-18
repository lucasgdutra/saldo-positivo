import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueSumAggregateInputObjectSchema: z.ZodType<Prisma.RevenueSumAggregateInputType, Prisma.RevenueSumAggregateInputType> = z.object({
  amount: z.literal(true).optional()
}).strict();
export const RevenueSumAggregateInputObjectZodSchema = z.object({
  amount: z.literal(true).optional()
}).strict();
