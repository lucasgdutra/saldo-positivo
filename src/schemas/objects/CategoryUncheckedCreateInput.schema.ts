import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema } from "./ExpenseUncheckedCreateNestedManyWithoutCategoryInput.schema";

export const CategoryUncheckedCreateInputObjectSchema: z.ZodType<
	Prisma.CategoryUncheckedCreateInput,
	Prisma.CategoryUncheckedCreateInput
> = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		expenses: z
			.lazy(
				() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema,
			)
			.optional(),
	})
	.strict();
export const CategoryUncheckedCreateInputObjectZodSchema = z
	.object({
		id: z.string().optional(),
		name: z.string(),
		userId: z.string(),
		createdAt: z.date().optional(),
		updatedAt: z.date().optional(),
		expenses: z
			.lazy(
				() => ExpenseUncheckedCreateNestedManyWithoutCategoryInputObjectSchema,
			)
			.optional(),
	})
	.strict();
