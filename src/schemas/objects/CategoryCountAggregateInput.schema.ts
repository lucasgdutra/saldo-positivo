import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const CategoryCountAggregateInputObjectSchema: z.ZodType<Prisma.CategoryCountAggregateInputType, Prisma.CategoryCountAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CategoryCountAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
