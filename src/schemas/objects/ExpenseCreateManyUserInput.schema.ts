import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  categoryId: z.string()
}).strict();
export const ExpenseCreateManyUserInputObjectSchema: z.ZodType<Prisma.ExpenseCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseCreateManyUserInput>;
export const ExpenseCreateManyUserInputObjectZodSchema = makeSchema();
