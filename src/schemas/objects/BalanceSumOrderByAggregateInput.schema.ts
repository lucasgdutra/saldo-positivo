import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const BalanceSumOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.BalanceSumOrderByAggregateInput,
	Prisma.BalanceSumOrderByAggregateInput
> = z
	.object({
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
	})
	.strict();
export const BalanceSumOrderByAggregateInputObjectZodSchema = z
	.object({
		totalAmount: SortOrderSchema.optional(),
		totalRevenues: SortOrderSchema.optional(),
		totalExpenses: SortOrderSchema.optional(),
	})
	.strict();
