import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { UserScalarRelationFilterObjectSchema } from "./UserScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

export const BalanceWhereInputObjectSchema: z.ZodType<
	Prisma.BalanceWhereInput,
	Prisma.BalanceWhereInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => BalanceWhereInputObjectSchema),
				z.lazy(() => BalanceWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => BalanceWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => BalanceWhereInputObjectSchema),
				z.lazy(() => BalanceWhereInputObjectSchema).array(),
			])
			.optional(),
		totalAmount: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		totalRevenues: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		totalExpenses: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		referenceMonth: z
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
export const BalanceWhereInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => BalanceWhereInputObjectSchema),
				z.lazy(() => BalanceWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => BalanceWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => BalanceWhereInputObjectSchema),
				z.lazy(() => BalanceWhereInputObjectSchema).array(),
			])
			.optional(),
		totalAmount: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		totalRevenues: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		totalExpenses: z
			.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
			.optional(),
		referenceMonth: z
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
