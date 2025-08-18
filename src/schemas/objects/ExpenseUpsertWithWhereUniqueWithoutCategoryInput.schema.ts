import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from './ExpenseUpdateWithoutCategoryInput.schema';
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedUpdateWithoutCategoryInput.schema';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema'

export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput, Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
