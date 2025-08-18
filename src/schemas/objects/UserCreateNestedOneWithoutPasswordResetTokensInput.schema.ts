import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPasswordResetTokensInputObjectSchema } from './UserCreateWithoutPasswordResetTokensInput.schema';
import { UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema } from './UserUncheckedCreateWithoutPasswordResetTokensInput.schema';
import { UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema } from './UserCreateOrConnectWithoutPasswordResetTokensInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

export const UserCreateNestedOneWithoutPasswordResetTokensInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetTokensInput, Prisma.UserCreateNestedOneWithoutPasswordResetTokensInput> = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPasswordResetTokensInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
