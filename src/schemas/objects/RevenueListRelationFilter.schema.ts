import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueWhereInputObjectSchema } from './RevenueWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  some: z.lazy(() => RevenueWhereInputObjectSchema).optional(),
  none: z.lazy(() => RevenueWhereInputObjectSchema).optional()
}).strict();
export const RevenueListRelationFilterObjectSchema: z.ZodType<Prisma.RevenueListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.RevenueListRelationFilter>;
export const RevenueListRelationFilterObjectZodSchema = makeSchema();
