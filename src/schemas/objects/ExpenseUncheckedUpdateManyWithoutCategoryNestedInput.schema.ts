import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateWithoutCategoryInputObjectSchema } from './ExpenseCreateWithoutCategoryInput.schema';
import { ExpenseUncheckedCreateWithoutCategoryInputObjectSchema } from './ExpenseUncheckedCreateWithoutCategoryInput.schema';
import { ExpenseCreateOrConnectWithoutCategoryInputObjectSchema } from './ExpenseCreateOrConnectWithoutCategoryInput.schema';
import { ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './ExpenseUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { ExpenseCreateManyCategoryInputEnvelopeObjectSchema } from './ExpenseCreateManyCategoryInputEnvelope.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './ExpenseUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './ExpenseUpdateManyWithWhereWithoutCategoryInput.schema';
import { ExpenseScalarWhereInputObjectSchema } from './ExpenseScalarWhereInput.schema'

export const ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutCategoryNestedInput, Prisma.ExpenseUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ExpenseUncheckedUpdateManyWithoutCategoryNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateWithoutCategoryInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutCategoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutCategoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyCategoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutCategoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema), z.lazy(() => ExpenseUpdateManyWithWhereWithoutCategoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
