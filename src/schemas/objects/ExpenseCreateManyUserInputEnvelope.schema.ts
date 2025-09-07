import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateManyUserInputObjectSchema } from './ExpenseCreateManyUserInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => ExpenseCreateManyUserInputObjectSchema), z.lazy(() => ExpenseCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ExpenseCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ExpenseCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateManyUserInputEnvelope>;
export const ExpenseCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
