import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const RevenueCountOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.RevenueCountOrderByAggregateInput,
	Prisma.RevenueCountOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: SortOrderSchema.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
	})
	.strict();
export const RevenueCountOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		amount: SortOrderSchema.optional(),
		description: SortOrderSchema.optional(),
		date: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
	})
	.strict();
