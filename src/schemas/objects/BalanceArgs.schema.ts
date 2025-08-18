import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceSelectObjectSchema } from './BalanceSelect.schema';
import { BalanceIncludeObjectSchema } from './BalanceInclude.schema'

export const BalanceArgsObjectSchema = z.object({
  select: z.lazy(() => BalanceSelectObjectSchema).optional(),
  include: z.lazy(() => BalanceIncludeObjectSchema).optional()
}).strict();
export const BalanceArgsObjectZodSchema = z.object({
  select: z.lazy(() => BalanceSelectObjectSchema).optional(),
  include: z.lazy(() => BalanceIncludeObjectSchema).optional()
}).strict();
