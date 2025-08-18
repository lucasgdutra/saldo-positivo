import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutBalanceInputObjectSchema } from './UserUpdateWithoutBalanceInput.schema';
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from './UserUncheckedUpdateWithoutBalanceInput.schema';
import { UserCreateWithoutBalanceInputObjectSchema } from './UserCreateWithoutBalanceInput.schema';
import { UserUncheckedCreateWithoutBalanceInputObjectSchema } from './UserUncheckedCreateWithoutBalanceInput.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const UserUpsertWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutBalanceInput, Prisma.UserUpsertWithoutBalanceInput> = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutBalanceInputObjectZodSchema = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBalanceInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
