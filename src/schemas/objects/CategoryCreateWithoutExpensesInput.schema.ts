import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCategoriesInputObjectSchema } from './UserCreateNestedOneWithoutCategoriesInput.schema'

export const CategoryCreateWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutExpensesInput, Prisma.CategoryCreateWithoutExpensesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema)
}).strict();
export const CategoryCreateWithoutExpensesInputObjectZodSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema)
}).strict();
