import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const CategoryMaxOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.CategoryMaxOrderByAggregateInput,
	Prisma.CategoryMaxOrderByAggregateInput
> = z
	.object({
		id: SortOrderSchema.optional(),
		name: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
	})
	.strict();
export const CategoryMaxOrderByAggregateInputObjectZodSchema = z
	.object({
		id: SortOrderSchema.optional(),
		name: SortOrderSchema.optional(),
		userId: SortOrderSchema.optional(),
		createdAt: SortOrderSchema.optional(),
		updatedAt: SortOrderSchema.optional(),
	})
	.strict();
