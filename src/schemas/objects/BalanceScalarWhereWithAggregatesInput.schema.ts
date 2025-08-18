import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema'

export const BalanceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BalanceScalarWhereWithAggregatesInput, Prisma.BalanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  totalAmount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  totalRevenues: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  totalExpenses: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  referenceMonth: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const BalanceScalarWhereWithAggregatesInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BalanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  totalAmount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  totalRevenues: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  totalExpenses: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  referenceMonth: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
