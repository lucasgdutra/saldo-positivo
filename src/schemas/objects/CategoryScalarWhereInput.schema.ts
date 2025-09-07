import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema } from "./StringFilter.schema";
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
			name: z
				.union([z.lazy(() => StringFilterObjectSchema), z.string()])
				.optional(),
			color: z
				.union([z.lazy(() => StringFilterObjectSchema), z.string()])
				.optional(),
			icon: z
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
export const CategoryScalarWhereInputObjectSchema: z.ZodType<Prisma.CategoryScalarWhereInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CategoryScalarWhereInput>;
export const CategoryScalarWhereInputObjectZodSchema = makeSchema();
