import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema)])
}).strict();
export const ExpenseCreateOrConnectWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutCategoryInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateOrConnectWithoutCategoryInput>;
export const ExpenseCreateOrConnectWithoutCategoryInputObjectZodSchema = makeSchema();
