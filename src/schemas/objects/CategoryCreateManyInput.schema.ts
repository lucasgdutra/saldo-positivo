import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const CategoryCreateManyInputObjectSchema: z.ZodType<
	Prisma.CategoryCreateManyInput,
	Prisma.CategoryCreateManyInput
> = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
export const CategoryCreateManyInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
