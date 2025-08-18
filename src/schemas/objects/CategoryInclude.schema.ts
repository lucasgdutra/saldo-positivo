import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { ExpenseFindManySchema } from '../findManyExpense.schema';
import { CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

export const CategoryIncludeObjectSchema: z.ZodType<Prisma.CategoryInclude, Prisma.CategoryInclude> = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  expenses: z.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategoryIncludeObjectZodSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  expenses: z.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
