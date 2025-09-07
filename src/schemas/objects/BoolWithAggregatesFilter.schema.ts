import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NestedBoolFilterObjectSchema } from "./NestedBoolFilter.schema";
import { NestedBoolWithAggregatesFilterObjectSchema } from "./NestedBoolWithAggregatesFilter.schema";
import { NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";

export const BoolWithAggregatesFilterObjectSchema: z.ZodType<
	Prisma.BoolWithAggregatesFilter,
	Prisma.BoolWithAggregatesFilter
> = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([
				z.boolean(),
				z.lazy(() => NestedBoolWithAggregatesFilterObjectSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
		_min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
		_max: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
	})
	.strict();
export const BoolWithAggregatesFilterObjectZodSchema = z
	.object({
		equals: z.boolean().optional(),
		not: z
			.union([
				z.boolean(),
				z.lazy(() => NestedBoolWithAggregatesFilterObjectSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
		_min: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
		_max: z.lazy(() => NestedBoolFilterObjectSchema).optional(),
	})
	.strict();
