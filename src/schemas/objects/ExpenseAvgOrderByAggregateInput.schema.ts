import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const ExpenseAvgOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.ExpenseAvgOrderByAggregateInput,
	Prisma.ExpenseAvgOrderByAggregateInput
> = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
export const ExpenseAvgOrderByAggregateInputObjectZodSchema = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
