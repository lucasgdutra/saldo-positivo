import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  userId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const CategoryUncheckedCreateWithoutExpensesInputObjectSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutExpensesInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryUncheckedCreateWithoutExpensesInput>;
export const CategoryUncheckedCreateWithoutExpensesInputObjectZodSchema = makeSchema();
