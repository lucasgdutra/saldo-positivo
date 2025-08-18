import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueSelectObjectSchema } from './RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './RevenueInclude.schema'

export const RevenueArgsObjectSchema = z.object({
  select: z.lazy(() => RevenueSelectObjectSchema).optional(),
  include: z.lazy(() => RevenueIncludeObjectSchema).optional()
}).strict();
export const RevenueArgsObjectZodSchema = z.object({
  select: z.lazy(() => RevenueSelectObjectSchema).optional(),
  include: z.lazy(() => RevenueIncludeObjectSchema).optional()
}).strict();
