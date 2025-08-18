import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const CategoryWhereUniqueInputObjectSchema: z.ZodType<Prisma.CategoryWhereUniqueInput, Prisma.CategoryWhereUniqueInput> = z.object({
  id: z.string()
}).strict();
export const CategoryWhereUniqueInputObjectZodSchema = z.object({
  id: z.string()
}).strict();
