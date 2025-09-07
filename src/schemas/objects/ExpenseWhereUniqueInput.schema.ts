import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string()
}).strict();
export const ExpenseWhereUniqueInputObjectSchema: z.ZodType<Prisma.ExpenseWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ExpenseWhereUniqueInput>;
export const ExpenseWhereUniqueInputObjectZodSchema = makeSchema();
