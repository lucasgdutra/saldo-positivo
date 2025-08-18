import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ExpenseUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUncheckedCreateWithoutUserInput, Prisma.ExpenseUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string()
}).strict();
export const ExpenseUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string()
}).strict();
