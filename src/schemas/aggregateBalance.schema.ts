import { z } from "zod";
import { BalanceAvgAggregateInputObjectSchema } from "./objects/BalanceAvgAggregateInput.schema";
import { BalanceCountAggregateInputObjectSchema } from "./objects/BalanceCountAggregateInput.schema";
import { BalanceMaxAggregateInputObjectSchema } from "./objects/BalanceMaxAggregateInput.schema";
import { BalanceMinAggregateInputObjectSchema } from "./objects/BalanceMinAggregateInput.schema";
import { BalanceOrderByWithRelationInputObjectSchema } from "./objects/BalanceOrderByWithRelationInput.schema";
import { BalanceSumAggregateInputObjectSchema } from "./objects/BalanceSumAggregateInput.schema";
import { BalanceWhereInputObjectSchema } from "./objects/BalanceWhereInput.schema";
import { BalanceWhereUniqueInputObjectSchema } from "./objects/BalanceWhereUniqueInput.schema";

export const BalanceAggregateSchema = z.object({
	orderBy: z
		.union([
			BalanceOrderByWithRelationInputObjectSchema,
			BalanceOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: BalanceWhereInputObjectSchema.optional(),
	cursor: BalanceWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), BalanceCountAggregateInputObjectSchema])
		.optional(),
	_min: BalanceMinAggregateInputObjectSchema.optional(),
	_max: BalanceMaxAggregateInputObjectSchema.optional(),
	_avg: BalanceAvgAggregateInputObjectSchema.optional(),
	_sum: BalanceSumAggregateInputObjectSchema.optional(),
});
