import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const RevenueSumOrderByAggregateInputObjectSchema: z.ZodType<
	Prisma.RevenueSumOrderByAggregateInput,
	Prisma.RevenueSumOrderByAggregateInput
> = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
export const RevenueSumOrderByAggregateInputObjectZodSchema = z
	.object({
		amount: SortOrderSchema.optional(),
	})
	.strict();
