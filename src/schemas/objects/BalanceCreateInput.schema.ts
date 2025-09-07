import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutBalanceInputObjectSchema } from './UserCreateNestedOneWithoutBalanceInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  totalAmount: z.number(),
  totalRevenues: z.number(),
  totalExpenses: z.number(),
  referenceMonth: z.date(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutBalanceInputObjectSchema)
}).strict();
export const BalanceCreateInputObjectSchema: z.ZodType<Prisma.BalanceCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceCreateInput>;
export const BalanceCreateInputObjectZodSchema = makeSchema();
