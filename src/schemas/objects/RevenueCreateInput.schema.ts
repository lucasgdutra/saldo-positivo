import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutRevenuesInputObjectSchema } from './UserCreateNestedOneWithoutRevenuesInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  amount: z.number(),
  description: z.string().nullish(),
  date: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRevenuesInputObjectSchema)
}).strict();
export const RevenueCreateInputObjectSchema: z.ZodType<Prisma.RevenueCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RevenueCreateInput>;
export const RevenueCreateInputObjectZodSchema = makeSchema();
