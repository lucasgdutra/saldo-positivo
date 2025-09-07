import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { UserScalarRelationFilterObjectSchema } from "./UserScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

export const RevenueWhereInputObjectSchema: z.ZodType<
	Prisma.RevenueWhereInput,
	Prisma.RevenueWhereInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => RevenueWhereInputObjectSchema),
				z.lazy(() => RevenueWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RevenueWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RevenueWhereInputObjectSchema),
				z.lazy(() => RevenueWhereInputObjectSchema).array(),
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
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
	})
	.strict();
export const RevenueWhereInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => RevenueWhereInputObjectSchema),
				z.lazy(() => RevenueWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => RevenueWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => RevenueWhereInputObjectSchema),
				z.lazy(() => RevenueWhereInputObjectSchema).array(),
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
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterObjectSchema),
				z.lazy(() => UserWhereInputObjectSchema),
			])
			.optional(),
	})
	.strict();
