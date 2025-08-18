import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateWithoutUserInputObjectSchema } from './ExpenseCreateWithoutUserInput.schema';
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateWithoutUserInput.schema';
import { ExpenseCreateOrConnectWithoutUserInputObjectSchema } from './ExpenseCreateOrConnectWithoutUserInput.schema';
import { ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './ExpenseUpsertWithWhereUniqueWithoutUserInput.schema';
import { ExpenseCreateManyUserInputEnvelopeObjectSchema } from './ExpenseCreateManyUserInputEnvelope.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './ExpenseUpdateWithWhereUniqueWithoutUserInput.schema';
import { ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema } from './ExpenseUpdateManyWithWhereWithoutUserInput.schema';
import { ExpenseScalarWhereInputObjectSchema } from './ExpenseScalarWhereInput.schema'

export const ExpenseUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutUserNestedInput, Prisma.ExpenseUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const ExpenseUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional()
}).strict();
