import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { CategoryArgsObjectSchema } from './CategoryArgs.schema'

export const ExpenseIncludeObjectSchema: z.ZodType<Prisma.ExpenseInclude, Prisma.ExpenseInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional()
}).strict();
export const ExpenseIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional()
}).strict();
