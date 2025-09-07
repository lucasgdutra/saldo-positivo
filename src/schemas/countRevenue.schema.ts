import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { RevenueOrderByWithRelationInputObjectSchema } from './objects/RevenueOrderByWithRelationInput.schema';
import { RevenueWhereInputObjectSchema } from './objects/RevenueWhereInput.schema';
import { RevenueWhereUniqueInputObjectSchema } from './objects/RevenueWhereUniqueInput.schema';
import { RevenueCountAggregateInputObjectSchema } from './objects/RevenueCountAggregateInput.schema';

export const RevenueCountSchema: z.ZodType<Prisma.RevenueCountArgs> = z.object({ orderBy: z.union([RevenueOrderByWithRelationInputObjectSchema, RevenueOrderByWithRelationInputObjectSchema.array()]).optional(), where: RevenueWhereInputObjectSchema.optional(), cursor: RevenueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RevenueCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RevenueCountArgs>;

export const RevenueCountZodSchema = z.object({ orderBy: z.union([RevenueOrderByWithRelationInputObjectSchema, RevenueOrderByWithRelationInputObjectSchema.array()]).optional(), where: RevenueWhereInputObjectSchema.optional(), cursor: RevenueWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RevenueCountAggregateInputObjectSchema ]).optional() }).strict();