import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateManyUserInputObjectSchema } from './ExpenseCreateManyUserInput.schema'

export const ExpenseCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ExpenseCreateManyUserInputEnvelope, Prisma.ExpenseCreateManyUserInputEnvelope> = z.object({
  data: z.union([z.lazy(() => ExpenseCreateManyUserInputObjectSchema), z.lazy(() => ExpenseCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ExpenseCreateManyUserInputEnvelopeObjectZodSchema = z.object({
  data: z.union([z.lazy(() => ExpenseCreateManyUserInputObjectSchema), z.lazy(() => ExpenseCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
