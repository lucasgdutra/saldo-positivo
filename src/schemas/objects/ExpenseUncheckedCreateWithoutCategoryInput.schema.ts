import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ExpenseUncheckedCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUncheckedCreateWithoutCategoryInput, Prisma.ExpenseUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
export const ExpenseUncheckedCreateWithoutCategoryInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
