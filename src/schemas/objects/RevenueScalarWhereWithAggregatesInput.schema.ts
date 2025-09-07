import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { DecimalWithAggregatesFilterObjectSchema } from "./DecimalWithAggregatesFilter.schema";
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema";
import { UuidWithAggregatesFilterObjectSchema } from "./UuidWithAggregatesFilter.schema";

export const RevenueScalarWhereWithAggregatesInputObjectSchema: z.ZodType<
	Prisma.RevenueScalarWhereWithAggregatesInput,
	Prisma.RevenueScalarWhereWithAggregatesInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		amount: z
			.union([
				z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
				z.number(),
			])
			.optional(),
		description: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
				z.string(),
			])
			.nullish(),
		date: z
			.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
	})
	.strict();
export const RevenueScalarWhereWithAggregatesInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => RevenueScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		amount: z
			.union([
				z.lazy(() => DecimalWithAggregatesFilterObjectSchema),
				z.number(),
			])
			.optional(),
		description: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
				z.string(),
			])
			.nullish(),
		date: z
			.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
	})
	.strict();
