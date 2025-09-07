import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateNestedOneWithoutExpensesInputObjectSchema } from './CategoryCreateNestedOneWithoutExpensesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutExpensesInputObjectSchema)
}).strict();
export const ExpenseCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateWithoutUserInput>;
export const ExpenseCreateWithoutUserInputObjectZodSchema = makeSchema();
