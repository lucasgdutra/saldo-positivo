import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceMinAggregateInputObjectSchema: z.ZodType<Prisma.BalanceMinAggregateInputType, Prisma.BalanceMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional(),
  referenceMonth: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const BalanceMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional(),
  referenceMonth: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
