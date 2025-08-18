import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema'

export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput, Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
