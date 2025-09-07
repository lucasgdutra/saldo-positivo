import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateNestedManyWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema).optional()
}).strict();
export const CategoryUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateWithoutUserInput>;
export const CategoryUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
