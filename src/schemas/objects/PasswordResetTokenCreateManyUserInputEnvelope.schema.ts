import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenCreateManyUserInputObjectSchema } from './PasswordResetTokenCreateManyUserInput.schema'

export const PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInputEnvelope, Prisma.PasswordResetTokenCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PasswordResetTokenCreateManyUserInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
