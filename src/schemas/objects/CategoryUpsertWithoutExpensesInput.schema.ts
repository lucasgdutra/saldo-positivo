import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryUpdateWithoutExpensesInputObjectSchema } from './CategoryUpdateWithoutExpensesInput.schema';
import { CategoryUncheckedUpdateWithoutExpensesInputObjectSchema } from './CategoryUncheckedUpdateWithoutExpensesInput.schema';
import { CategoryCreateWithoutExpensesInputObjectSchema } from './CategoryCreateWithoutExpensesInput.schema';
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from './CategoryUncheckedCreateWithoutExpensesInput.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

export const CategoryUpsertWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryUpsertWithoutExpensesInput, Prisma.CategoryUpsertWithoutExpensesInput> = z.object({
  update: z.union([z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)]),
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryUpsertWithoutExpensesInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => CategoryUpdateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedUpdateWithoutExpensesInputObjectSchema)]),
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)]),
  where: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
