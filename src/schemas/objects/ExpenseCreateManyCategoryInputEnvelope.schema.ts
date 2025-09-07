import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ExpenseCreateManyCategoryInputObjectSchema } from './ExpenseCreateManyCategoryInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  data: z.union([z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema), z.lazy(() => ExpenseCreateManyCategoryInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ExpenseCreateManyCategoryInputEnvelopeObjectSchema: z.ZodType<Prisma.ExpenseCreateManyCategoryInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateManyCategoryInputEnvelope>;
export const ExpenseCreateManyCategoryInputEnvelopeObjectZodSchema = makeSchema();
