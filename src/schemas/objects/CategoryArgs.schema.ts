import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategorySelectObjectSchema } from './CategorySelect.schema';
import { CategoryIncludeObjectSchema } from './CategoryInclude.schema'

export const CategoryArgsObjectSchema = z.object({
  select: z.lazy(() => CategorySelectObjectSchema).optional(),
  include: z.lazy(() => CategoryIncludeObjectSchema).optional()
}).strict();
export const CategoryArgsObjectZodSchema = z.object({
  select: z.lazy(() => CategorySelectObjectSchema).optional(),
  include: z.lazy(() => CategoryIncludeObjectSchema).optional()
}).strict();
