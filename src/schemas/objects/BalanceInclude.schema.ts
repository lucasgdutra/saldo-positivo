import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema'

export const BalanceIncludeObjectSchema: z.ZodType<Prisma.BalanceInclude, Prisma.BalanceInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const BalanceIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
