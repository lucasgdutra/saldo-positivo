import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  totalAmount: z.literal(true).optional(),
  totalRevenues: z.literal(true).optional(),
  totalExpenses: z.literal(true).optional(),
  referenceMonth: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const BalanceMinAggregateInputObjectSchema: z.ZodType<Prisma.BalanceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BalanceMinAggregateInputType>;
export const BalanceMinAggregateInputObjectZodSchema = makeSchema();
