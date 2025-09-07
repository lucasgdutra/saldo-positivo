import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const CategoryCreateManyUserInputObjectSchema: z.ZodType<
	Prisma.CategoryCreateManyUserInput,
	Prisma.CategoryCreateManyUserInput
> = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
export const CategoryCreateManyUserInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
	})
	.strict();
