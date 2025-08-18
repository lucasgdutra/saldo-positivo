import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { NestedDecimalFilterObjectSchema } from './NestedDecimalFilter.schema'

export const DecimalFilterObjectSchema: z.ZodType<Prisma.DecimalFilter, Prisma.DecimalFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)]).optional()
}).strict();
export const DecimalFilterObjectZodSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedDecimalFilterObjectSchema)]).optional()
}).strict();
