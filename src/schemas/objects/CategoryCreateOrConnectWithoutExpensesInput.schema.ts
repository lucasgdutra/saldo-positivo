import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereUniqueInputObjectSchema } from './CategoryWhereUniqueInput.schema';
import { CategoryCreateWithoutExpensesInputObjectSchema } from './CategoryCreateWithoutExpensesInput.schema';
import { CategoryUncheckedCreateWithoutExpensesInputObjectSchema } from './CategoryUncheckedCreateWithoutExpensesInput.schema'

export const CategoryCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutExpensesInput, Prisma.CategoryCreateOrConnectWithoutExpensesInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)])
}).strict();
export const CategoryCreateOrConnectWithoutExpensesInputObjectZodSchema = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CategoryCreateWithoutExpensesInputObjectSchema), z.lazy(() => CategoryUncheckedCreateWithoutExpensesInputObjectSchema)])
}).strict();
