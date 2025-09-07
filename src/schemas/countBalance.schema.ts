import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BalanceOrderByWithRelationInputObjectSchema } from './objects/BalanceOrderByWithRelationInput.schema';
import { BalanceWhereInputObjectSchema } from './objects/BalanceWhereInput.schema';
import { BalanceWhereUniqueInputObjectSchema } from './objects/BalanceWhereUniqueInput.schema';
import { BalanceCountAggregateInputObjectSchema } from './objects/BalanceCountAggregateInput.schema';

export const BalanceCountSchema: z.ZodType<Prisma.BalanceCountArgs> = z.object({ orderBy: z.union([BalanceOrderByWithRelationInputObjectSchema, BalanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: BalanceWhereInputObjectSchema.optional(), cursor: BalanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BalanceCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.BalanceCountArgs>;

export const BalanceCountZodSchema = z.object({ orderBy: z.union([BalanceOrderByWithRelationInputObjectSchema, BalanceOrderByWithRelationInputObjectSchema.array()]).optional(), where: BalanceWhereInputObjectSchema.optional(), cursor: BalanceWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), BalanceCountAggregateInputObjectSchema ]).optional() }).strict();