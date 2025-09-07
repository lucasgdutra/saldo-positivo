import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasswordResetTokenCreateManyUserInputObjectSchema } from './PasswordResetTokenCreateManyUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema), z.lazy(() => PasswordResetTokenCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PasswordResetTokenCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PasswordResetTokenCreateManyUserInputEnvelope>;
export const PasswordResetTokenCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
