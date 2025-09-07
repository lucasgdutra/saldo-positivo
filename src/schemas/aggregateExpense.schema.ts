import { z } from "zod";
import { ExpenseAvgAggregateInputObjectSchema } from "./objects/ExpenseAvgAggregateInput.schema";
import { ExpenseCountAggregateInputObjectSchema } from "./objects/ExpenseCountAggregateInput.schema";
import { ExpenseMaxAggregateInputObjectSchema } from "./objects/ExpenseMaxAggregateInput.schema";
import { ExpenseMinAggregateInputObjectSchema } from "./objects/ExpenseMinAggregateInput.schema";
import { ExpenseOrderByWithRelationInputObjectSchema } from "./objects/ExpenseOrderByWithRelationInput.schema";
import { ExpenseSumAggregateInputObjectSchema } from "./objects/ExpenseSumAggregateInput.schema";
import { ExpenseWhereInputObjectSchema } from "./objects/ExpenseWhereInput.schema";
import { ExpenseWhereUniqueInputObjectSchema } from "./objects/ExpenseWhereUniqueInput.schema";

export const ExpenseAggregateSchema = z.object({
	orderBy: z
		.union([
			ExpenseOrderByWithRelationInputObjectSchema,
			ExpenseOrderByWithRelationInputObjectSchema.array(),
		])
		.optional(),
	where: ExpenseWhereInputObjectSchema.optional(),
	cursor: ExpenseWhereUniqueInputObjectSchema.optional(),
	take: z.number().optional(),
	skip: z.number().optional(),
	_count: z
		.union([z.literal(true), ExpenseCountAggregateInputObjectSchema])
		.optional(),
	_min: ExpenseMinAggregateInputObjectSchema.optional(),
	_max: ExpenseMaxAggregateInputObjectSchema.optional(),
	_avg: ExpenseAvgAggregateInputObjectSchema.optional(),
	_sum: ExpenseSumAggregateInputObjectSchema.optional(),
});
