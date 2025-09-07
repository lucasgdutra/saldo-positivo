import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from './ExpenseUpdateWithoutCategoryInput.schema';
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedUpdateWithoutCategoryInput.schema';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema)]),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutCategoryInput>;
export const ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectZodSchema = makeSchema();
