import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const CategoryMaxAggregateInputObjectSchema: z.ZodType<Prisma.CategoryMaxAggregateInputType, Prisma.CategoryMaxAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CategoryMaxAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
