import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const CategoryMinAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMinAggregateInputType, Prisma.CategoryMinAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CategoryMinAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
