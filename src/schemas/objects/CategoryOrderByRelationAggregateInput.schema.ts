import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const CategoryOrderByRelationAggregateInputObjectSchema: z.ZodType<
	Prisma.CategoryOrderByRelationAggregateInput,
	Prisma.CategoryOrderByRelationAggregateInput
> = z
	.object({
		_count: SortOrderSchema.optional(),
	})
	.strict();
export const CategoryOrderByRelationAggregateInputObjectZodSchema = z
	.object({
		_count: SortOrderSchema.optional(),
	})
	.strict();
