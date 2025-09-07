import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  familySize: z.literal(true).optional()
}).strict();
export const UserSumAggregateInputObjectSchema: z.ZodType<Prisma.UserSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserSumAggregateInputType>;
export const UserSumAggregateInputObjectZodSchema = makeSchema();
