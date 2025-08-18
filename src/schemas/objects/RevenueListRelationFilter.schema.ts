import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueWhereInputObjectSchema } from './RevenueWhereInput.schema'

export const RevenueListRelationFilterObjectSchema: z.ZodType<Prisma.RevenueListRelationFilter, Prisma.RevenueListRelationFilter> = z.object({
  every: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  some: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  none: z.lazy(() => RevenueWhereInputObjectSchema).optional()
}).strict();
export const RevenueListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  some: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  none: z.lazy(() => RevenueWhereInputObjectSchema).optional()
}).strict();
