import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithoutUserInputObjectSchema } from './ExpenseUpdateWithoutUserInput.schema';
import { ExpenseUncheckedUpdateWithoutUserInputObjectSchema } from './ExpenseUncheckedUpdateWithoutUserInput.schema';
import { ExpenseCreateWithoutUserInputObjectSchema } from './ExpenseCreateWithoutUserInput.schema';
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateWithoutUserInput.schema'

export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput, Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ExpenseUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
