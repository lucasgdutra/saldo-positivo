import { z } from 'zod';
import { RevenueWhereInputObjectSchema } from './objects/RevenueWhereInput.schema';
import { RevenueOrderByWithAggregationInputObjectSchema } from './objects/RevenueOrderByWithAggregationInput.schema';
import { RevenueScalarWhereWithAggregatesInputObjectSchema } from './objects/RevenueScalarWhereWithAggregatesInput.schema';
import { RevenueScalarFieldEnumSchema } from './enums/RevenueScalarFieldEnum.schema';
import { RevenueCountAggregateInputObjectSchema } from './objects/RevenueCountAggregateInput.schema';
import { RevenueMinAggregateInputObjectSchema } from './objects/RevenueMinAggregateInput.schema';
import { RevenueMaxAggregateInputObjectSchema } from './objects/RevenueMaxAggregateInput.schema';

export const RevenueGroupBySchema = z.object({ where: RevenueWhereInputObjectSchema.optional(), orderBy: z.union([RevenueOrderByWithAggregationInputObjectSchema, RevenueOrderByWithAggregationInputObjectSchema.array()]).optional(), having: RevenueScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(RevenueScalarFieldEnumSchema), _count: z.union([ z.literal(true), RevenueCountAggregateInputObjectSchema ]).optional(), _min: RevenueMinAggregateInputObjectSchema.optional(), _max: RevenueMaxAggregateInputObjectSchema.optional() })