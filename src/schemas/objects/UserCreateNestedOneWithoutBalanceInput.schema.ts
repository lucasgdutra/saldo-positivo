import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBalanceInputObjectSchema } from './UserCreateWithoutBalanceInput.schema';
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from './UserUncheckedCreateWithoutBalanceInput.schema';
import { UserCreateOrConnectWithoutBalanceInputObjectSchema } from './UserCreateOrConnectWithoutBalanceInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBalanceInput, Prisma.UserCreateNestedOneWithoutBalanceInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBalanceInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutBalanceInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBalanceInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
