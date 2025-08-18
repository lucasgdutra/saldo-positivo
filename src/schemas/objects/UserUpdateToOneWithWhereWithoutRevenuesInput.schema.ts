import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutRevenuesInputObjectSchema } from './UserUpdateWithoutRevenuesInput.schema';
import { UserUncheckedUpdateWithoutRevenuesInputObjectSchema } from './UserUncheckedUpdateWithoutRevenuesInput.schema'

export const UserUpdateToOneWithWhereWithoutRevenuesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRevenuesInput, Prisma.UserUpdateToOneWithWhereWithoutRevenuesInput> = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutRevenuesInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutRevenuesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutRevenuesInputObjectSchema)])
}).strict();
