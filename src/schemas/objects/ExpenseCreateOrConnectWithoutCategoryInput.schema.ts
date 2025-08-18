import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema'

export const ExpenseCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutCategoryInput, Prisma.ExpenseCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseCreateOrConnectWithoutCategoryInputObjectZodSchema = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
