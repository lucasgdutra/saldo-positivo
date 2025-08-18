import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const CategoryCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect, Prisma.CategoryCountOutputTypeSelect> = z.object({
  expenses: z.boolean().optional()
}).strict();
export const CategoryCountOutputTypeSelectObjectZodSchema = z.object({
  expenses: z.boolean().optional()
}).strict();
