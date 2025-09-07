import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ExpenseOrderByWithRelationInputObjectSchema } from './objects/ExpenseOrderByWithRelationInput.schema';
import { ExpenseWhereInputObjectSchema } from './objects/ExpenseWhereInput.schema';
import { ExpenseWhereUniqueInputObjectSchema } from './objects/ExpenseWhereUniqueInput.schema';
import { ExpenseCountAggregateInputObjectSchema } from './objects/ExpenseCountAggregateInput.schema';

export const ExpenseCountSchema: z.ZodType<Prisma.ExpenseCountArgs> = z.object({ orderBy: z.union([ExpenseOrderByWithRelationInputObjectSchema, ExpenseOrderByWithRelationInputObjectSchema.array()]).optional(), where: ExpenseWhereInputObjectSchema.optional(), cursor: ExpenseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ExpenseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ExpenseCountArgs>;

export const ExpenseCountZodSchema = z.object({ orderBy: z.union([ExpenseOrderByWithRelationInputObjectSchema, ExpenseOrderByWithRelationInputObjectSchema.array()]).optional(), where: ExpenseWhereInputObjectSchema.optional(), cursor: ExpenseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ExpenseCountAggregateInputObjectSchema ]).optional() }).strict();