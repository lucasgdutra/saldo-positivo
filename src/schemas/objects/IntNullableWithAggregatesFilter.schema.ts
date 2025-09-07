import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { NestedFloatNullableFilterObjectSchema } from "./NestedFloatNullableFilter.schema";
import { NestedIntNullableFilterObjectSchema } from "./NestedIntNullableFilter.schema";
import { NestedIntNullableWithAggregatesFilterObjectSchema } from "./NestedIntNullableWithAggregatesFilter.schema";

export const IntNullableWithAggregatesFilterObjectSchema: z.ZodType<
	Prisma.IntNullableWithAggregatesFilter,
	Prisma.IntNullableWithAggregatesFilter
> = z
	.object({
		equals: z.number().int().nullish(),
		in: z.number().int().array().nullish(),
		notIn: z.number().int().array().nullish(),
		lt: z.number().int().optional(),
		lte: z.number().int().optional(),
		gt: z.number().int().optional(),
		gte: z.number().int().optional(),
		not: z
			.union([
				z.number().int(),
				z.lazy(() => NestedIntNullableWithAggregatesFilterObjectSchema),
			])
			.nullish(),
		_count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
		_sum: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_min: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_max: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
	})
	.strict();
export const IntNullableWithAggregatesFilterObjectZodSchema = z
	.object({
		equals: z.number().int().nullish(),
		in: z.number().int().array().nullish(),
		notIn: z.number().int().array().nullish(),
		lt: z.number().int().optional(),
		lte: z.number().int().optional(),
		gt: z.number().int().optional(),
		gte: z.number().int().optional(),
		not: z
			.union([
				z.number().int(),
				z.lazy(() => NestedIntNullableWithAggregatesFilterObjectSchema),
			])
			.nullish(),
		_count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_avg: z.lazy(() => NestedFloatNullableFilterObjectSchema).optional(),
		_sum: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_min: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
		_max: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
	})
	.strict();
