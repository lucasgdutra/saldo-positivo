import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutCategoriesInputObjectSchema } from './UserCreateNestedOneWithoutCategoriesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCategoriesInputObjectSchema)
}).strict();
export const CategoryCreateWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateWithoutExpensesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateWithoutExpensesInput>;
export const CategoryCreateWithoutExpensesInputObjectZodSchema = makeSchema();
