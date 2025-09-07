import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUpdateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedUpdateWithoutUserInput.schema';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput>;
export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
