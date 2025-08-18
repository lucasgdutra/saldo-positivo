import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { CategoryUpdateWithoutExpensesInputObjectSchema } from './CategoryUpdateWithoutExpensesInput.schema';
import { CategoryUncheckedUpdateWithoutExpensesInputObjectSchema } from './CategoryUncheckedUpdateWithoutExpensesInput.schema'

export const CategoryUpdateToOneWithWhereWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutExpensesInput, Prisma.CategoryUpdateToOneWithWhereWithoutExpensesInput> = z.object({
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)])
}).strict();
export const CategoryUpdateToOneWithWhereWithoutExpensesInputObjectZodSchema = z.object({
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)])
}).strict();
