import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NestedBoolFilterObjectSchema } from "./NestedBoolFilter.schema";
import { NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";

export const NestedBoolWithAggregatesFilterObjectSchema: z.ZodType<
	Prisma.NestedBoolWithAggregatesFilter,
	Prisma.NestedBoolWithAggregatesFilter
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
export const NestedBoolWithAggregatesFilterObjectZodSchema = z
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
