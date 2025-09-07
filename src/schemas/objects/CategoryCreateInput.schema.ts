import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCategoriesInputObjectSchema } from './UserCreateNestedOneWithoutCategoriesInput.schema';
import { ExpenseCreateNestedManyWithoutCategoryInputObjectSchema } from './ExpenseCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryCreateInputObjectSchema: z.ZodType<Prisma.CategoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateInput>;
export const CategoryCreateInputObjectZodSchema = makeSchema();
