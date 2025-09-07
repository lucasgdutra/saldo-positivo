import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NullsOrderSchema } from "../enums/NullsOrder.schema";
import { SortOrderSchema } from "../enums/SortOrder.schema";

export const SortOrderInputObjectSchema: z.ZodType<
	Prisma.SortOrderInput,
	Prisma.SortOrderInput
> = z
	.object({
		sort: SortOrderSchema,
		nulls: NullsOrderSchema.optional(),
	})
	.strict();
export const SortOrderInputObjectZodSchema = z
	.object({
		sort: SortOrderSchema,
		nulls: NullsOrderSchema.optional(),
	})
	.strict();
