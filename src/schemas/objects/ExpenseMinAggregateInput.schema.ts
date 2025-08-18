import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ExpenseMinAggregateInputObjectSchema: z.ZodType<Prisma.ExpenseMinAggregateInputType, Prisma.ExpenseMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  categoryId: z.literal(true).optional()
}).strict();
export const ExpenseMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  categoryId: z.literal(true).optional()
}).strict();
