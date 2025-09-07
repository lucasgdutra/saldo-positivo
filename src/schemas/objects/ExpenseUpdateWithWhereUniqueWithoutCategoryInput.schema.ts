import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithoutCategoryInputObjectSchema } from './ExpenseUpdateWithoutCategoryInput.schema';
import { ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedUpdateWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutCategoryInput>;
export const ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectZodSchema = makeSchema();
