import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const ExpenseMaxOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.ExpenseMaxOrderByAggregateInput,
	Prisma.ExpenseMaxOrderByAggregateInput
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
export const ExpenseMaxOrderByAggregateInputObjectZodSchema = z
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
