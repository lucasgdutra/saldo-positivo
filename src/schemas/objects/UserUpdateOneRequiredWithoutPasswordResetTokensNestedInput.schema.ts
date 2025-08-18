import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from './UserCreateWithoutPasswordResetTokensInput.schema';
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from './UserUncheckedCreateWithoutPasswordResetTokensInput.schema';
import { UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema } from './UserCreateOrConnectWithoutPasswordResetTokensInput.schema';
import { UserUpsertWithoutPasswordResetTokensInputObjectSchema } from './UserUpsertWithoutPasswordResetTokensInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPasswordResetTokensInput.schema';
import { UserUpdateWithoutPasswordResetTokensInputObjectSchema } from './UserUpdateWithoutPasswordResetTokensInput.schema';
import { UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema } from './UserUncheckedUpdateWithoutPasswordResetTokensInput.schema'

export const UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput, Prisma.UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasswordResetTokensInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPasswordResetTokensInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUpdateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputObjectSchema)]).optional()
}).strict();
