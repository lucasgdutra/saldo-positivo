import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  description: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const RevenueMaxAggregateInputObjectSchema: z.ZodType<Prisma.RevenueMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RevenueMaxAggregateInputType>;
export const RevenueMaxAggregateInputObjectZodSchema = makeSchema();
