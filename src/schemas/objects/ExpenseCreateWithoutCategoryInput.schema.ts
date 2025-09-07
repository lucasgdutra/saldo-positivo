import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutExpensesInputObjectSchema } from './UserCreateNestedOneWithoutExpensesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputObjectSchema)
}).strict();
export const ExpenseCreateWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseCreateWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateWithoutCategoryInput>;
export const ExpenseCreateWithoutCategoryInputObjectZodSchema = makeSchema();
