import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RevenueSelectObjectSchema } from './RevenueSelect.schema';
import { RevenueIncludeObjectSchema } from './RevenueInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => RevenueSelectObjectSchema).optional(),
  include: z.lazy(() => RevenueIncludeObjectSchema).optional()
}).strict();
export const RevenueArgsObjectSchema = makeSchema();
export const RevenueArgsObjectZodSchema = makeSchema();
