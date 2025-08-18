import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const ExpenseCreateManyCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseCreateManyCategoryInput, Prisma.ExpenseCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
export const ExpenseCreateManyCategoryInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
