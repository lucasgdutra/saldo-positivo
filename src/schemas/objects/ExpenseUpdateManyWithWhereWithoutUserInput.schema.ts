import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseScalarWhereInputObjectSchema } from './ExpenseScalarWhereInput.schema';
import { ExpenseUpdateManyMutationInputObjectSchema } from './ExpenseUpdateManyMutationInput.schema';
import { ExpenseUncheckedUpdateManyWithoutUserInputObjectSchema } from './ExpenseUncheckedUpdateManyWithoutUserInput.schema'

export const ExpenseUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutUserInput, Prisma.ExpenseUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ExpenseUpdateManyWithWhereWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateManyMutationInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
