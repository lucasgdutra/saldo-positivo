import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { UserScalarRelationFilterObjectSchema } from "./UserScalarRelationFilter.schema";
import { UserWhereInputObjectSchema } from "./UserWhereInput.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			OR: z.lazy(makeSchema).array().optional(),
			NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			id: z
				.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
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
			createdAt: z
				.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
				.optional(),
			updatedAt: z
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
export const BalanceWhereInputObjectSchema: z.ZodType<Prisma.BalanceWhereInput> =
	makeSchema() as unknown as z.ZodType<Prisma.BalanceWhereInput>;
export const BalanceWhereInputObjectZodSchema = makeSchema();
