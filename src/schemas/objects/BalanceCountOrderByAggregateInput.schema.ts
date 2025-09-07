import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const BalanceCountOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.BalanceCountOrderByAggregateInput,
	Prisma.BalanceCountOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
		referenceMonth: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
	})
	.strict();
export const BalanceCountOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
		referenceMonth: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
	})
	.strict();
