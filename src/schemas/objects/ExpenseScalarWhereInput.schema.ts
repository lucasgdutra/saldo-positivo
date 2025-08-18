import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

export const ExpenseScalarWhereInputObjectSchema: z.ZodType<Prisma.ExpenseScalarWhereInput, Prisma.ExpenseScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional()
}).strict();
export const ExpenseScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ExpenseScalarWhereInputObjectSchema), z.lazy(() => ExpenseScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional()
}).strict();
