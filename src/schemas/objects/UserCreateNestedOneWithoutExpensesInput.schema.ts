import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutExpensesInputObjectSchema } from './UserCreateWithoutExpensesInput.schema';
import { UserUncheckedCreateWithoutExpensesInputObjectSchema } from './UserUncheckedCreateWithoutExpensesInput.schema';
import { UserCreateOrConnectWithoutExpensesInputObjectSchema } from './UserCreateOrConnectWithoutExpensesInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutExpensesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExpensesInput, Prisma.UserCreateNestedOneWithoutExpensesInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutExpensesInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutExpensesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutExpensesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
