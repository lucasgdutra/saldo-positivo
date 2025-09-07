import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryScalarRelationFilterObjectSchema } from "./CategoryScalarRelationFilter.schema";
import { CategoryWhereInputObjectSchema } from "./CategoryWhereInput.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { UserScalarRelationFilterObjectSchema } from "./UserScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

export const ExpenseWhereInputObjectSchema: z.ZodType<
	Prisma.ExpenseWhereInput,
	Prisma.ExpenseWhereInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ExpenseWhereInputObjectSchema),
				z.lazy(() => ExpenseWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ExpenseWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ExpenseWhereInputObjectSchema),
				z.lazy(() => ExpenseWhereInputObjectSchema).array(),
			])
			.optional(),
		amount: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		description: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.nullish(),
		date: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		categoryId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
		category: z
			.union([
				z.lazy(() => CategoryScalarRelationFilterObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema),
			])
			.optional(),
	})
	.strict();
export const ExpenseWhereInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => ExpenseWhereInputObjectSchema),
				z.lazy(() => ExpenseWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => ExpenseWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ExpenseWhereInputObjectSchema),
				z.lazy(() => ExpenseWhereInputObjectSchema).array(),
			])
			.optional(),
		amount: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		description: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.nullish(),
		date: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		categoryId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
		category: z
			.union([
				z.lazy(() => CategoryScalarRelationFilterObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema),
			])
			.optional(),
	})
	.strict();
