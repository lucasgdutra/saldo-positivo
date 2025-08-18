import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateNestedManyWithoutCategoryInputObjectSchema } from './ExpenseCreateNestedManyWithoutCategoryInput.schema'

export const CategoryCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutUserInput, Prisma.CategoryCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
