import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUpdateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedUpdateWithoutUserInput.schema';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema'

export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput, Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
