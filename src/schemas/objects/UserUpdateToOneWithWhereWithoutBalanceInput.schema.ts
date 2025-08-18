import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutBalanceInputObjectSchema } from './UserUpdateWithoutBalanceInput.schema';
import { UserUncheckedUpdateWithoutBalanceInputObjectSchema } from './UserUncheckedUpdateWithoutBalanceInput.schema'

export const UserUpdateToOneWithWhereWithoutBalanceInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBalanceInput, Prisma.UserUpdateToOneWithWhereWithoutBalanceInput> = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutBalanceInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutBalanceInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBalanceInputObjectSchema)])
}).strict();
