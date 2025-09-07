import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string(),
  userId: z.string()
}).strict();
export const BalanceWhereUniqueInputObjectSchema: z.ZodType<Prisma.BalanceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.BalanceWhereUniqueInput>;
export const BalanceWhereUniqueInputObjectZodSchema = makeSchema();
