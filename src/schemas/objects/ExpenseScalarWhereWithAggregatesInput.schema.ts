import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { DecimalWithAggregatesFilterObjectSchema } from "./DecimalWithAggregatesFilter.schema";
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema";
import { UuidWithAggregatesFilterObjectSchema } from "./UuidWithAggregatesFilter.schema";

export const ExpenseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<
	Prisma.ExpenseScalarWhereWithAggregatesInput,
	Prisma.ExpenseScalarWhereWithAggregatesInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema).array(),
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
		categoryId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
	})
	.strict();
export const ExpenseScalarWhereWithAggregatesInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema),
				z.lazy(() => ExpenseScalarWhereWithAggregatesInputObjectSchema).array(),
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
		categoryId: z
			.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
			.optional(),
	})
	.strict();
