import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema';
import { PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema } from './PasswordResetTokenCreateOrConnectWithoutUserInput.schema';
import { PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema } from './PasswordResetTokenCreateManyUserInputEnvelope.schema';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema'

export const PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput, Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = z.object({
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
