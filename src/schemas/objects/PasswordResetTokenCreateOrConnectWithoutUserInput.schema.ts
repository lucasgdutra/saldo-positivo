import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenWhereUniqueInputObjectSchema } from './PasswordResetTokenWhereUniqueInput.schema';
import { PasswordResetTokenCreateWithoutUserInputObjectSchema } from './PasswordResetTokenCreateWithoutUserInput.schema';
import { PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema } from './PasswordResetTokenUncheckedCreateWithoutUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  where: z.lazy(() => PasswordResetTokenWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputObjectSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput>;
export const PasswordResetTokenCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
