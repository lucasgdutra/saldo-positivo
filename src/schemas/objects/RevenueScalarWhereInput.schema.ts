import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DecimalFilterObjectSchema } from "./DecimalFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
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
			amount: z
				.union([z.lazy(() => DecimalFilterObjectSchema), z.number()])
				.optional(),
			description: z
				.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
				.nullish(),
			date: z
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
		})
		.strict();
export const RevenueScalarWhereInputObjectSchema: z.ZodType<Prisma.RevenueScalarWhereInput> =
	makeSchema() as unknown as z.ZodType<Prisma.RevenueScalarWhereInput>;
export const RevenueScalarWhereInputObjectZodSchema = makeSchema();
