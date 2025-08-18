import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BalanceWhereInputObjectSchema } from './BalanceWhereInput.schema'

export const BalanceNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.BalanceNullableScalarRelationFilter, Prisma.BalanceNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => BalanceWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => BalanceWhereInputObjectSchema).nullish()
}).strict();
export const BalanceNullableScalarRelationFilterObjectZodSchema = z.object({
  is: z.lazy(() => BalanceWhereInputObjectSchema).nullish(),
  isNot: z.lazy(() => BalanceWhereInputObjectSchema).nullish()
}).strict();
