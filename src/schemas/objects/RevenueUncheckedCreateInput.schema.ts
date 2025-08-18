import { z } from 'zod';
import type { Prisma } from '@prisma/client';


export const RevenueUncheckedCreateInputObjectSchema: z.ZodType<Prisma.RevenueUncheckedCreateInput, Prisma.RevenueUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
export const RevenueUncheckedCreateInputObjectZodSchema = z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.string()
}).strict();
