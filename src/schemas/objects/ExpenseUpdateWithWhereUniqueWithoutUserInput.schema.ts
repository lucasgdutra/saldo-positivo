import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseUpdateWithoutUserInputObjectSchema } from './ExpenseUpdateWithoutUserInput.schema';
import { ExpenseUncheckedUpdateWithoutUserInputObjectSchema } from './ExpenseUncheckedUpdateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => ExpenseUpdateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const ExpenseUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput>;
export const ExpenseUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
