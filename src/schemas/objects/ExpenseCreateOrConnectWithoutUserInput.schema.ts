import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseWhereUniqueInputObjectSchema } from './ExpenseWhereUniqueInput.schema';
import { ExpenseCreateWithoutUserInputObjectSchema } from './ExpenseCreateWithoutUserInput.schema';
import { ExpenseUncheckedCreateWithoutUserInputObjectSchema } from './ExpenseUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ExpenseCreateWithoutUserInputObjectSchema), z.lazy(() => ExpenseUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const ExpenseCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateOrConnectWithoutUserInput>;
export const ExpenseCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
