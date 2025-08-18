import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUncheckedCreateWithoutUserInput, Prisma.RevenueUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const RevenueUncheckedCreateWithoutUserInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
