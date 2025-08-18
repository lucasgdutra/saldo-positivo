import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const NestedBoolNullableFilterObjectSchema: z.ZodType<Prisma.NestedBoolNullableFilter, Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)]).nullish()
}).strict();
export const NestedBoolNullableFilterObjectZodSchema = z.object({
  equals: z.boolean().nullish(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterObjectSchema)]).nullish()
}).strict();
