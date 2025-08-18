import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueCountAggregateInputObjectSchema: z.ZodType<Prisma.RevenueCountAggregateInputType, Prisma.RevenueCountAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RevenueCountAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
