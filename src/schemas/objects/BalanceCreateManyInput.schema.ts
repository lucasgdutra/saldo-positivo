import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceCreateManyInputObjectSchema: z.ZodType<Prisma.BalanceCreateManyInput, Prisma.BalanceCreateManyInput> = z.object({
  id: z.string().optional(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
export const BalanceCreateManyInputObjectZodSchema = z.object({
  id: z.string().optional(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
