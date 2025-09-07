import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const RevenueAvgOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.RevenueAvgOrderByAggregateInput,
	Prisma.RevenueAvgOrderByAggregateInput
> = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
export const RevenueAvgOrderByAggregateInputObjectZodSchema = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
