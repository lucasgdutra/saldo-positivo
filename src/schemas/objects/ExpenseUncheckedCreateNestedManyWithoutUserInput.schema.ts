import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateWithoutUserInputObjectSchema } from './ExpenseCreateWithoutUserInput.schema';
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateWithoutUserInput.schema';
import { ExpenseCreateOrConnectWithoutUserInputObjectSchema } from './ExpenseCreateOrConnectWithoutUserInput.schema';
import { ExpenseCreateManyUserInputEnvelopeObjectSchema } from './ExpenseCreateManyUserInputEnvelope.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema'

export const ExpenseUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUncheckedCreateNestedManyWithoutUserInput, Prisma.ExpenseUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const ExpenseUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema).array(), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => ExpenseCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => ExpenseWhereUniqueInputObjectSchema), z.lazy(() => ExpenseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
