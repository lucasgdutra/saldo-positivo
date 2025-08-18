import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseScalarWhereInputObjectSchema } from './ExpenseScalarWhereInput.schema';
import { ExpenseUpdateManyMutationInputObjectSchema } from './ExpenseUpdateManyMutationInput.schema';
import { ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema } from './ExpenseUncheckedUpdateManyWithoutCategoryInput.schema'

export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput, Prisma.ExpenseUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseUpdateManyWithWhereWithoutCategoryInputObjectZodSchema = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateManyWithoutCategoryInputObjectSchema)])
}).strict();
