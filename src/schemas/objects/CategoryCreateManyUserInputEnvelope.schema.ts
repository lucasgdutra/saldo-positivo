import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryCreateManyUserInputObjectSchema } from './CategoryCreateManyUserInput.schema'

export const CategoryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.CategoryCreateManyUserInputEnvelope, Prisma.CategoryCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => CategoryCreateManyUserInputObjectSchema), z.lazy(() => CategoryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const CategoryCreateManyUserInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => CategoryCreateManyUserInputObjectSchema), z.lazy(() => CategoryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
