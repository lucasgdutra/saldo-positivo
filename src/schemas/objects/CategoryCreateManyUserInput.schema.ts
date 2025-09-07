import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  name: z.string(),
  color: z.string().optional(),
  icon: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const CategoryCreateManyUserInputObjectSchema: z.ZodType<Prisma.CategoryCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryCreateManyUserInput>;
export const CategoryCreateManyUserInputObjectZodSchema = makeSchema();
