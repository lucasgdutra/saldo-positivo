import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
import { UuidWithAggregatesFilterObjectSchema } from "./UuidWithAggregatesFilter.schema";

const makeSchema = (): z.ZodObject<any> =>
	z
		.object({
			AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			OR: z.lazy(makeSchema).array().optional(),
			NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
			id: z
				.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
				.optional(),
			name: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			color: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			icon: z
				.union([
					z.lazy(() => StringWithAggregatesFilterObjectSchema),
					z.string(),
				])
				.optional(),
			userId: z
				.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()])
				.optional(),
			createdAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
			updatedAt: z
				.union([
					z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
					z.date(),
				])
				.optional(),
		})
		.strict();
export const CategoryScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput>;
export const CategoryScalarWhereWithAggregatesInputObjectZodSchema =
	makeSchema();
