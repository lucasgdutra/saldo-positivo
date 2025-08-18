import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutBalanceInputObjectSchema } from './UserCreateWithoutBalanceInput.schema';
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from './UserUncheckedCreateWithoutBalanceInput.schema'

export const UserCreateOrConnectWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBalanceInput, Prisma.UserCreateOrConnectWithoutBalanceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutBalanceInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)])
}).strict();
