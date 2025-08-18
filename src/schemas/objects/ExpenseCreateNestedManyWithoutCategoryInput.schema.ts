import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema';
import { ExpenseCreateOrConnectWithoutCategoryInputObjectSchema } from './ExpenseCreateOrConnectWithoutCategoryInput.schema';
import { ExpenseCreateManyCategoryInputEnvelopeObjectSchema } from './ExpenseCreateManyCategoryInputEnvelope.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema'

export const ExpenseCreateNestedManyWithoutCategoryInputObjectSchema: z.ZodType<Prisma.ExpenseCreateNestedManyWithoutCategoryInput, Prisma.ExpenseCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ExpenseCreateNestedManyWithoutCategoryInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
