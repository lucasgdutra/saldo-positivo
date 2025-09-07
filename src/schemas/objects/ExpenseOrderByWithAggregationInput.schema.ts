import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { ExpenseAvgOrderByAggregateInputObjectSchema } from "./ExpenseAvgOrderByAggregateInput.schema";
import { ExpenseCountOrderByAggregateInputObjectSchema } from "./ExpenseCountOrderByAggregateInput.schema";
import { ExpenseMaxOrderByAggregateInputObjectSchema } from "./ExpenseMaxOrderByAggregateInput.schema";
import { ExpenseMinOrderByAggregateInputObjectSchema } from "./ExpenseMinOrderByAggregateInput.schema";
import { ExpenseSumOrderByAggregateInputObjectSchema } from "./ExpenseSumOrderByAggregateInput.schema";
import { SortOrderInputObjectSchema } from "./SortOrderInput.schema";

export const ExpenseOrderByWithAggregationInputObjectSchema: z.ZodType<
	Prisma.ExpenseOrderByWithAggregationInput,
	Prisma.ExpenseOrderByWithAggregationInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: z
			.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
			.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
		_count: z
			.lazy(() => ExpenseCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => ExpenseAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => ExpenseMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => ExpenseMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => ExpenseSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict();
export const ExpenseOrderByWithAggregationInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: z
			.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
			.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
		_count: z
			.lazy(() => ExpenseCountOrderByAggregateInputObjectSchema)
			.optional(),
		_avg: z.lazy(() => ExpenseAvgOrderByAggregateInputObjectSchema).optional(),
		_max: z.lazy(() => ExpenseMaxOrderByAggregateInputObjectSchema).optional(),
		_min: z.lazy(() => ExpenseMinOrderByAggregateInputObjectSchema).optional(),
		_sum: z.lazy(() => ExpenseSumOrderByAggregateInputObjectSchema).optional(),
	})
	.strict();
