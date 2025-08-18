import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUpdateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedUpdateWithoutUserInput.schema'

export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput, Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
