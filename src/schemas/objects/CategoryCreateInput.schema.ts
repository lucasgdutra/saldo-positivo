import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCategoriesInputObjectSchema } from './UserCreateNestedOneWithoutCategoriesInput.schema';
import { ExpenseCreateNestedManyWithoutCategoryInputObjectSchema } from './ExpenseCreateNestedManyWithoutCategoryInput.schema'

export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput, Prisma.CategoryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
