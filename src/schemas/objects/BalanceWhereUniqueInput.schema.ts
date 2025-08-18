import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const BalanceWhereUniqueInputObjectSchema: z.ZodType<Prisma.BalanceWhereUniqueInput, Prisma.BalanceWhereUniqueInput> = z.object({
  id: z.string(),
  userId: z.string()
}).strict();
export const BalanceWhereUniqueInputObjectZodSchema = z.object({
  id: z.string(),
  userId: z.string()
}).strict();
