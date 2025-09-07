import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  color: z.literal(true).optional(),
  icon: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CategoryMaxAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CategoryMaxAggregateInputType>;
export const CategoryMaxAggregateInputObjectZodSchema = makeSchema();
