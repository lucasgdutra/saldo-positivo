import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.BalanceCreateWithoutUserInput, Prisma.BalanceCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const BalanceCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
