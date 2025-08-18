import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedBoolNullableFilterObjectSchema } from './NestedBoolNullableFilter.schema'

export const NestedBoolNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter, Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterObjectSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional()
}).strict();
export const NestedBoolNullableWithAggregatesFilterObjectZodSchema = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterObjectSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional()
}).strict();
