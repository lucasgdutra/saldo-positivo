import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  every: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => CategoryWhereInputObjectSchema).optional()
}).strict();
export const CategoryListRelationFilterObjectSchema: z.ZodType<Prisma.CategoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CategoryListRelationFilter>;
export const CategoryListRelationFilterObjectZodSchema = makeSchema();
