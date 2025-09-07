import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const ExpenseMinOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.ExpenseMinOrderByAggregateInput,
	Prisma.ExpenseMinOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: SortOrderSchema.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
	})
	.strict();
export const ExpenseMinOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: SortOrderSchema.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		categoryId: SortOrderSchema.optional(),
	})
	.strict();
