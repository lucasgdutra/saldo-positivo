import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseListRelationFilterObjectSchema } from "./ExpenseListRelationFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { UserScalarRelationFilterObjectSchema } from "./UserScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

export const CategoryWhereInputObjectSchema: z.ZodType<
	Prisma.CategoryWhereInput,
	Prisma.CategoryWhereInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CategoryWhereInputObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CategoryWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CategoryWhereInputObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema).array(),
			])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
		expenses: z.lazy(() => ExpenseListRelationFilterObjectSchema).optional(),
	})
	.strict();
export const CategoryWhereInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => CategoryWhereInputObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CategoryWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CategoryWhereInputObjectSchema),
				z.lazy(() => CategoryWhereInputObjectSchema).array(),
			])
			.optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
		expenses: z.lazy(() => ExpenseListRelationFilterObjectSchema).optional(),
	})
	.strict();
