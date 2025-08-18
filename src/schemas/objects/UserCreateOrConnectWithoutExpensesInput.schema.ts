import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutExpensesInputObjectSchema } from './UserCreateWithoutExpensesInput.schema';
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from './UserUncheckedCreateWithoutExpensesInput.schema'

export const UserCreateOrConnectWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExpensesInput, Prisma.UserCreateOrConnectWithoutExpensesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutExpensesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema)])
}).strict();
