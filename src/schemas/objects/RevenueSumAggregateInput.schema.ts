import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  amount: z.literal(true).optional()
}).strict();
export const RevenueSumAggregateInputObjectSchema: z.ZodType<Prisma.RevenueSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RevenueSumAggregateInputType>;
export const RevenueSumAggregateInputObjectZodSchema = makeSchema();
