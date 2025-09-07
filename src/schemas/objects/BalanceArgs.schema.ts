import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceSelectObjectSchema } from './BalanceSelect.schema';
import { BalanceIncludeObjectSchema } from './BalanceInclude.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  select: z.lazy(() => BalanceSelectObjectSchema).optional(),
  include: z.lazy(() => BalanceIncludeObjectSchema).optional()
}).strict();
export const BalanceArgsObjectSchema = makeSchema();
export const BalanceArgsObjectZodSchema = makeSchema();
