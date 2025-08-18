import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueCreateManyUserInputObjectSchema } from './RevenueCreateManyUserInput.schema'

export const RevenueCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.RevenueCreateManyUserInputEnvelope, Prisma.RevenueCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => RevenueCreateManyUserInputObjectSchema), z.lazy(() => RevenueCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const RevenueCreateManyUserInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => RevenueCreateManyUserInputObjectSchema), z.lazy(() => RevenueCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
