import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { CategoryWhereInputObjectSchema } from "./CategoryWhereInput.schema";

export const CategoryListRelationFilterObjectSchema: z.ZodType<
	Prisma.CategoryListRelationFilter,
	Prisma.CategoryListRelationFilter
> = z
	.object({
		every: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
		some: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
		none: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
	})
	.strict();
export const CategoryListRelationFilterObjectZodSchema = z
	.object({
		every: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
		some: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
		none: z.lazy(() => CategoryWhereInputObjectSchema).optional(),
	})
	.strict();
