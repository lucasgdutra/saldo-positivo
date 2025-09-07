import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { UuidFilterObjectSchema } from "./UuidFilter.schema";

export const CategoryScalarWhereInputObjectSchema: z.ZodType<
	Prisma.CategoryScalarWhereInput,
	Prisma.CategoryScalarWhereInput
> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CategoryScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
	})
	.strict();
export const CategoryScalarWhereInputObjectZodSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CategoryScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CategoryScalarWhereInputObjectSchema),
				z.lazy(() => CategoryScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringFilterObjectSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => UuidFilterObjectSchema), z.string()])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
			.optional(),
	})
	.strict();
