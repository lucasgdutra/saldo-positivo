import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedBoolNullableWithAggregatesFilterObjectSchema } from './NestedBoolNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedBoolNullableFilterObjectSchema } from './NestedBoolNullableFilter.schema'

export const BoolNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter, Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterObjectSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional()
}).strict();
export const BoolNullableWithAggregatesFilterObjectZodSchema = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterObjectSchema)]).nullish(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterObjectSchema).optional()
}).strict();
