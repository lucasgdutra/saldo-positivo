import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema } from './UserArgs.schema';
import { ExpenseFindManySchema } from '../findManyExpense.schema';
import { CategoryCountOutputTypeArgsObjectSchema } from './CategoryCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  color: z.boolean().optional(),
  icon: z.boolean().optional(),
  userId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  expenses: z.union([z.boolean(), z.lazy(() => ExpenseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CategorySelectObjectSchema: z.ZodType<Prisma.CategorySelect> = makeSchema() as unknown as z.ZodType<Prisma.CategorySelect>;
export const CategorySelectObjectZodSchema = makeSchema();
