import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const RevenueUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.RevenueUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueUncheckedCreateWithoutUserInput>;
export const RevenueUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
