import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateNestedManyWithoutCategoryInput.schema'

export const CategoryUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutUserInput, Prisma.CategoryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
