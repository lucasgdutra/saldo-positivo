import { z } from "zod";
import { RevenueAvgAggregateInputObjectSchema } from "./objects/RevenueAvgAggregateInput.schema";
import { RevenueCountAggregateInputObjectSchema } from "./objects/RevenueCountAggregateInput.schema";
import { RevenueMaxAggregateInputObjectSchema } from "./objects/RevenueMaxAggregateInput.schema";
import { RevenueMinAggregateInputObjectSchema } from "./objects/RevenueMinAggregateInput.schema";
import { RevenueOrderByWithRelationInputObjectSchema } from "./objects/RevenueOrderByWithRelationInput.schema";
import { RevenueSumAggregateInputObjectSchema } from "./objects/RevenueSumAggregateInput.schema";
import { RevenueWhereInputObjectSchema } from "./objects/RevenueWhereInput.schema";
import { RevenueWhereUniqueInputObjectSchema } from "./objects/RevenueWhereUniqueInput.schema";

export const RevenueAggregateSchema = z.object({
	orderBy: z
		.union([
			RevenueOrderByWithRelationInputObjectSchema,
			RevenueOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: RevenueWhereInputObjectSchema.optional(),
	cursor: RevenueWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), RevenueCountAggregateInputObjectSchema])
		.optional(),
	_min: RevenueMinAggregateInputObjectSchema.optional(),
	_max: RevenueMaxAggregateInputObjectSchema.optional(),
	_avg: RevenueAvgAggregateInputObjectSchema.optional(),
	_sum: RevenueSumAggregateInputObjectSchema.optional(),
});
