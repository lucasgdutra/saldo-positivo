import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueMinAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMinAggregateInputType, Prisma.RevenueMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const RevenueMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
