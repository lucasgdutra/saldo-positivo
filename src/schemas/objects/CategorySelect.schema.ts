import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { ExpenseFindManySchema } from '../findManyExpense.schema';
import { CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

export const CategorySelectObjectSchema: z.ZodType<Prisma.CategorySelect, Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  expenses: z.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategorySelectObjectZodSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  expenses: z.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
