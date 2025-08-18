import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

export const RevenueScalarWhereInputObjectSchema: z.ZodType<Prisma.RevenueScalarWhereInput, Prisma.RevenueScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => RevenueScalarWhereInputObjectSchema), z.lazy(() => RevenueScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RevenueScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RevenueScalarWhereInputObjectSchema), z.lazy(() => RevenueScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional()
}).strict();
export const RevenueScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => RevenueScalarWhereInputObjectSchema), z.lazy(() => RevenueScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RevenueScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RevenueScalarWhereInputObjectSchema), z.lazy(() => RevenueScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  userId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional()
}).strict();
