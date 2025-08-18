import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutExpensesInputObjectSchema } from './UserCreateNestedOneWithoutExpensesInput.schema';
import { CategoryCreateNestedOneWithoutExpensesInputObjectSchema } from './CategoryCreateNestedOneWithoutExpensesInput.schema'

export const ExpenseCreateInputObjectSchema: z.ZodType<Prisma.ExpenseCreateInput, Prisma.ExpenseCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputObjectSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema)
}).strict();
export const ExpenseCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputObjectSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema)
}).strict();
