import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPasswordResetTokensInputObjectSchema } from './UserUpdateWithoutPasswordResetTokensInput.schema';
import { UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema } from './UserUncheckedUpdateWithoutPasswordResetTokensInput.schema'

export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput, Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput> = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectZodSchema = z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema)])
}).strict();
