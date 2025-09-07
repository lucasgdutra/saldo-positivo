import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const ExpenseSumOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.ExpenseSumOrderByAggregateInput,
	Prisma.ExpenseSumOrderByAggregateInput
> = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
export const ExpenseSumOrderByAggregateInputObjectZodSchema = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
